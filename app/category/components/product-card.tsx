// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { Heart, ShoppingCart, Star } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   price: number;
//   costPrice: number;
//   images: { url: string }[];
//   averageRating: number;
//   reviewCount: number;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { data: session } = useSession();
//   const accessToken = session?.user?.accessToken;

//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [loadingWishlist, setLoadingWishlist] = useState(false);

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   // Check if product is in wishlist on mount
//   useEffect(() => {
//     if (!accessToken) return;

//     const checkWishlist = async () => {
//       try {
//         const res = await fetch(`${apiUrl}/wishlist/check/${product.id}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         const data = await res.json();
//         setIsWishlisted(data.inWishlist);
//       } catch (error) {
//         console.error("Error checking wishlist:", error);
//       }
//     };
//     checkWishlist();
//   }, [product.id, apiUrl, accessToken]);

//   // Add to cart handler (demo)
//   const handleAddToCart = async () => {
//     setIsAddingToCart(true);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     setIsAddingToCart(false);
//     // TODO: Add actual cart logic here
//   };

//   // Toggle wishlist handler
//   const handleToggleWishlist = async () => {
//     if (!accessToken) {
//       alert("You must be logged in to use the wishlist.");
//       return;
//     }

//     setLoadingWishlist(true);
//     try {
//       let url = "";
//       let method = "";

//       if (isWishlisted) {
//         // DELETE route with productId as param
//         url = `${apiUrl}/wishlist/delete/${product.id}`;
//         method = "DELETE";
//       } else {
//         // POST route with productId in body
//         url = `${apiUrl}/wishlist/add`;
//         method = "POST";
//       }

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: !isWishlisted ? JSON.stringify({ productId: product.id }) : null,
//       });

//       if (!res.ok) throw new Error("Failed to update wishlist");

//       setIsWishlisted(!isWishlisted);
//     } catch (error) {
//       console.error("Wishlist update error:", error);
//     } finally {
//       setLoadingWishlist(false);
//     }
//   };

//   const discountPercentage =
//     product.costPrice > product.price
//       ? Math.round(
//           ((product.costPrice - product.price) / product.costPrice) * 100
//         )
//       : 0;

//   const imageUrl = product.images?.[0]?.url || "/placeholder.svg";

//   return (
//     <Card className="group hover:shadow-lg transition-shadow duration-300">
//       <div className="relative overflow-hidden">
//         <Link href={`/product/${product.id}`}>
//           <Image
//             src={imageUrl}
//             alt={product.name}
//             width={300}
//             height={300}
//             className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         </Link>

//         {/* Discount Badge */}
//         {discountPercentage > 0 && (
//           <div className="absolute top-2 left-2">
//             <Badge variant="destructive" className="text-xs">
//               -{discountPercentage}%
//             </Badge>
//           </div>
//         )}

//         {/* Wishlist button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute top-2 right-2 bg-white/80 hover:bg-white"
//           onClick={handleToggleWishlist}
//           disabled={loadingWishlist}
//         >
//           <Heart
//             className={cn(
//               "h-4 w-4",
//               isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
//             )}
//           />
//         </Button>

//         {/* Add to cart button (visible on hover) */}
//         <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <Button
//             className="w-full"
//             onClick={handleAddToCart}
//             disabled={isAddingToCart}
//           >
//             <ShoppingCart className="h-4 w-4 mr-2" />
//             {isAddingToCart ? "Adding..." : "Add to Cart"}
//           </Button>
//         </div>
//       </div>

//       <CardContent className="p-4">
//         <Link href={`/product/${product.slug}`}>
//           <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">
//             {product.name}
//           </h3>
//         </Link>

//         {/* Rating */}
//         <div className="flex items-center gap-1 mb-2">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={cn(
//                   "h-3 w-3",
//                   i < Math.floor(product.averageRating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 )}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-muted-foreground">
//             ({product.reviewCount})
//           </span>
//         </div>

//         {/* Price */}
//         <div className="flex items-center gap-2">
//           <span className="font-bold text-lg">${product.price}</span>
//           {product.costPrice > product.price && (
//             <span className="text-sm text-muted-foreground line-through">
//               ${product.costPrice}
//             </span>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, Star, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  costPrice: number;
  images: { url: string }[];
  averageRating: number;
  reviewCount: number;
}

export function ProductCard({ product }) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  console.log("Product Card:", product);
  const productId = product.id;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const imageUrl = product.images?.[0]?.url || "/placeholder.svg";
  console.log("Image URL:", imageUrl);

  const discountPercentage =
    product.costPrice > product.price
      ? Math.round(
          ((product.costPrice - product.price) / product.costPrice) * 100
        )
      : 0;

  // ✅ Check if product is in wishlist
  useEffect(() => {
    if (!accessToken) return;

    const checkWishlist = async () => {
      try {
        const res = await fetch(`${apiUrl}/wishlist/check/${productId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setIsWishlisted(data.inWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlist();
  }, [accessToken, productId, apiUrl]);

  // ✅ Check if product is already in cart
  useEffect(() => {
    if (!accessToken) return;

    const checkCart = async () => {
      try {
        const res = await fetch(`${apiUrl}/cart/check/${product.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setIsInCart(data.inCart);
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };

    checkCart();
  }, [accessToken, productId, apiUrl]);

  // ✅ Handle Add to Cart
  const handleAddToCart = async () => {
    if (!accessToken) {
      alert("You must be logged in to add to cart.");
      return;
    }

    setLoadingCart(true);
    try {
      const res = await fetch(`${apiUrl}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      setIsInCart(true);
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  // ✅ Handle Remove from Cart
  const handleRemoveFromCart = async () => {
    if (!accessToken) {
      alert("You must be logged in to remove from cart.");
      return;
    }

    setLoadingCart(true);
    try {
      const res = await fetch(`${apiUrl}/cart/remove/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove from cart");

      setIsInCart(false);
    } catch (error) {
      console.error("Remove from cart error:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  // ✅ Toggle Wishlist
  const handleToggleWishlist = async () => {
    if (!accessToken) {
      alert("You must be logged in to use the wishlist.");
      return;
    }

    setLoadingWishlist(true);
    try {
      let url = "";
      let method = "";

      if (isWishlisted) {
        url = `${apiUrl}/wishlist/delete/${product.id}`;
        method = "DELETE";
      } else {
        url = `${apiUrl}/wishlist/add`;
        method = "POST";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: !isWishlisted ? JSON.stringify({ productId: product.id }) : null,
      });

      if (!res.ok) throw new Error("Failed to update wishlist");

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Wishlist update error:", error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          </div>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleToggleWishlist}
          disabled={loadingWishlist}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </Button>

        {/* Cart Button */}
        {/* Cart Button */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            className={cn(
              "w-full",
              isInCart
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-primary hover:bg-primary-dark text-white"
            )}
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            disabled={loadingCart}
          >
            {loadingCart ? (
              "Processing..."
            ) : isInCart ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Remove from Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.costPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.costPrice}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
