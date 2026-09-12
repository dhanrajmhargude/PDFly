import type { Data } from "@/config/data";
import Link from "next/link";

interface DataProps {
  tools: Data[];
}

export function ToolsGrid({ tools }: DataProps) {
  return (
      <div className=" landing-container2 mt-[50px] grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map((tool, index) => {
          const Icon = tool.icon;

          return (
            <Link
              href={`/tools/${tool.slug}`}
              key={tool.slug}
              className="group relative min-h-[160px] rounded-[14px] border border-black/50 bg-white p-6 transition-all duration-200 hover:border-black"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="text-black"
                  />

                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-black">
                    {tool.title}
                  </span>
                </div>

                <span className="font-mono text-[10px] tracking-[0.08em] text-black">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-9 max-w-[300px] font-mono text-[14px] leading-[1.7] text-black">
                {tool.description}
              </p>

              <div className="absolute bottom-6 left-6 text-[10px] font-medium uppercase tracking-[0.08em] text-black">
                Rescude
              </div>
            </Link>
          );
        })}
      </div>
  );
}