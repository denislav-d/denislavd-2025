import { MDXRemote, MDXRemoteProps } from "next-mdx-remote-client/rsc";
import Link from "next/link";
// import Image from "next/image";
import rehypeSanitize from "rehype-sanitize";

type MDXComponents = MDXRemoteProps["components"];

interface RendererMDXProps {
  description: string;
  className?: string;
}

export default function RendererMDX({
  description,
  className,
}: RendererMDXProps) {
  const MDXStyles: MDXComponents = {
    h1: ({ children }) => (
      <h1 className="font-eb-garamond pb-6 text-center text-4xl tracking-[-0.02em] max-sm:px-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-eb-garamond pb-4 text-center text-3xl tracking-[-0.02em] max-sm:px-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-eb-garamond pb-3 text-center text-2xl tracking-[-0.02em] max-sm:px-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-eb-garamond pb-2 text-center text-xl tracking-[-0.02em] max-sm:px-4">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="font-plus-jakarta-sans max-w-prose text-sm font-semibold tracking-[-0.01em] max-sm:px-4">
        {children}
      </p>
    ),
    a: ({ children, href }) => (
      <Link
        href={href || "#"}
        className="font-plus-jakarta-sans text-sm font-semibold tracking-[-0.01em] text-zinc-600 underline transition-colors hover:text-zinc-900"
        target="_blank"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="font-plus-jakarta-sans max-w-prose list-inside list-disc py-4 text-sm font-semibold tracking-[-0.01em] max-sm:px-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="font-plus-jakarta-sans max-w-prose list-inside list-disc py-4 text-sm font-semibold tracking-[-0.01em] max-sm:px-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="mb-1 w-fit">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs">
        {children}
      </code>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    // img: ({ src, alt, ...props }) => (
    //   <Image
    //     src={src || ""}
    //     alt={alt || ""}
    //     width={800}
    //     height={600}
    //     className="w-full max-w-prose sm:px-2"
    //     {...props}
    //   />
    // ),
  };

  return (
    <div className={`max-w-prose ${className}`}>
      <MDXRemote
        components={MDXStyles}
        source={description}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeSanitize],
          },
        }}
      />
    </div>
  );
}
