"use client"

import {Share2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useToast} from "@/components/ui/use-toast"
import {useEffect, useState} from "react";

export default function ShareButton() {
    const [shared, setShared] = useState<boolean>(false)
    const {toast} = useToast()

    const handleShare = () => {
        const url = window.location.href
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: "Check out this article!",
                url: url,
            }).catch(console.error)
        } else {
            navigator.clipboard.writeText(url).then(() => {
                toast({
                    title: "Link Copied!",
                    description: "The article link has been copied to your clipboard.",
                })
            }).catch(console.error)
        }
        setShared(true)
    }

    useEffect(() => {
        if (shared) {
            const timer = setTimeout(() => {
                setShared(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [shared])

    return (
        <div className="flex flex-col items-center">
            <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share post">
                <Share2 className="h-4 w-4"/>
            </Button>
            {shared && (
                <span className="text-green-500 ml-2">Article link copied</span>
            )
            }
        </div>
    )
}