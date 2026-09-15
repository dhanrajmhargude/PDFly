"use client";

import { DownloadCard } from "@/component/shared/DownloadCard";
import { FileDropZone } from "@/component/shared/FileDropZone";
import { FileList } from "@/component/shared/FileList";
import { ProcessButton } from "@/component/shared/ProcessButton";
import { ToolShell } from "@/component/shared/toolshell"
import { usePdfTool } from "@/hook/PdfTool"
import { FileSpreadsheet } from "lucide-react";

export function Excel2PdfClient(){
    const tool = usePdfTool({ multiple:true })
    const loading = tool.status === "processing" 
    return(
        <>
            <ToolShell
                icon = { <FileSpreadsheet className="h-5 w-5" aria-hidden="true"/>}
                title="Excel to Pdf "
                subtitle="Convert the Excel to Pdf seamlessly."
            />
            <FileDropZone
                accept={{ "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"], "application/vnd.ms-excel": [".xls"] }}
                icon={<FileSpreadsheet className="h-5 w-5" aria-hidden="true" />} 
                onDrop={tool.onDrop}
                label="Drop Excel files here"
                sublabel="Select .xlsx and xls "
            />
            
            {tool.files.length > 0 ?(
                <FileList 
                    files={tool.files}
                    onRemove={tool.removeFile}
                />
            ) : null }

            {tool.error ? (
                <p className="text-sm font-medium text-error">{tool.error}</p>
            ) : null}

            {tool.result?(
                <DownloadCard 
                    blob={tool.result.blob}
                    filename={tool.result.filename}
                    onReset={tool.reset}
                />
                ):(
                    <ProcessButton 
                    
                        disabled={tool.files.length === 0} 
                        loading={loading} progress={tool.progress} 
                        onClick={() => 
                            tool.process(async ([file], onProgress) => {
                                const { excelToPdf } = await import("@/lib/convert/excel-to-pdf");
                                onProgress(20);
                                const blob = await excelToPdf(file);
                                onProgress(100);
                                return { blob, filename: `${baseName(file.name)}.pdf` };
                            })
                        }
                    >
                    Convert to PDF
                    </ProcessButton>
                )
            }            
        </>
    )
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}