"use client";

import { useDropzone, type Accept } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utlis/cn";
import { ReactNode } from "react";

interface FileDropZoneProps {
  onDrop: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  icon: ReactNode;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function FileDropZone({
  onDrop,
  accept,
  multiple = false,
  icon,
  label = "Drop files here",
  sublabel = "or click to browse",
  className,
}: FileDropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop,
  });

  return (
    <motion.div>
        <div
            {...getRootProps()}
                className={cn(
                    "mt-[50px] group relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center overflow-hidden",
                    "border border-dashed border-black/50 bg-white",
                    "px-8 py-10",
                    "transition-all duration-200 ease-out",
                    "hover:border-black hover:bg-black/[0.02]",
                    isDragActive && "border-black bg-black/[0.03]",
                    className,
                )}
        >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait" initial={false}>
                {isDragActive ? (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                    <span className="mb-5 flex text-black">
                        {icon}
                    </span>

                    <span className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-black sm:text-xs">
                        Release to upload
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">
                        Drop your files here
                    </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <span className="mb-5 flex text-black/40">
                            {icon}
                        </span>

                        <span className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-black sm:text-xs">
                            {label}
                        </span>

                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">
                            {sublabel}
                        </span>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.div>
  );
}