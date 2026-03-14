// src/services/eventBus.ts
import type { DAOEvent, EventType } from '@/lib/types';

type EventHandler = (event: DAOEvent) => void;

class EventBus {
  private handlers: Map<EventType, Set<EventHandler>> = new Map();
  private globalHandlers: Set<EventHandler> = new Set();
  private batchQueue: Omit<DAOEvent, 'id' | 'timestamp'>[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private lastEffectTime: number = 0;
  private effectsThisSecond: number = 0;
  private readonly BATCH_WINDOW = 100;
  private readonly MAX_EFFECTS_PER_SECOND = 5;

  subscribe(type: EventType, handler: EventHandler): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);
    return () => { this.handlers.get(type)?.delete(handler); };
  }

  subscribeAll(handler: EventHandler): () => void {
    this.globalHandlers.add(handler);
    return () => { this.globalHandlers.delete(handler); };
  }

  publish(eventPayload: Omit<DAOEvent, 'id' | 'timestamp'>): void {
    this.batchQueue.push(eventPayload);
    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => { this.flush(); }, this.BATCH_WINDOW);
    }
  }

  publishImmediate(eventPayload: Omit<DAOEvent, 'id' | 'timestamp'>): void {
    const event = this.enrichEvent(eventPayload);
    this.dispatch(event);
  }

  private flush(): void {
    this.batchTimer = null;
    const batch = [...this.batchQueue];
    this.batchQueue = [];

    const now = Date.now();
    if (now - this.lastEffectTime > 1000) {
      this.effectsThisSecond = 0;
      this.lastEffectTime = now;
    }

    batch.forEach((payload) => {
      const event = this.enrichEvent(payload);
      if (this.effectsThisSecond >= this.MAX_EFFECTS_PER_SECOND && event.magnitude < 0.9) {
        this.dispatchToHandlers(event);
        return;
      }
      this.effectsThisSecond++;
      this.dispatch(event);
    });
  }

  private dispatch(event: DAOEvent): void {
    this.dispatchToHandlers(event);
  }

  private dispatchToHandlers(event: DAOEvent): void {
    const typeHandlers = this.handlers.get(event.type);
    if (typeHandlers) {
      typeHandlers.forEach((handler) => {
        try { handler(event); } catch (err) { console.error(`[EventBus] Handler error:`, err); }
      });
    }
    this.globalHandlers.forEach((handler) => {
      try { handler(event); } catch (err) { console.error('[EventBus] Global handler error:', err); }
    });
  }

  private enrichEvent(payload: Omit<DAOEvent, 'id' | 'timestamp'>): DAOEvent {
    return { ...payload, id: crypto.randomUUID(), timestamp: new Date().toISOString() };
  }

  destroy(): void {
    if (this.batchTimer) { clearTimeout(this.batchTimer); this.batchTimer = null; }
    this.handlers.clear();
    this.globalHandlers.clear();
    this.batchQueue = [];
  }
}

export const eventBus = new EventBus();
