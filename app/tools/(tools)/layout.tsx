import { ReactNode } from "react";
import Link from "next/link"
import { ArrowLeft } from "lucide-react";

export default function ToolsLayout ({children}:{children : ReactNode}){
    return(
        <section className="min-h-screen bg-white">
            <div className="landing-container3 relative z-10 py-16">
                <Link
                href="/tools"
                className="flex items-center gap-3 font-mono text-xs font-medium text-black"
                >
                <ArrowLeft
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                />
                All tools 
                </Link>

                <main className="mt-10">
                    {children}
                </main>
            </div>
        </section>
    )
}