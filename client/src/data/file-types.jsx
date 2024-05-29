import PDFIcon from "@/assets/pdf.png";
import TextIcon from "@/assets/txt.png";
import JPGIcon from "@/assets/jpg.png";
import PNGIcon from "@/assets/png.png";
import PPTXIcon from "@/assets/ppt.png";
import XLSXIcon from "@/assets/xls.png";
import DOCXIcon from "@/assets/doc.png";

export const fileTypeIcons = [
    {
        mime: "application/pdf",
        name: "PDF",
        icon: PDFIcon,
    },
    {
        mime: "text/plain",
        name: "TEXT",
        icon: TextIcon,
    },
    {
        mime: "image/jpg",
        name: "JPG",
        icon: JPGIcon,
    },
    {
        mime: "image/png",
        name: "PNG",
        icon: PNGIcon,
    },
    {
        mime: "image/jpeg",
        name: "JPEG",
        icon: JPGIcon,
    },
    {
        mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        name: "PPTX",
        icon: PPTXIcon,
    },
    {
        mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        name: "XLSX",
        icon: XLSXIcon,
    },
    {
        mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        name: "DOCX",
        icon: DOCXIcon,
    },
];
