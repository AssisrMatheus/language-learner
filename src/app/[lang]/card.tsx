'use client';

import type { RouterOutput } from '@/server';
import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Muted } from '@/components/ui/typography/muted';

const container = {
  notFlipped: { rotateY: 0, transition: { type: 'spring', stiffness: 350, damping: 40 } },
  flipped: { rotateY: 180, transition: { type: 'spring', stiffness: 350, damping: 40 } }
};

export default function Card({
  data,
  tense
}: {
  data: RouterOutput['verbs']['conjugate']['tenses'][number]['verbs'][number];
  tense?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      onClick={() => setFlipped((flipped) => !flipped)}
      variants={container}
      initial="notFlipped"
      animate={flipped ? 'flipped' : 'notFlipped'}
      className="p-4 border border-black dark:border-white rounded-lg"
    >
      <div style={flipped ? { transform: 'rotateY(180deg)' } : undefined}>
        {data.phrase.map((phrase) => (
          <Fragment key={phrase}>
            {phrase === data.verb ? !flipped ? '[...]' : <span className="underline">{phrase}</span> : phrase}
          </Fragment>
        ))}

        <div className={!flipped ? 'opacity-0' : ''}>
          <Separator className="my-4" />
          {tense && <Muted>{tense}</Muted>}
        </div>
      </div>
    </motion.button>
  );
}
