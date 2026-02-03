import Link from "next/link"
import Image from "next/image"
import type { PostMetadata } from "@/lib/blog"
import { Card, CardContent } from "@/components/ui/card"

interface RelatedPostsProps {
  posts: PostMetadata[]
}

export default function RelatedPosts({ posts }: Readonly<RelatedPostsProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.slug} className="overflow-hidden hover:shadow-md transition-shadow">
          <Link href={`/blog/${post.slug}`}>
            <div className="relative h-40 w-full">
              <Image
                src={post.coverImage ?? "/placeholder.svg?height=200&width=300"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

