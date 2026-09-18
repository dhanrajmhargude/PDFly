import type { LucideIcon } from "lucide-react";

import {
  FilePlus2,
  Image as ImageIcon,
  FileText,
  FileType2,
  FileSpreadsheet,
  BookOpen,
} from "lucide-react";

export interface Data {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const tools: Data[] = [
  {
    slug: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one file",
    icon: FilePlus2,
  },
  {
    slug: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Export pages as high-quality images",
    icon: ImageIcon,
  },
  {
    slug: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert .docx files to PDF",
    icon: FileText,
  },
  {
    slug: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert spreadsheets to PDF",
    icon: FileSpreadsheet,
  },
  {
    slug: "pdf-to-epub",
    title: "PDF to EPUB",
    description: "For Kindle and e-readers",
    icon: BookOpen,
  },
  {
    slug: "jpg-to-pdf",
    title: "Images to PDF",
    description: "Convert JPG or PNG to PDF",
    icon: FileType2,
  },
  {
    slug: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert .docx files to PDF",
    icon: FileText,
  },
  ];