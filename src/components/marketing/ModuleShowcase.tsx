'use client';

import { motion } from 'framer-motion';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

interface ModuleShowcaseProps {
  features: FeatureItem[];
  accentColor: string;
}

export default function ModuleShowcase({ features, accentColor }: ModuleShowcaseProps) {
  const accentBorder = `border-${accentColor}-500/20`;
  const accentText = `text-${accentColor}-500`;

  return (
    <section className="py-24 bg-void-mid relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <span className="font-orbitron text-sm text-text-tertiary tracking-widest">0001. CORE CAPABILITIES</span>
          <h2 className={`text-xl mt-4 ${accentText}`}>THE MODULE ARCHITECTURE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`holo-panel p-10 group hover:border-${accentColor}-500/50 transition-all cursor-default`}
            >
              <div className="flex items-start gap-8">
                <span className="text-4xl">{feature.icon}</span>
                <div>
                  <h3 className={`font-orbitron font-bold text-lg tracking-widest uppercase mb-4 group-hover:${accentText} transition-colors`}>
                    {feature.title}
                  </h3>
                  <p className="font-rajdhani text-text-tertiary text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
