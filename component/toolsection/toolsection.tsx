import { ToolsGrid } from "@/component/toolsection/toolgrid";
import { tools } from "@/config/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ToolLanding() {
  return (
    <section className="relative z-10 bg-white py-16">

      <div className="landing-container2">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-xs font-medium text-black"
        >
          <ArrowLeft
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />
          Home
        </Link>
      </div>
      <ToolsGrid tools={tools} />

    </section>
  );
}