import Link from "next/link";
import { Metadata } from "next";
import { Navigation } from "../components/nav";

const PAGE_PATH = "/criminal-defense-websites";
const TITLE = "Criminal Defense Law Firm Websites & SEO";
const DESCRIPTION =
  "Fast, modern websites and local + AI search visibility for criminal-defense firms — so you show up when someone needs you and picks up the phone.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: `${TITLE} | Jacob Yi`,
    description: DESCRIPTION,
    url: `https://jacobyi.info${PAGE_PATH}`,
    siteName: "jacobyi.info",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: `${TITLE} | Jacob Yi`,
    description: DESCRIPTION,
    card: "summary_large_image",
  },
};

// JSON-LD: a service offered by Jacob Yi, targeted at criminal-defense law firms.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: TITLE,
  description: DESCRIPTION,
  serviceType: "Web design and search visibility for criminal-defense law firms",
  url: `https://jacobyi.info${PAGE_PATH}`,
  areaServed: "United States",
  provider: {
    "@type": "Person",
    name: "Jacob Yi",
    url: "https://jacobyi.info",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Criminal defense law firms",
  },
};

// Items the firm owner needs to confirm or supply before this page goes live.
const PLACEHOLDER = "text-amber-400/90 italic";

export default function CriminalDefenseWebsites() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navigation />

      <div className="container mx-auto px-6 pt-28 pb-24 md:pt-36 max-w-3xl">
        {/* Hero */}
        <header className="space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-white leading-tight">
            Get your firm found by the clients already searching for you
          </h1>
          <p className="text-lg text-zinc-300 leading-8">
            I build fast, modern websites and fix local and AI search visibility for
            criminal-defense firms, so you show up when someone needs you and picks up
            the phone.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-100 duration-200 hover:bg-white hover:text-black"
            >
              Get a free 60-second visibility check &rarr;
            </Link>
          </div>
        </header>

        {/* What I do */}
        <section className="mt-16" aria-labelledby="what-i-do">
          <h2 id="what-i-do" className="text-2xl font-display text-white mb-6">
            What I do
          </h2>
          <ul className="space-y-4 text-zinc-300 leading-7">
            <li>
              Rebuild a dated or slow site into one that loads fast, works on a phone, and
              turns visitors into calls.
            </li>
            <li>
              Get you into Google&apos;s local 3-pack so you appear when someone searches a{" "}
              <span className="text-zinc-100">[city] criminal lawyer</span>.
            </li>
            <li>
              Make sure ChatGPT and AI search actually name your firm when people ask them
              for a referral.
            </li>
          </ul>
        </section>

        {/* Proof */}
        <section className="mt-16" aria-labelledby="proof">
          <h2 id="proof" className="text-2xl font-display text-white mb-6">
            Proof
          </h2>
          <p className="text-zinc-300 leading-7">
            A criminal and federal defense firm in New York signed two new retainers in the
            seven weeks after I rebuilt their site and visibility.
          </p>
          <p className={`mt-3 text-sm ${PLACEHOLDER}`}>
            [Storch — used with permission. Add a short quote from him here?]
          </p>
        </section>

        {/* Who I am */}
        <section className="mt-16" aria-labelledby="who-i-am">
          <h2 id="who-i-am" className="text-2xl font-display text-white mb-6">
            Who I am
          </h2>
          <p className={`text-sm ${PLACEHOLDER}`}>
            [2&ndash;3 lines from you: how long you&apos;ve been building sites, your dev
            background, anything that earns trust on sight. I won&apos;t make this up.]
          </p>
        </section>

        {/* How it works */}
        <section className="mt-16" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="text-2xl font-display text-white mb-6">
            How it works
          </h2>
          <div className="space-y-6 text-zinc-300 leading-7">
            <div>
              <h3 className="text-zinc-100 font-medium">Phase 1 &mdash; Setup (one-time)</h3>
              <p className={`mt-1 text-sm ${PLACEHOLDER}`}>
                [What&apos;s included + rough price. Confirm or correct.]
              </p>
            </div>
            <div>
              <h3 className="text-zinc-100 font-medium">
                Phase 2 &mdash; Ongoing visibility (monthly retainer)
              </h3>
              <p className={`mt-1 text-sm ${PLACEHOLDER}`}>
                [What&apos;s included + price. Confirm or correct.]
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
          <h2 className="text-xl font-display text-white">
            Want a free 60-second look at where your firm is invisible right now?
          </h2>
          <p className="mt-3 text-zinc-300 leading-7">
            Tell me your firm name and I&apos;ll send you the exact searches you&apos;re
            getting buried on.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-lg border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-100 duration-200 hover:bg-white hover:text-black"
          >
            Tell me your firm name &rarr;
          </Link>
        </section>
      </div>
    </div>
  );
}
