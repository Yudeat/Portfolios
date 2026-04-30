export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-[18vh] sm:px-10 lg:px-16">
      <blockquote className="max-w-4xl text-[clamp(1.25rem,2.2vw,2rem)] leading-relaxed text-white/85">
        Let&apos;s build a product that performs under pressure and scales with intention.
      </blockquote>

      <div className="mt-14 flex flex-col gap-7 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#3f7cff]">Contact</p>
          <h3 className="mt-3 text-4xl font-semibold uppercase tracking-[-0.01em]">Let&apos;s build something significant.</h3>
          <p className="mt-4 text-sm uppercase tracking-[0.1em] text-white/55">
            Mountaineering studies mindset: grit, discipline, and long-route execution.
          </p>
        </div>

        <nav className="flex gap-6 text-sm uppercase tracking-[0.12em] text-white/65">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
            LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
            GitHub
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
