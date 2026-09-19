import type { Metadata } from "next";

import { PdfToWordClient } from "./PdfToWordClient";

export const metadata: Metadata = {
  title: "Merge PDF Free - No Watermark | Paperlab",
  description:
    "Combine multiple PDF files into one. No watermark, no upload, no sign-up.",
};

export default function PdfToWord(){
    return<PdfToWordClient/>
}