"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Cat } from "./product";
import FormSelectInput from "../Inputs/FormSelectInput";
import { createProduct } from "@/actions/category";
export type ProductProps = {
  name: string;
  slug: string;
  image: string;
  price: number;
  categoryId: string;
};

export default function ProductForm({
  onSuccess,
  categories,
}: {
  onSuccess: () => void;
  categories: Cat[];
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      slug: "",
      price: 0,
      categoryId: "",
    },
  });
  const categoryOptions = categories.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  async function saveData(data: ProductProps) {
    data.categoryId = selectedCategory.value;
    data.price = Number(data.price);
    const slug = data.name.trim().toLowerCase().split(" ").join("-");
    data.slug = slug;
    try {
      setLoading(true);
      const res = await createProduct(data);
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
      <form onSubmit={handleSubmit(saveData)} className="max-w-sm mx-auto mb-2">
        <h2 className="flex justify-center items-center font-bold mt-2">
          Add New Products
        </h2>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="">
          <FormSelectInput
            label="Main Categories"
            options={categoryOptions}
            option={selectedCategory}
            setOption={setSelectedCategory}
            toolTipText="Add New  Category"
            href="/dashboard/categories"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <input
            {...register("image", { required: true })}
            type="text"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
