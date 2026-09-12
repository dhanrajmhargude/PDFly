"use client"

import { AnimatePresence, motion, Reorder } from "framer-motion";
import { GripVertical, X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatBytes } from "@/lib/utlis/file";
import { cn } from "@/lib/utlis/cn";
import { PdfIcon } from "./PdfIcon";

interface FileListProps {
    files: File[];
    onRemove: (index: number) => void;
    reorderable?: boolean;
    onReorder?: (files: File[]) => void; 
    className?: string; 
}

function fileKey(file: File) {
    return `${file.name}-${file.size}-${file.lastModified}`;
}

function FileIcon({ file }: { file: File }) {
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file.type.startsWith("image/")) {
            setUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    if (url) {
        return (
            <img
                src={url}
                alt=""
                className="h-10 w-10 shrink-0 border border-black/10 object-cover"
            />
        );
    }

    return (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-black/[0.02]">
            <PdfIcon className="h-5 w-5 text-black/40 transition-colors group-hover:text-black" aria-hidden="true" />
        </span>
    );
}

export function FileList({
    files,
    onRemove,
    reorderable = false,
    onReorder,
    className,
}: FileListProps) {
    const [orderedFiles, setOrderedFiles] = useState(files); 

    useEffect(() => {
        setOrderedFiles(files);
    }, [files]);

    const handleReorder = (nextFiles: File[]) => { 
        setOrderedFiles(nextFiles);
        onReorder?.(nextFiles);
    };

    const items = reorderable ? orderedFiles : files;

    
    const row = (file: File, index: number, isReorderItem = false) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
                "group flex items-center gap-4",
                "border border-dashed border-black/50 bg-white",
                "px-4 py-3",
                "transition-all duration-200 ease-out",
                "hover:border-black hover:bg-black/[0.02]"
            )}
        >
            {reorderable ? (
                <GripVertical
                    className={cn(
                        "h-4 w-4 text-text-muted",
                        isReorderItem && "cursor-grab active:cursor-grabbing",
                    )}
                    aria-hidden="true"
                />
            ) : null}
            <FileIcon file={file} />
            <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-black sm:text-xs">
                {file.name}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">
                {formatBytes(file.size)}
                </p>
            </div>
            <button
                type="button"
                onClick={() => onRemove(files.findIndex((item) => item === file))}
                className="shrink-0 border border-dashed border-black/50 bg-white p-1.5 text-black/40 transition-all duration-150 ease-out hover:border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black/20"                aria-label={`Remove ${file.name}`}
            >
                <X className="h-4 w-4" aria-hidden="true" />
            </button>
        </motion.div>
    );

    if (reorderable) {
        return (
            <Reorder.Group
                axis="y"
                values={orderedFiles}
                onReorder={handleReorder} 
                className={cn("mt-6 space-y-2", className)}
            >
                <AnimatePresence initial={false}>
                    {orderedFiles.map((file, index) => (
                        <Reorder.Item key={fileKey(file)} value={file}>
                            {row(file, index, true)} 
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        );
    }

    return (
        <div className={cn("space-y-2", className)}>
            <AnimatePresence initial={false}>
                {items.map((file, index) => (
                    <div key={fileKey(file)}>{row(file, index)}</div>
                ))}
            </AnimatePresence>
        </div>
    );
}