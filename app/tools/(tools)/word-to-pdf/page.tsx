import { Metadata } from "next";

import { Word2PdfCli } from "./Word2PdfClient";

export const metadata : Metadata = {
    title : "WORD to Pdf - No Watermark | PDFly",
    description:
    "Convert PDF text to EPUB for e-readers. No watermark, no upload, no sign-up."
}

export default function Word2PdfPage(){
    return <Word2PdfCli />;
}