"use client"

import {FileDown} from "lucide-react"

import { ToolShell } from "@/component/shared/toolshell"
import { usePdfTool } from "@/hook/PdfTool"
import { FileList } from "@/component/shared/FileList"
import { FileDropZone } from "@/component/shared/FileDropZone"
import { DownloadCard } from "@/component/shared/DownloadCard"
import { ProcessButton } from "@/component/shared/ProcessButton"

export function PdfToWordClient(){
    const tool = usePdfTool({multiple:false})
    const loading = tool.status === "processing"
    return(
        <>
            <ToolShell
                icon={<FileDown className = "h-5 w-5" aria-hidden="true"/>}
                title="Pdf To Word "
                subtitle="Convert Pdf To Word.Drag to reorder before merging."
            />

            <FileDropZone
                accept ={{"application/pdf" : [" .pdf"]}}
                onDrop={tool.onDrop}
                icon={<FileDown className="h-5 w-5" aria-hidden="true"/>}
                label="Drop Pdf File here"
                sublabel="Select on pdf"
            />

            {tool.files.length > 0 ?(
                <FileList files={tool.files} onRemove={tool.removeFile} />
            ):null}

            {tool.error?(
                <p className="text-sm font-medium text-error">{tool.error}</p>
            ):null}

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
                            tool.process( async ( [files] ,onProgress) =>{
                                const [{ extractText }, docx] = await Promise.all([
                                    import("@/lib/pdf/extract-text"),
                                    import("docx"),
                                ]);

                                onProgress(30);
                                const text = await extractText(files);
                                const children = text.split(/\n+/).filter(Boolean).map((line) => new docx.Paragraph({ children: [new docx.TextRun(line)] }));
                                const document = new docx.Document({ sections: [{ children: children.length ? children : [new docx.Paragraph("")] }] });
                                const blob = await docx.Packer.toBlob(document);
                                onProgress(100);
                                return { blob, filename: `${baseName(files.name)}.docx` };
                            })
                        }
                    >
                        Convert to Word
                    </ProcessButton>
                )
            }

        </>
    )
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}
