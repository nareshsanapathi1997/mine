import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

function ArticleLink({
  href = "",
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} rel="noreferrer">
      {children}
    </a>
  );
}

export function ArticleBody({ source }: { source: string }) {
  return (
    <div className="article">
      <MDXRemote source={source} components={{ a: ArticleLink }} />
    </div>
  );
}
