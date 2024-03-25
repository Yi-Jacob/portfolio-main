import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  env: {
    NEXT_APP_AUTH_TOKEN: "dd6aeff1e466e9efbec81ee2ca68e5e5f30c5db0",
  },
};

export default withContentlayer(nextConfig);
