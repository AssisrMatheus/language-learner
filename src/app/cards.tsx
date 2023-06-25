'use client';

import { Lead } from '@/components/ui/typography/lead';
import type { RouterOutput } from '@/server';
import { AnimatePresence } from 'framer-motion';
import Card from './card';

export default function Cards({ data }: { data?: RouterOutput['verbs']['conjugate']; isLoading: boolean }) {
  return (
    <section>
      <div className="space-y-12">
        <AnimatePresence>
          {data &&
            data.tenses.map((tense) => (
              <div key={tense.tense}>
                <Lead className="mb-4">{tense.tense}</Lead>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {tense.verbs.map((verb) => (
                    <Card key={verb.phrase.join('')} data={verb} tense={tense.tense} />
                  ))}
                </div>
              </div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
