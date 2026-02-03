import {PortableText} from "next-sanity"
import {Post} from "@/lib/types"
import React from "react"
import {PortableComponents} from "@/components/portable-components";

export default function BlogPostContent({post}: { post: Post }) {

    return (
        <article className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.body} components={PortableComponents}/>
        </article>
    )
}
