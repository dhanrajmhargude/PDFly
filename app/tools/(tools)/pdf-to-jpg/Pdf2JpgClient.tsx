"use client"

import { FileDropZone } from "@/component/shared/FileDropZone"
import { ToolShell } from "@/component/shared/toolshell"
import { usePdfTool } from "@/hook/PdfTool"
import { ImageIcon } from "lucide-react"
import { DownloadCard } from "@/component/shared/DownloadCard";
import { Select } from "@/component/ui/Select"
import { FileList } from "@/component/shared/FileList"
import { ProcessButton } from "@/component/shared/ProcessButton";
import { useState , useEffect } from "react"

const dpiOptions = [
  { value: "72", label: "72 DPI" },
  { value: "150", label: "150 DPI" },
  { value: "300", label: "300 DPI" },
];

export function Pdf2JpgClient(){
    const tool = usePdfTool();
    const [dpi, setDpi] = useState("150");
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const loading = tool.status === "processing";

    useEffect(() => {
        return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imageUrls]);
    return(
        <>
            <ToolShell
                icon={<ImageIcon className="h-5 w-5" aria-hidden="true" />}
                title="PDF to JPG"
                subtitle="Export every PDF page as a JPG image."
            />

            <FileDropZone
                accept={{ "application/pdf": [".pdf"] }}
                icon={<ImageIcon className="h-5 w-5" aria-hidden="true" />}
                onDrop={tool.onDrop}
                label="Drop a PDF file here"
                sublabel="Select one PDF"
            />

            {tool.files.length > 0 ? (
                <FileList files={tool.files} onRemove={tool.removeFile} />
            ) : null}
                <Select className=" mt-[20px]"
                label="Image quality"
                options={dpiOptions}
                value={dpi}
                onChange={setDpi}
            />

            {imageUrls.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mt-5">
                    {imageUrls.map((url, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={`Page ${index + 1}`}
                        className="aspect-[3/4] rounded-none border border-border bg-bg-elevated object-cover shadow-sm"
                    />
                    ))}
                </div>
            ) : null}

            {tool.error ? (
                <p className="text-sm font-medium text-error">{tool.error}</p>
            ) : null}

            {tool.result ? (
            <DownloadCard
                blob={tool.result.blob}
                filename={tool.result.filename}
                onReset={() => {
                    imageUrls.forEach((url) => URL.revokeObjectURL(url));
                    setImageUrls([]);
                    tool.reset();
                }}
            />
            ) : (
                <ProcessButton
                    disabled={tool.files.length === 0}
                    loading={loading}
                    progress={tool.progress}
                    onClick={() =>
                    tool.process(async ([file], onProgress) => {
                        const [{ pdfToJpgBlobs }, JSZip] = await Promise.all([
                        import("@/lib/pdf/worker"),
                        import("jszip"),
                        ]);
                        const blobs = await pdfToJpgBlobs(file, Number(dpi));
                        const urls = blobs.map((blob) => URL.createObjectURL(blob));
                        const zip = new JSZip.default();

                        blobs.forEach((blob, index) => {
                        zip.file(`page-${index + 1}.jpg`, blob);
                        });
                        onProgress(80);
                        const blob = await zip.generateAsync({ type: "blob" });
                        onProgress(100);
                        setImageUrls(urls);

                        return { blob, filename: "pdf-images.zip" };
                    })
                    }
                >Convert to JPG
                </ProcessButton>
            )}
        </>

    )
}