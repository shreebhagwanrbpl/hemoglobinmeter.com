import ProductDetails from "./ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { shouldIndexProduct } from "@/lib/seo-safety";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const allProducts = await fetchFullCatalog();
    const product = allProducts.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: "Product Not Found | " + SITE_NAME,
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const isIndexable = shouldIndexProduct(product);

    const title = `${product.title} ${product.brand ? `by ${product.brand}` : ""
        } | Price, Specification & Quotation`;

    const description =
        product.desc ||
        product.description ||
        `Buy high-quality ${product.title} ${product.brand ? `by ${product.brand}` : ""
        } model ${product.model || ""} from Raj Biosis. Trusted laboratory and medical diagnostic equipment supplier.`;

    const url = `${SITE_URL}/items/${slug}`;

    return {
        title,
        description,

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            type: "website",
            images: [
                {
                    url: product.image || "/logo.png",
                    alt: product.title,
                },
            ],
            locale: "en_IN",
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [product.image || "/logo.png"],
        },

        robots: {
            index: isIndexable,
            follow: isIndexable,
            googleBot: {
                index: isIndexable,
                follow: isIndexable,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },

        metadataBase: new URL(SITE_URL),
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    const allProducts = await fetchFullCatalog();
    const product = allProducts.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": `${SITE_URL}/items`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": product.category || "Biomedical Equipment",
                "item": product.category ? `${SITE_URL}/category/${makeSlug(product.category)}` : `${SITE_URL}/items`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": product.title,
                "item": `${SITE_URL}/items/${slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ProductDetails slug={slug} />
        </>
    );
}