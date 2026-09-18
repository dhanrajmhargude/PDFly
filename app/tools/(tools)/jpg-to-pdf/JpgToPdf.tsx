"use client"

import { FileDropZone } from "@/component/shared/FileDropZone";
import { ToolShell } from "@/component/shared/toolshell"
import { FileList } from "@/component/shared/FileList";
import { usePdfTool } from "@/hook/PdfTool"
import { FileType2 } from "lucide-react";
import { DownloadCard } from "@/component/shared/DownloadCard";
import { ProcessButton } from "@/component/shared/ProcessButton";

export function JpgToPdf(){
    const tool = usePdfTool({multiple:true})
    const loading = tool.status === "processing"
    return(
        <>
            <ToolShell
                icon={<FileType2 className="h-5 w-5" aria-hidden="true"/>}
                title="Image To Pdf"
                subtitle="Convert Image To Pdf.Drag to reorder before merging."
            />

            <FileDropZone
                accept={{"image/jpg" : [".jpg","jpeg"] , "image/png" :[".png"]}}
                multiple
                icon={<FileType2 className="h-5 w-5" aria-hidden="true"/>}
                onDrop={tool.onDrop}
                label="Drop Jpg or Png here"
                sublabel="Select atleast 1 or more "
            />

            {tool.files.length > 0 ?(
                <FileList files={tool.files} onRemove={tool.removeFile} />
            ):null}

            {tool.error?(
                <p className="text-sm font-medium text-error">{tool.error}</p>
            ):null}

            { tool.result ? (
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
                            tool.process( async ( files ,onProgress) =>{
                                const { imagesToPdf } = await import(
                                    "@/lib/convert/images-to-pdf"
                                );

                                onProgress(20);
                                const blob = await imagesToPdf(files);
                                onProgress(100);
                                return { blob, filename: "images.pdf" };
                            })
                        }
                    >
                        Convert to Pdf 
                    </ProcessButton>
                )
            }
        </>
    );
}