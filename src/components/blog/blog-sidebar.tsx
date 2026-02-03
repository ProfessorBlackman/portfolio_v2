import Link from "next/link"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {TagIcon, SearchIcon} from "lucide-react"

interface BlogSidebarProps {
    categories: string[]
    activeCategory?: string
    tags?: string[]
    activeTag?: string
    popularPosts?: Array<{ title: string; slug: string }>
}

export default function BlogSidebar({
                                        categories,
                                        activeCategory,
                                        tags,
                                        activeTag,
                                        popularPosts
                                    }: Readonly<BlogSidebarProps>) {
    return (
        <div className="space-y-6">
            {/* Search */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <SearchIcon
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search posts..." className="pl-9"/>
                    </div>
                </CardContent>
            </Card>

            {/* Categories */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category.toLowerCase() ? "default" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={`/articles/category/${category.toLowerCase()}`}>
                                    <TagIcon className="h-4 w-4 mr-2"/>
                                    {category}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Button key={tag} variant={activeTag === tag ? "default" : "outline"}
                                        size="sm" asChild>
                                    <Link href={`/articles/tag/${tag}`}>#{tag}</Link>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Popular Posts */}
            {popularPosts && popularPosts.length > 0 && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Popular Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {popularPosts.map((post, index) => (
                                <div key={post.slug} className="flex items-start gap-2">
                                    <div
                                        className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                        {index + 1}
                                    </div>
                                    <Link href={`/articles/${post.slug}`}
                                          className="text-sm hover:text-primary transition-colors">
                                        {post.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Newsletter */}
            {/*<BlogNewsletter />*/}

            {/* About */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">About</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Welcome to my corner of the internet where I write about whatever catches my eye in the world of
                        software development, from backend adventures and microservices mishaps to AI experiments and
                        the occasional deep dive into something weird but wonderful. If it's interesting, useful, or
                        just plain cool, you’ll probably find me writing about it here.

                        Stick around, you might just learn something new (or at least leave with a few tabs open).
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

