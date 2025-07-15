// components/category/filters/BrandFilter.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Brand } from "./types";

interface Props {
  brands: Brand[];
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  updateURL: (updates: Record<string, string | null>) => void;
}

export function BrandFilter({
  brands,
  selectedBrands,
  setSelectedBrands,
  updateURL,
}: Props) {
  const handleBrandChange = (slug: string, checked: boolean) => {
    const updated = checked
      ? [...selectedBrands, slug]
      : selectedBrands.filter((s) => s !== slug);
    setSelectedBrands(updated);
    updateURL({ brand: updated.length ? updated.join(",") : null });
  };

  const availableBrands = brands.filter((b) => b.productCount > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Brands</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {availableBrands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.slug}
                checked={selectedBrands.includes(brand.slug)}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand.slug, checked as boolean)
                }
              />
              <Label
                htmlFor={brand.slug}
                className="flex-1 text-sm cursor-pointer"
              >
                {brand.name}
              </Label>
              <span className="text-xs text-muted-foreground">
                ({brand.productCount})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
