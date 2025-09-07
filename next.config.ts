import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Ensure proper sanitization
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
