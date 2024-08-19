import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'
export default function Loading({ className }) {
    return (
        <div className={cn("h-full w-full flex items-center justify-center", className)}>
            <div className="relative flex  animate-spin  w-12 h-12">
                <div className="w-1/2 h-1/2 bg-theme-1 rounded-full animate-scale"></div>
                <div className="w-1/2 h-1/2 bg-theme-2 rounded-full animate-scale2 "></div>
            </div>
        </div>
    )
}
