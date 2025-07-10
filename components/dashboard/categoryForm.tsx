"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "../ui/uploadthing";
import * as z from "zod";

// Category Schema
const categorySchema = z.object({
  image: z.string().optional(),
  name: z.string().min(3, "Category Name must atleast 3 characters"),
  slug: z.string().min(3, "Category Name must atleast 3 characters"),
});
export type CategoryProps = {
  id: string;
  image: string;
  name: string;
  slug: string;
  date: string;
};

export default function CategoryForm({ onSuccess }: { onSuccess: () => void }) {
  const [image, setImage] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      slug: "",
      date: "",
      image: "",
    },
  });
  function generateSlug(name: string): string {
    return name
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading/trailing spaces
      .replace(/&/g, "and") // Replace & with 'and'
      .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  }
  const [loading, setLoading] = useState(false);
  async function saveData(data: CategoryProps) {
    setLoading(true);
    data.slug = generateSlug(data.name);
    data.image = image;
    const response = await fetch("http://localhost:3000/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-cache",
    });
    if (response.status === 201) {
      console.log(data);
      setLoading(false);
      reset();
      onSuccess();
      alert("Category Created");
    } else {
      console.log(response);
    }
  }
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md mt-12">
      <form
        onSubmit={handleSubmit(saveData)}
        className="max-w-sm mx-auto mb-2 mt-12"
      >
        <h2 className="flex justify-center items-center font-bold mt-2">
          Add New Category
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
        {/* <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Slug
          </label>
          <input
            {...register("slug", { required: true })}
            type="text"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div> */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            {...register("date", { required: true })}
            type="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              setImage(res[0].url);
              // alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
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
