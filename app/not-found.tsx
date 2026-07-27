import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4 space-y-6">
      <span className="text-xs uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] font-mono">
        404 ERROR
      </span>

      <h1
        className="text-4xl sm:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
        style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
      >
        This Page Wandered Off.
      </h1>

      <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] max-w-sm">
        The path you followed has faded into the rain. Let's get you back to the atelier.
      </p>

      <Link
        href="/"
        className="px-8 py-3.5 border border-[oklch(0.13_0.02_260)] text-xs uppercase tracking-[0.2em] hover:bg-[oklch(0.13_0.02_260)] hover:text-[oklch(0.93_0.005_250)] transition-colors font-medium"
      >
        Return to the Club →
      </Link>
    </div>
  );
}
