import { CategoryHeader } from "@/app/category/components/category-header";
import { getCategoryBySlug } from "@/utility/getCategoryBySlug";
import { Suspense } from "react";
import { CategoryContent } from "../components/CategoryContent";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);

  return {
    title: category?.name || "Category",
    description: category?.description || "Explore products",

    openGraph: {
      title: category?.name || "Category",
      description: category?.description || "Explore products",
      url: `https://yourdomain.com/category/${params.slug}`,
      siteName: "Your Site Name",
      images: [
        {
          url: category?.imageUrl || "/default-og-image.jpg",
          width: 800,
          height: 600,
          alt: category?.name || "Category Image",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: category?.name || "Category",
      description: category?.description || "Explore products",
      images: [category?.imageUrl || "/default-twitter-image.jpg"],
    },

    // Optional canonical URL
    alternates: {
      canonical: `https://yourdomain.com/category/${params.slug}`,
    },
  };
}

interface CategoryPageProps {
  params: { slug: string };
  searchParams: Record<string, string | undefined>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = params;
  const categoryData = await getCategoryBySlug(slug);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* ...Breadcrumb code here (unchanged) */}

      <div className="container mx-auto px-4 py-8 space-y-8">
        <Suspense
          fallback={
            <div className="h-32 bg-white dark:bg-gray-800 rounded-lg animate-pulse mb-8" />
          }
        >
          <CategoryHeader slug={slug} category={categoryData} />
        </Suspense>

        <CategoryContent
          slug={slug}
          categoryData={categoryData}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}
