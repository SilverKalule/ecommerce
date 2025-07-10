import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  try {
    const createCategory = await prisma.category.create({
      data: {
        image: data.image,
        name: data.name,
        slug: data.slug,
        date: new Date(data.date),
      },
    });
    revalidatePath("/");
    return NextResponse.json(
      {
        data: createCategory,
        error: null,
        message: "Category activity created successfully",
        status: 201,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: "something went wrong",
        message: "Failed to create Category",
        status: 500,
      },
      { status: 500 }
    );
  }
}
