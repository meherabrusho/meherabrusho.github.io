import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>
      
      <header className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          {post.metadata.title}
        </h1>
        <time className="text-gray-500 dark:text-gray-400 block">
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="flex flex-wrap gap-2 pt-2">
          {post.metadata.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
