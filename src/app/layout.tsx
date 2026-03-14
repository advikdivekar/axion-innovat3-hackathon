// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

// These imports will error until Dev A and Dev B build them!
// import { Providers } from './providers';
// import { UniverseCanvas } from '@/components/canvas/UniverseCanvas';
// import { AppShell } from '@/components/ui/AppShell';

export const metadata: Metadata = {
    title: 'DAO Cosmos OS',
    description: 'A living universe interface for decentralized autonomous organizations.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased overflow-hidden bg-cosmos-void text-cosmos-text-primary">

                {/* DEV B: Uncomment Providers once src/app/providers.tsx is built */}
                {/* <Providers> */}

                {/* DEV A: Uncomment once 3D canvas is built. This sits in the background. */}
                {/* <div className="fixed inset-0 z-0">
                <UniverseCanvas />
              </div> */}

                {/* DEV A: Uncomment once UI shell is built. This holds the 2D overlays. */}
                {/* <AppShell> */}
                <main className="relative z-10 w-full h-full">
                    {children}
                </main>
                {/* </AppShell> */}

                {/* </Providers> */}

            </body>
        </html>
    );
}