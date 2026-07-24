import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Thoughts on software engineering, artificial intelligence, and building things.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="glass-card hover-up flex flex-col p-6 rounded-2xl group">
            <Link href={`/blog/${post.slug}`} className="block">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                {post.title}
              </h3>
              <time className="text-sm text-gray-500 dark:text-gray-400 mb-4 block">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500">No blog posts found. Check back later!</p>
        )}
      </div>
    </div>
  );
}
