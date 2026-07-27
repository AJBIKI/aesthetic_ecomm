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
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {overline && (
          <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block text-center">
            {overline}
          </span>
        )}

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-display text-[oklch(0.13_0.02_260)] leading-tight text-center tracking-wide"
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
        >
          {title}
        </h2>

        {quote && (
          <blockquote className="my-10 border-l-2 border-[oklch(0.55_0.12_195)] pl-6 italic font-display text-xl sm:text-2xl text-[oklch(0.13_0.02_260)]/90">
            "{quote}"
          </blockquote>
        )}

        <div className="space-y-6 text-sm sm:text-base text-[oklch(0.48_0.01_255)] leading-relaxed font-body">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? 'editorial-text' : ''}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
