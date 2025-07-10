import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen gap-6">
      <Button asChild>
        <Link href="/dashboard/categories">Categories</Link>
      </Button>
      <Button asChild>
        <Link href="/dashboard/products">Products</Link>
      </Button>
    </div>
  );
}
