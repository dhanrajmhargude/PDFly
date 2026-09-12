"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";

import { formatBytes } from "@/lib/utlis/file";
import { triggerDownload } from "@/lib/utlis/download";

interface DownloadCardProps {
  blob: Blob;
  filename: string;
  onReset: () => void;
}

export function DownloadCard({
  blob,
  filename,
  onReset,
}: DownloadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="mt-[24px] border border-dashed border-black/40 bg-white"
    >
      <div className="flex flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/20 bg-black/[0.02] text-black/50">
            <CheckCircle2
              className="h-5 w-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>

          <div className="min-w-0">
            <p className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-black sm:text-xs">
              Ready to download
            </p>

            <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">
              {filename} &middot; {formatBytes(blob.size)}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => triggerDownload(blob, filename)}
            className="group flex items-center justify-center gap-2 border border-black bg-black px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-black/90 active:scale-[0.99]"
          >
            <Download
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Download
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 border border-dashed border-black bg-white px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-black/60 transition-all duration-200 hover:border-black hover:text-black active:scale-[0.99]"
          >
            Process another
          </button>
        </div>
      </div>
    </motion.div>
  );
}