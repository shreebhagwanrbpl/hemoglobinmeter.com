export async function generateMetadata({ params }) {

  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://hemoglobinmeter.com/${district}`;

  return {
    title: `Biomedical & Diagnostic Equipment Supplier in ${districtName} | Raj Biosis`,

    description: `Raj Biosis provides a broad biomedical product catalogue for buyers in ${districtName}, covering equipment, diagnostic items, supplies and related products.`,

    keywords: [
      `Biomedical Equipment ${districtName}`,
      `Diagnostic Machines ${districtName}`,
      `Laboratory Equipment ${districtName}`,
      `Pathology Equipment ${districtName}`,
      `Biomedical Supplier ${districtName}`,
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Biomedical Equipment in ${districtName}`,
      description: `Biomedical product catalogue and enquiry resource for ${districtName}.`,
      url,
      type: "website",
    },
  };
}

export default function DistrictLayout({ children }) {
  return children;
}
