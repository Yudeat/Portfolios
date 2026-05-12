"use client";

import type { FormEvent } from "react";

const FAQS = [
  {
    question: "Do you take on small projects?",
    answer: "Yes. I can help with focused builds, landing pages, feature polish, audits, and quick product iterations.",
  },
  {
    question: "Can you work with an existing brand?",
    answer: "Absolutely. I can extend your current visual system or tighten it while keeping the product recognizable.",
  },
  {
    question: "What's your typical project timeline?",
    answer: "Small scopes can move in days. Larger product work usually starts with a short discovery pass, then ships in clear milestones.",
  },
  {
    question: "What happens after I reach out?",
    answer: "I'll review your message, ask for any missing context, and suggest the simplest next step for the idea.",
  },
  {
    question: "Do you offer free consultations or discovery calls?",
    answer:
      "Yes, for the first fit-check. It helps clarify scope, goals, timeline, and whether I'm the right person to help.",
  },
  {
    question: "Can I reach out if I'm not sure what I need yet?",
    answer: "Yes. A rough idea is enough. I can help shape it into a practical scope and identify what should come first.",
  },
] as const;

function FooterCreditBlock({ className = "", hiddenFromA11y = false }: { className?: string; hiddenFromA11y?: boolean }) {
  const year = new Date().getFullYear();
  return (
    <div
      className={`font-mono text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.12em] text-[#101116]/75 ${className}`}
      {...(hiddenFromA11y ? { "aria-hidden": true } : {})}
    >
      <p>
        © 2024–{year}
      </p>
      <p className="mt-2 text-[#101116]">Predeep Chaudhary</p>
      <p className="mt-1 text-[#101116]/55">Portfolio &amp; studio</p>
    </div>
  );
}

function onNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value?.trim();
  if (!email) return;
  window.location.href = `mailto:hello@predeep.dev?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(`Please add this email to updates: ${email}`)}`;
}

