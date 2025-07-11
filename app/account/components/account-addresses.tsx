// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Plus, Edit, Trash2, MapPin } from "lucide-react"
// import { AddressForm } from "@/components/address-form"

// interface Address {
//   id: string
//   type: "billing" | "shipping"
//   isDefault: boolean
//   firstName: string
//   lastName: string
//   company?: string
//   address: string
//   apartment?: string
//   city: string
//   state: string
//   zipCode: string
//   country: string
// }

// export function AccountAddresses() {
//   const [addresses, setAddresses] = useState<Address[]>([
//     {
//       id: "1",
//       type: "shipping",
//       isDefault: true,
//       firstName: "John",
//       lastName: "Doe",
//       address: "123 Main Street",
//       apartment: "Apt 4B",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//       country: "United States",
//     },
//     {
//       id: "2",
//       type: "billing",
//       isDefault: false,
//       firstName: "John",
//       lastName: "Doe",
//       company: "Acme Corp",
//       address: "456 Business Ave",
//       city: "New York",
//       state: "NY",
//       zipCode: "10002",
//       country: "United States",
//     },
//   ])
//   const [showForm, setShowForm] = useState(false)
//   const [editingAddress, setEditingAddress] = useState<Address | null>(null)

//   const handleAddAddress = (addressData: Omit<Address, "id">) => {
//     const newAddress = {
//       ...addressData,
//       id: Date.now().toString(),
//     }
//     setAddresses((prev) => [...prev, newAddress])
//     setShowForm(false)
//   }

//   const handleEditAddress = (addressData: Omit<Address, "id">) => {
//     if (editingAddress) {
//       setAddresses((prev) =>
//         prev.map((addr) => (addr.id === editingAddress.id ? { ...addressData, id: editingAddress.id } : addr)),
//       )
//       setEditingAddress(null)
//     }
//   }

//   const handleDeleteAddress = (id: string) => {
//     setAddresses((prev) => prev.filter((addr) => addr.id !== id))
//   }

//   const handleSetDefault = (id: string, type: "billing" | "shipping") => {
//     setAddresses((prev) =>
//       prev.map((addr) => ({
//         ...addr,
//         isDefault: addr.id === id && addr.type === type ? true : addr.type === type ? false : addr.isDefault,
//       })),
//     )
//   }

//   if (showForm || editingAddress) {
//     return (
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold">{editingAddress ? "Edit Address" : "Add New Address"}</h2>
//           <Button
//             variant="outline"
//             onClick={() => {
//               setShowForm(false)
//               setEditingAddress(null)
//             }}
//           >
//             Cancel
//           </Button>
//         </div>
//         <AddressForm initialData={editingAddress} onSubmit={editingAddress ? handleEditAddress : handleAddAddress} />
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Saved Addresses</h2>
//         <Button onClick={() => setShowForm(true)}>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Address
//         </Button>
//       </div>

//       {addresses.length === 0 ? (
//         <Card>
//           <CardContent className="py-16 text-center">
//             <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//             <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
//             <p className="text-muted-foreground mb-6">Add your shipping and billing addresses for faster checkout.</p>
//             <Button onClick={() => setShowForm(true)}>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Your First Address
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-4">
//           {addresses.map((address) => (
//             <Card key={address.id}>
//               <CardHeader className="pb-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <CardTitle className="text-lg capitalize">{address.type} Address</CardTitle>
//                     {address.isDefault && <Badge variant="default">Default</Badge>}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" onClick={() => setEditingAddress(address)}>
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button variant="outline" size="sm" onClick={() => handleDeleteAddress(address.id)}>
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-1 text-sm">
//                   <p className="font-medium">
//                     {address.firstName} {address.lastName}
//                   </p>
//                   {address.company && <p className="text-muted-foreground">{address.company}</p>}
//                   <p>{address.address}</p>
//                   {address.apartment && <p>{address.apartment}</p>}
//                   <p>
//                     {address.city}, {address.state} {address.zipCode}
//                   </p>
//                   <p>{address.country}</p>
//                 </div>

//                 {!address.isDefault && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="mt-3"
//                     onClick={() => handleSetDefault(address.id, address.type)}
//                   >
//                     Set as Default
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
"use client";

import { Edit, MapPin, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { AddressForm } from "@/components/address-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Address {
  id: string;
  type: "billing" | "shipping";
  isDefault: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

/* -------------------------------------------------------------------- */
/*                           Component                                  */
/* -------------------------------------------------------------------- */

export function AccountAddresses() {
  /* session ---------------------------------------------------------- */
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const API = process.env.NEXT_PUBLIC_API_URL;

  /* state ------------------------------------------------------------ */
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  /* form / edit toggles --------------------------------------------- */
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  /* ------------------------------------------------------------------ */
  /*                         API helpers                                */
  /* ------------------------------------------------------------------ */

  /** GET /addresses */
  const fetchAddresses = async () => {
    if (!token || !API) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setAddresses(json.data || []);
    } catch (err) {
      console.error("❌ fetch addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  /** POST /addresses */
  const addAddress = async (payload: Omit<Address, "id">) => {
    if (!token || !API) return;
    try {
      const res = await fetch(`${API}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchAddresses();
      setShowForm(false);
    } catch (err) {
      console.error("❌ add address:", err);
    }
  };

  /** PUT /addresses/:id */
  const updateAddress = async (payload: Omit<Address, "id">) => {
    if (!editingAddress || !token || !API) return;
    try {
      const res = await fetch(`${API}/addresses/${editingAddress.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchAddresses();
      setEditingAddress(null);
    } catch (err) {
      console.error("❌ update address:", err);
    }
  };

  /** DELETE /addresses/:id */
  const deleteAddress = async (id: string) => {
    if (!token || !API) return;
    try {
      await fetch(`${API}/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAddresses();
    } catch (err) {
      console.error("❌ delete address:", err);
    }
  };

  /** PATCH /addresses/:id/set-default */
  const setDefault = async (id: string) => {
    if (!token || !API) return;
    try {
      await fetch(`${API}/addresses/${id}/set-default`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAddresses();
    } catch (err) {
      console.error("❌ set default:", err);
    }
  };

  /* initial load ----------------------------------------------------- */
  useEffect(() => {
    if (token) fetchAddresses();
  }, [token]);

  /* ------------------------------------------------------------------ */
  /*                         Render – form                              */
  /* ------------------------------------------------------------------ */

  if (showForm || editingAddress) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h2>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingAddress(null);
            }}
          >
            Cancel
          </Button>
        </div>

        <AddressForm
          initialData={editingAddress}
          onSubmit={editingAddress ? updateAddress : addAddress}
        />
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /*                         Render – list                              */
  /* ------------------------------------------------------------------ */

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Address
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : addresses.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
            <p className="text-muted-foreground mb-6">
              Add your shipping and billing addresses for faster checkout.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Your First Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <Card key={addr.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg capitalize">
                      {addr.type} Address
                    </CardTitle>
                    {addr.isDefault && <Badge variant="default">Default</Badge>}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingAddress(addr)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAddress(addr.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">
                    {addr.firstName} {addr.lastName}
                  </p>
                  {addr.company && (
                    <p className="text-muted-foreground">{addr.company}</p>
                  )}
                  <p>{addr.addressLine1}</p>
                  {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                  <p>
                    {addr.city}, {addr.state} {addr.postalCode}
                  </p>
                  <p>{addr.country}</p>
                  {addr.phone && <p>📞 {addr.phone}</p>}
                </div>

                {!addr.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setDefault(addr.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
