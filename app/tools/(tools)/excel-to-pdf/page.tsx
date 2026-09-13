import type { Metadata } from "next";

import { Excel2PdfClient } from "./Excel2PdfClient";

export const metadata: Metadata = {
  title: "Excel to PDF Free - No Watermark | Paperlab",
  description:
    "Convert spreadsheets to PDF in your browser. No watermark, no upload, no sign-up.",
};

export default function ExcelToPdfPage() {
  return <Excel2PdfClient />;
}
