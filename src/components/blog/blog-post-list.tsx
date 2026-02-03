import { Post } from "@/lib/types"
import BlogPostCard from "./blog-post-card"

interface BlogPostListProps {
  posts: Post[]
}

export default function BlogPostList({ posts }: Readonly<BlogPostListProps>) {
  if (posts.length === 0) {
    return (
      <div className="bg-muted p-8 rounded-lg text-center">
        <p className="text-lg">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

