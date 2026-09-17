"use client";

import { FileText } from "lucide-react";

import { ToolShell } from "@/component/shared/toolshell";
import { FileDropZone } from "@/component/shared/FileDropZone";
import { usePdfTool } from "@/hook/PdfTool";
import { FileList } from "@/component/shared/FileList";
import { DownloadCard } from "@/component/shared/DownloadCard";
import { ProcessButton } from "@/component/shared/ProcessButton";

export function Word2PdfCli(){

    const tool = usePdfTool();
    const loading = tool.status === "processing";

    return(
        <>
            <ToolShell
                icon = {<FileText className="h-5 w-5" aria-hidden="true" />}
                title="Word To pdf"
                subtitle="Combine Word to PDF . Drag to reorder before merging."
            />

            <FileDropZone 
                accept={{ "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"], "application/msword": [".doc"] }}
                icon = {<FileText className="h-5 w-5" aria-hidden="true" />}
                onDrop={tool.onDrop} 
                label="Drop a Word file here" 
                sublabel="Select .doc or .docx"
            />

            {tool.files.length > 0 ?
                <FileList 
                    files={tool.files}
                    onRemove={tool.removeFile}
                />
            : null }

            {tool.error ? (
                <p className="text-sm font-medium text-error">{tool.error}</p>
            ) : null}            

            {tool.result ?(
                    <DownloadCard
                        blob={tool.result.blob} 
                        filename={tool.result.filename} 
                        onReset={tool.reset}
                    />
                ):(
                    <ProcessButton
                        disabled={tool.files.length === 0}
                        loading={loading} 
                        progress={tool.progress}
                        onClick={()=>
                            tool.process(async ([file], onProgress) =>{
                                const { wordToPdf } = await import("@/lib/convert/word-to-pdf");
                                onProgress(20);
                                const blob = await wordToPdf(file);
                                onProgress(100);
                                return { blob, filename: `${baseName(file.name)}.pdf` };
                            })
                        }
                    >
                    Convert to Pdf
                    </ProcessButton>
                )
            }
        </>
    )
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}
