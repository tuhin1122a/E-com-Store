// "use client";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Heart, ShoppingCart, X } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// import { useCart } from "@/context/CartContext";

// interface ProductActionsProps {
//   productId: string;
//   isWishlisted: boolean;
// }

// export function ProductActions({
//   productId,
//   isWishlisted,
// }: ProductActionsProps) {
//   const { data: session } = useSession();
//   const accessToken = session?.user?.accessToken;

//   const { cartItems, addToCart, removeFromCart, isInCart } = useCart();

//   const [inWishlisted, setInWishlisted] = useState(isWishlisted);
//   const [loadingWishlist, setLoadingWishlist] = useState(false);
//   const [loadingCart, setLoadingCart] = useState(false);
//   console.log("inWishlisted:", inWishlisted);
//   // Cart status from context
//   const inCart = isInCart(productId);

//   const toggleWishlist = async () => {
//     if (!accessToken) {
//       alert("Login required.");
//       return;
//     }
//     setLoadingWishlist(true);

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(
//         isWishlisted
//           ? `${apiUrl}/wishlist/delete/${productId}` // DELETE request with productId in URL
//           : `${apiUrl}/wishlist/add`, // POST request with productId in body
//         {
//           method: isWishlisted ? "DELETE" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: isWishlisted ? null : JSON.stringify({ productId }),
//         }
//       );

//       if (!res.ok) {
//         // Extract error details from response body if possible
//         const errorData = await res.json().catch(() => ({}));
//         console.error("❌ Wishlist error:", errorData);

//         // If error message says product already in wishlist, sync UI state accordingly
//         if (errorData.message === "Product already in wishlist") {
//           setInWishlisted(true);
//         } else if (errorData.message === "Product not found") {
//           // Optional: Handle product not found case
//           alert("Product not found.");
//         }

//         throw new Error(errorData.message || "Wishlist update failed.");
//       }

//       // If request succeeded, toggle UI state
//       setInWishlisted(!inWishlisted);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingWishlist(false);
//     }
//   };

//   // Cart toggle uses context methods (optimistic UI update)
//   const toggleCart = async () => {
//     if (!accessToken) return alert("Login required.");

//     setLoadingCart(true);
//     try {
//       if (inCart) {
//         // Remove from cart context + call backend if you want
//         await removeFromCart(productId);
//       } else {
//         // Add to cart context + call backend if you want
//         // Here we just send productId, for addToCart you might want full product object, adjust accordingly
//         await addToCart({ id: productId } as any); // cast if you want to adjust type
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Cart update failed.");
//     } finally {
//       setLoadingCart(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute top-2 right-2 bg-white/80 hover:bg-white"
//         onClick={toggleWishlist}
//         disabled={loadingWishlist}
//       >
//         <Heart
//           className={cn(
//             "h-4 w-4",
//             inWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
//           )}
//         />
//       </Button>

//       {/* Mobile friendly: always visible on small screens, hover on larger */}
//       <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
//         <Button
//           className={cn(
//             "w-full",
//             inCart
//               ? "bg-red-600 hover:bg-red-700 text-white"
//               : "bg-primary hover:bg-primary-dark text-white"
//           )}
//           onClick={toggleCart}
//           disabled={loadingCart}
//         >
//           {loadingCart ? (
//             "Processing..."
//           ) : inCart ? (
//             <>
//               <X className="h-4 w-4 mr-2" />
//               Remove from Cart
//             </>
//           ) : (
//             <>
//               <ShoppingCart className="h-4 w-4 mr-2" />
//               Add to Cart
//             </>
//           )}
//         </Button>
//       </div>
//     </>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const inCart = isInCart(productId);
  const inWishlist = isInWishlist(productId);

  const toggleWishlist = async () => {
    if (!accessToken) {
      alert("Login required.");
      return;
    }
    setLoadingWishlist(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
      alert("Wishlist update failed.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  const toggleCart = async () => {
    if (!accessToken) {
      alert("Login required.");
      return;
    }
    setLoadingCart(true);
    try {
      if (inCart) {
        await removeFromCart(productId);
      } else {
        await addToCart(productId, 1); // ✅ FIXED: Correct usage
      }
    } catch (err) {
      console.error("Cart toggle failed:", err);
      alert("Cart update failed.");
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        onClick={toggleWishlist}
        disabled={loadingWishlist}
      >
        <Heart
          className={cn(
            "h-4 w-4",
            inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
      </Button>

      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
        <Button
          className={cn(
            "w-full",
            inCart
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-primary hover:bg-primary-dark text-white"
          )}
          onClick={toggleCart}
          disabled={loadingCart}
        >
          {loadingCart ? (
            "Processing..."
          ) : inCart ? (
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
    </>
  );
}