export function SiteFooter() {
  return (
    <footer className="relative min-h-[100dvh] overflow-hidden bg-white px-5 py-[max(8vh,3rem)] text-[#101116] sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-7xl flex-col justify-center">
        <div>
          <p className="inline-flex items-center gap-2 text-[0.68rem] font-medium text-[#101116]/70">
            <span className="size-1.5 rounded-full bg-[#101116]" aria-hidden />
            Get in touch
          </p>
          <h2 className="mt-5 max-w-[34rem] text-balance text-[clamp(2.4rem,7vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-[#101116]">
            Got plans? Let&apos;s help you turn them into something real
          </h2>
          <p className="mt-5 text-sm text-[#101116]/58 sm:text-base">Tell me what&apos;s on your mind</p>
        </div>

        <div className="mt-10 border-t border-[#101116]/22 pt-10 sm:mt-14 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.8fr)] lg:gap-20">
            <aside className="h-fit rounded-xl bg-[#f4f4f6] p-5 text-sm text-[#101116]/82 shadow-[0_18px_55px_rgba(16,17,22,0.06)] sm:p-6">
              <div className="mb-8 flex size-9 items-center justify-center rounded-lg bg-[#101116] text-white" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l1.55 4.8 5.03-1.05-3.48 3.77 3.48 3.77-5.03-1.05L12 18l-1.55-4.76-5.03 1.05 3.48-3.77-3.48-3.77 5.03 1.05L12 3Z" fill="currentColor" />
                </svg>
              </div>
              <address className="not-italic leading-relaxed">
                <a className="block transition hover:text-[#101116]" href="tel:+9779800000000">
                  +977 980 000 0000
                </a>
                <a className="mt-2 block font-medium text-[#101116] transition hover:opacity-70" href="mailto:hello@predeep.dev">
                  hello@predeep.dev
                </a>
                <span className="mt-2 block text-[#101116]/62">Kathmandu, Nepal</span>
              </address>
            </aside>

            <div>
              <h3 className="text-[clamp(1.35rem,2vw,2rem)] font-medium tracking-[-0.04em] text-[#101116]">
                Send us a message
              </h3>
              <form className="mt-6 grid gap-5" aria-label="Contact form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-[0.68rem] font-medium text-[#101116]/70">
                    Name
                    <input
                      className="h-12 rounded-lg border border-[#101116]/24 bg-white px-4 text-sm text-[#101116] outline-none transition placeholder:text-[#101116]/38 focus:border-[#101116] focus:ring-4 focus:ring-[#101116]/8"
                      type="text"
                      name="name"
                      placeholder="Jane Smith"
                    />
                  </label>
                  <label className="grid gap-2 text-[0.68rem] font-medium text-[#101116]/70">
                    Email
                    <input
                      className="h-12 rounded-lg border border-[#101116]/24 bg-white px-4 text-sm text-[#101116] outline-none transition placeholder:text-[#101116]/38 focus:border-[#101116] focus:ring-4 focus:ring-[#101116]/8"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-[0.68rem] font-medium text-[#101116]/70">
                  Message
                  <textarea
                    className="min-h-40 resize-y rounded-lg border border-[#101116]/24 bg-white px-4 py-3 text-sm text-[#101116] outline-none transition placeholder:text-[#101116]/38 focus:border-[#101116] focus:ring-4 focus:ring-[#101116]/8"
                    name="message"
                    placeholder="Tell us about your new idea"
                  />
                </label>
                <button
                  type="button"
                  className="mt-1 h-12 w-full rounded-lg bg-[#171a22] px-8 text-sm font-medium text-white shadow-[0_16px_32px_rgba(16,17,22,0.18)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#101116]/20 sm:w-52"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-10 border-t border-[#101116]/14 pt-12 sm:mt-20 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#f4f4f6] px-3 py-1 text-[0.68rem] font-medium text-[#101116]/70">
              <span className="size-1.5 rounded-full bg-[#101116]" aria-hidden />
              FAQ
            </p>
            <h3 className="mt-5 max-w-md text-balance text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[#101116]">
              Answers to the questions we hear most often.
            </h3>
          </div>

          <div className="grid gap-3">
            {FAQS.map((item) => (
              <details key={item.question} className="group rounded-xl bg-[#f4f4f6] text-[#101116]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium outline-none transition hover:bg-[#ececf0] focus-visible:ring-4 focus-visible:ring-[#101116]/10 [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="grid size-5 shrink-0 place-items-center text-[#101116]/70 transition-transform group-open:rotate-180" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#101116]/62">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="mt-20 border-t border-[#101116]/14 pt-14 sm:mt-24 sm:pt-16"
          aria-label="Newsletter signup"
        >
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <p className="text-balance font-sans text-[0.7rem] font-bold uppercase leading-snug tracking-[0.2em] text-[#101116] sm:text-xs sm:tracking-[0.22em]">
              Sign up for the latest work, news &amp; insights
            </p>
            <p className="mt-4 max-w-md text-pretty text-sm font-semibold leading-relaxed text-[#101116]/72 sm:text-base">
              New work, notes, and launches straight to your inbox.
            </p>
            <form className="mt-8 w-full max-w-md" onSubmit={onNewsletterSubmit}>
              <label
                className="mb-2 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#101116]"
                htmlFor="footer-newsletter-email"
              >
                Email address
              </label>
              <div className="flex items-center gap-3 border-b-2 border-[#101116]/22 pb-2.5 transition-colors focus-within:border-[#101116]/55">
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent text-left font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#101116] outline-none placeholder:font-medium placeholder:normal-case placeholder:tracking-normal placeholder:text-[#101116]/35 sm:text-sm"
                />
                <button
                  type="submit"
                  className="shrink-0 font-mono text-sm font-bold uppercase tracking-[0.12em] text-[#101116] transition hover:opacity-55"
                  aria-label="Submit newsletter signup"
                >
                  →
                </button>
              </div>
            </form>
          </div>
        </section>

        <section
          className="mt-14 border-t border-[#101116]/14 pt-12 sm:mt-16 sm:pt-14"
          aria-label="Site footer"
        >
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:gap-10">
            <nav className="flex flex-1 flex-col gap-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#101116] lg:max-w-xs">
              <a className="flex items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-[#101116]/20" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram <span aria-hidden>→</span>
              </a>
              <a className="flex items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-[#101116]/20" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn <span aria-hidden>→</span>
              </a>
              <a className="flex items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-[#101116]/20" href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">
                Spotify <span aria-hidden>→</span>
              </a>
            </nav>

            <div className="flex min-w-0 shrink-0 flex-col items-center justify-center gap-5 px-0 py-2 text-center sm:gap-6 lg:px-4 xl:px-8">
              <FooterCreditBlock className="text-center" hiddenFromA11y />
              <p className="select-none text-center text-[clamp(2.75rem,12vw,7.5rem)] font-black leading-[0.82] tracking-[-0.06em] text-[#101116] sm:text-[clamp(3rem,14vw,9rem)] lg:text-[clamp(3.25rem,12vw,10rem)]">
                PREDEEP
              </p>
              <FooterCreditBlock className="text-center" />
            </div>

            <div className="flex flex-1 flex-col items-stretch gap-12 sm:items-end lg:min-w-0 lg:max-w-md">
              <nav className="flex flex-col gap-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#101116] sm:items-end sm:text-right">
                <a className="flex w-full max-w-xs items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-[#101116]/20 sm:ml-auto sm:justify-end sm:gap-4" href="#">
                  <span>Terms &amp; conditions</span> <span aria-hidden>→</span>
                </a>
                <a className="flex w-full max-w-xs items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-[#101116]/20 sm:ml-auto sm:justify-end sm:gap-4" href="#">
                  <span>Privacy policy</span> <span aria-hidden>→</span>
                </a>
                <a className="flex w-full max-w-xs items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-[#101116]/20 sm:ml-auto sm:justify-end sm:gap-4" href="#">
                  <span>Cookies policy</span> <span aria-hidden>→</span>
                </a>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
