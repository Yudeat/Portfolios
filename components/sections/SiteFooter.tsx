export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-4 py-[max(10vh,4rem)] sm:px-10 sm:py-[18vh] lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[url('/images/footer-torn-paper-bg.png')] bg-cover bg-left-top bg-no-repeat"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-[#050505]/40 to-[#050505]/80"
        aria-hidden
      />

      <div className="relative">
        <blockquote className="max-w-4xl text-[clamp(1.25rem,2.2vw,2rem)] leading-relaxed text-white/90 drop-shadow-[0_1px_24px_rgba(0,0,0,0.45)]">
          Let&apos;s build a product that performs under pressure and scales with intention.
        </blockquote>

        <div className="mt-14 flex flex-col gap-7 border-t border-white/15 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#93b4ff]">Contact</p>
            <h3 className="mt-3 max-w-xl text-balance text-[clamp(1.65rem,5.5vw,2.35rem)] font-semibold uppercase tracking-[-0.01em] text-white drop-shadow-[0_1px_20px_rgba(0,0,0,0.4)]">
              Let&apos;s build something significant.
            </h3>
            <p className="mt-4 max-w-md text-sm uppercase tracking-[0.1em] text-white/72">
              Mountaineering studies mindset: grit, discipline, and long-route execution.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm uppercase tracking-[0.12em] text-white/75">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              GitHub
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
