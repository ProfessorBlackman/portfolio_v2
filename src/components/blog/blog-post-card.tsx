import Link from "next/link"
import {format, parseISO} from "date-fns"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {CalendarIcon} from "lucide-react"
import {Post} from "@/lib/types";

interface BlogPostCardProps {
    post: Post
}

export default function BlogPostCard({post}: Readonly<BlogPostCardProps>) {
    const {title, slug, excerpt, category, dateCreated, tags} = post
    const publishedDate = dateCreated ? parseISO(dateCreated) : null

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
                {/* Content */}
                <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        {category && (
                            <Badge variant="secondary">
                                <Link href={`/articles/category/${category.toLowerCase()}`}>{category}</Link>
                            </Badge>
                        )}
                        {publishedDate && (
                            <span className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1"/>
                                {format(publishedDate, "MMMM d, yyyy")}
              </span>
                        )}
                    </div>

                    <Link href={`/articles/${slug}`}>
                        <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{title}</h2>
                    </Link>

                    <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>

                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    <Link href={`/articles/tag/${tag.toLowerCase()}`}>#{tag}</Link>
                                </Badge>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </Card>
    )
}
