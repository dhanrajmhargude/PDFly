"use client";

import { ToolShell } from "@/component/shared/toolshell";
import { FilePlus2 } from "lucide-react";
import { FileDropZone } from "@/component/shared/FileDropZone";
import { usePdfTool } from "@/hook/PdfTool";
import { FileList } from "@/component/shared/FileList";
import { DownloadCard } from "@/component/shared/DownloadCard";
import { ProcessButton } from "@/component/shared/ProcessButton"

export function MergePdfClient(){
    const tool = usePdfTool({ multiple: true });
    const loading = tool.status === "processing";
    return(
        <>
            <ToolShell
                icon={<FilePlus2 className="h-5 w-5" aria-hidden="true" />}
                title="Merge PDF"
                subtitle="Combine multiple PDFs into one. Drag to reorder before merging."
            />
            
            <FileDropZone
                accept={{ "application/pdf": [".pdf"] }}
                multiple
                icon={<FilePlus2 className="h-5 w-5" aria-hidden="true" />} 
                onDrop={tool.onDrop}
                label="Drop PDF files here"
                sublabel="Select 2 or more files"
            />
            
            {tool.files.length > 0 ? (
                <FileList
                    files={tool.files}
                    onRemove={tool.removeFile}
                    reorderable
                    onReorder={tool.reorderFiles}
                />
            ) : null} 

            {tool.error ? (
                <p className="text-sm font-medium text-error">{tool.error}</p>
            ) : null}
            
            {tool.result ? (
                <DownloadCard
                    blob={tool.result.blob}
                    filename={tool.result.filename}
                    onReset={tool.reset}
                />
            ):(
                <ProcessButton

                    disabled={tool.files.length < 2}
                    loading={loading}
                    progress={tool.progress}
                    onClick={() =>
                        tool.process(async (files, onProgress) => {
                            const { mergePdfs } = await import("@/lib/pdf/merge");

                            onProgress(20);
                            const blob = await mergePdfs(files);
                            onProgress(100);

                            return { blob, filename: "merged.pdf" };
                        })
                    }
                >
                Merge Files
                </ProcessButton>
            )}
        </>
    )
}