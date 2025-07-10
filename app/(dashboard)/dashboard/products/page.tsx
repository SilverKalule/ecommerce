import { getCategories } from "@/actions/category";
import ProductThree from "@/components/dashboard/product";
import React from "react";

export default async function Products() {
  const categories = (await getCategories()) || [];
  return (
    <div>
      <ProductThree data={categories} />
    </div>
  );
}
