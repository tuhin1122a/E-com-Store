"use client";
import { useEffect, useState } from "react";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: Track visitor (save to DB)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitors/track-visitor`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log("Visitor tracked:", data))
      .catch(console.error);

    // Step 2: Get visitor count
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitors/visitor-count`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Visitor count data: ", data);
        if (data.success) setCount(data.totalVisitors);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading visitor count...</p>;
  if (count === null) return <p>Failed to load visitor count</p>;

  return <p>Total Visitors: {count}</p>;
}
 