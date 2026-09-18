import type { Metadata } from "next";

import { JpgToPdf } from "./JpgToPdf";

export const metadata: Metadata ={
    title: "Image To Pdf",
    description:
    "Covert multiple Images into one. No watermark, no upload, no sign-up."
}

export default function JpgToPdfPage(){
    return <JpgToPdf/>
}
