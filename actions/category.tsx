// "use server";
// import { CategoryProps } from "@/components/dashboard/categoryForm";
// import prisma from "@/prisma/db";
// import { error } from "console";

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
