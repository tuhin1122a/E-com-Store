// components/category/filters/StockFilter.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  updateURL: (updates: Record<string, string | null>) => void;
}

export function StockFilter({ inStockOnly, setInStockOnly, updateURL }: Props) {
  const handleChange = (checked: boolean) => {
    setInStockOnly(checked);
    updateURL({ inStock: checked ? "true" : null });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={handleChange}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
