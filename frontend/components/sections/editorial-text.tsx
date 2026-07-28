'use client';

import { motion } from 'framer-motion';

interface EditorialTextProps {
  overline?: string;
  title: string;
  quote?: string;
  paragraphs: string[];
}

export function EditorialText({
  overline,
  title,
  quote,
  paragraphs,
}: EditorialTextProps) {
  return (
    <section className="py-10 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {overline && (
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] font-mono block text-center"
          >
            {overline}
          </motion.span>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-display text-[oklch(0.14_0.025_145)] leading-tight text-center tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          {title}
        </motion.h2>

        {quote && (
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="my-10 border-l-2 border-[oklch(0.55_0.12_195)] pl-6 italic font-display text-xl sm:text-2xl text-[oklch(0.14_0.025_145)]/90"
          >
            "{quote}"
          </motion.blockquote>
        )}

        <div className="space-y-6 text-sm sm:text-base text-[oklch(0.45_0.02_145)] leading-relaxed font-body">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={index === 0 ? 'editorial-text' : ''}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
