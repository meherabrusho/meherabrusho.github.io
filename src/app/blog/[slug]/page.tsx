import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Mermaid from "@/components/Mermaid";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
  };
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);

  return (
    <article className="max-w-3xl mx-auto space-y-8 fade-in-up">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      <header className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {post.metadata.title}
        </h1>
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <time>
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="inline-flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            {readingTime} min read
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-code:before:content-none prose-code:after:content-none">
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className, node: _node, ...rest } = props;
              void _node;
              const match = /language-(\w+)/.exec(className || "");
              if (match && match[1] === "mermaid") {
                return <Mermaid chart={String(children).replace(/\n$/, "")} />;
              }
              return (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Post navigation footer */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </Link>
      </div>
    </article>
  );
}
