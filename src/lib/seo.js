export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hemoglobinmeter.com";
export const SITE_NAME = "Raj Biosis";

export function getAbsoluteUrl(path = "") {
  if (!path) return SITE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export const defaultKeywords = [
  "Biomedical Equipment Supplier",
  "Laboratory Equipment Supplier",
  "CBC Machine Supplier",
  "Hematology Analyzer Supplier",
  "Biochemistry Analyzer Supplier",
  "Diagnostic Equipment Supplier",
  "Medical Equipment Supplier India",
  "Raj Biosis"
];

export const defaultDescription = "Raj Biosis is a leading supplier and distributor of biomedical equipment, laboratory machines, and diagnostic systems in India.";
