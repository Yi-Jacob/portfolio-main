const personAndSite = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jacob Yi",
    url: "https://jacobyi.info",
    jobTitle: "Full-stack developer",
    description: "Jacob Yi - Christian, Contrarian, Stoic",
    sameAs: [
      "https://www.linkedin.com/in/yi-jacob/",
      "https://github.com/Yi-Jacob",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "jacobyi.info",
    url: "https://jacobyi.info",
  },
];

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personAndSite) }}
    />
  );
}
