import type { Metadata } from "next";

import { Pdf2JpgClient } from "./Pdf2JpgClient";

export const metadata: Metadata = {
    title: "Excel to PDF Free - No Watermark | Paperlab",
    description:
    "Convert spreadsheets to PDF in your browser. No watermark, no upload, no sign-up.",
};

export default function ExcelToPdfPage() {
    return <Pdf2JpgClient/>;
}
