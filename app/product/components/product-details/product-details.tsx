import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { RotateCcw, Shield, Star, Truck } from "lucide-react";
import { ProductGallery } from "./product-gallery";
import { ProductInteraction } from "./product-interaction";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path to your auth options

interface ProductDetailsProps {
  product: any; // Tip: Define a proper type for your product
}

// Helper function to check status on the server
// async function checkUserStatus(
//   productId: string,
//   accessToken: string | undefined
// ) {
//   if (!accessToken) return { inWishlist: false, inCart: false };
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const [wishlistRes, cartRes] = await Promise.all([
//       fetch(`${apiUrl}/wishlist/check/${productId}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         cache: "no-store", // Ensure fresh data for user-specific checks
//       }),
//       fetch(`${apiUrl}/cart/check/${productId}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         cache: "no-store",
//       }),
//     ]);

//     const wishlistData = await wishlistRes.json();
//     const cartData = await cartRes.json();

//     return {
//       inWishlist: wishlistData.inWishlist,
//       inCart: cartData.inCart,
//     };
//   } catch (error) {
//     console.error("Server-side status check failed:", error);
//     return { inWishlist: false, inCart: false };
//   }
// }

export async function ProductDetails({ product }: ProductDetailsProps) {
  // 1. Fetch user-specific data ON THE SERVER
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  // const { inWishlist, inCart } = await checkUserStatus(product.id, accessToken);

  // 2. Perform calculations ON THE SERVER
  const discountPercentage =
    product.onSale && product.salePrice && product.costPrice
      ? Math.round(
          ((product.salePrice - product.costPrice) / product.salePrice) * 100
        )
      : 0;

  const images = product.images.map((img: any) => img.url);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Client Component for interactive gallery */}
      <ProductGallery
        images={images}
        productName={product.name}
        discountPercentage={discountPercentage}
      />

      <div className="space-y-6">
        {/* Static Info Rendered on Server */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.averageRating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.averageRating ?? 0} ({product.reviewCount ?? 0})
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">${product.salePrice}</span>
            {product.price && (
              <span className="text-xl line-through text-muted-foreground">
                ${product.price}
              </span>
            )}
          </div>
          <p className="text-muted-foreground mb-6">{product.description}</p>
        </div>

        {/* Client Component for all user actions */}
        <ProductInteraction product={product} />

        <Separator />

        {/* Static Info Rendered on Server */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm">2 Year Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-primary" />
            <span className="text-sm">30 Day Returns</span>
          </div>
        </div>

        <Separator />

        {/* Static Tabs Rendered on Server */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="space-y-2 pt-2">
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((f: any) => (
                <li key={f.id} className="text-sm">
                  {f.value}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="space-y-2 pt-2">
            <div className="space-y-2">
              {product.specifications.map((s: any) => (
                <div key={s.id} className="flex justify-between text-sm">
                  <span className="font-medium">{s.key}:</span>
                  <span>{s.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
