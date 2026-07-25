import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on software engineering, artificial intelligence, and building things — by Meherab Rusho.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <div className="space-y-4 fade-in-up">
        <h2 className="text-sm font-semibold text-purple-600 dark:text-cyan-400 uppercase tracking-wider">
          Blog
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Latest Posts
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          Thoughts on software engineering, artificial intelligence, and
          building things.
        </p>
      </div>

      <div className="space-y-5">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className={`glass-card hover-up hover-glow flex flex-col p-6 rounded-2xl group fade-in-up fade-in-up-delay-${Math.min(index + 1, 6)}`}
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <time className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap mt-1">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
