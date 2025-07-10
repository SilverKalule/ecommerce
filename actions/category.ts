"use server";
// import { CategoryProps } from "@/components/dashboard/categoryForm";
// import prisma from "@/prisma/db";
// import { error } from "console";

import { ProductProps } from "@/components/dashboard/productForm";
import prisma from "@/prisma/db";

// //create new category
// export async function createCategory(data: CategoryProps) {
//   try {
//     console.log(data);
//     const newCategory = await prisma.category.create({
//       data: {
//         image: data.image,
//         name: data.name,
//         slug: data.slug,
//         date: new Date(data.date),
//       },
//     });
//     return { success: true, error: null };
//   } catch (error) {
//     console.log(error);
//     return { success: false, error: "Something well wrong" };
//   }
// }

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
  }
}
export async function createProduct(data: ProductProps) {
  try {
    const newProd = await prisma.product.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        image: data.image,
        price: data.price,
        slug: data.slug,
      },
    });
    console.log(newProd);
    return newProd;
  } catch (error) {
    console.log(error);
  }
}
