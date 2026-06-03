"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input, Textarea } from "@/components/ui/input";

import { del, get, post, put } from "@/helpers/api";
import { ReactSelect } from "@/components/ui/select";
import Link from "next/link";
import { dateConverter, timeConverter, toTop } from "@/helpers/functions";
import { Pencil, Trash2, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config";
import Swal from "sweetalert2";

const Testimonial = () => {
  const [selectedType, setSelectedType] = useState(null);

  const [rows, setRows] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      id: null,
      name: "",
      designation: "",
      url: "",
      image: null,
      testimonial: ""
    },
    onSubmit: (values) => {

      if (formik.values.id) {
        put("testimonial", values)
          .then((res) => {
            fetchData();
            toast.success(res.message);
            handleReset();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || err?.message);
          });
      } else {
        post("testimonial", values)
          .then((res) => {
            fetchData();
            toast.success(res.message);
            handleReset();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || err?.message);
          });
      }
    },
  });

  useEffect(() => {
    // getCategory();
    fetchData();
  }, []);

  // const getCategory = () => {
  //   get("common/blog-category").then((res) => {
  //     setBlogCategoryOptions(res.data);
  //   });
  // };

  const fetchData = () => {
    get("testimonial").then((res) => {
      setRows(res.data);
    });
  };

  const handleEdit = (blog) => {
    formik.setFieldValue("id", blog._id);
    formik.setFieldValue("name", blog.name);
    formik.setFieldValue("designation", blog.designation);
    formik.setFieldValue("image", blog.image);
    formik.setFieldValue("testimonial", blog.testimonial);
    formik.setFieldValue("url", blog.url);
    setImagePreview(`${BASE_URL}/${blog.image}`);
    toTop();
  };


  function handleReset() {
    formik.resetForm();
    setSelectedType(null);
    setImagePreview(null);
  }

  function handleDelete(id) {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        del(`testimonial/${id}`)
          .then((res) => {
            toast.success(res.message);
            fetchData();
          })
          .catch((err) => {
            toast.success(err?.response?.data?.message);
          });
      }
    });
  }
  const handleImageChange = async (e, fieldName, index = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await post("common/image/testimonial", formData);

      // Use image URL from response
      const imageUrl = res.data?.new_filename; // adjust key based on your API

      if (fieldName === "image") {
        formik.setFieldValue("image", imageUrl);
        setImagePreview(BASE_URL + "/" + imageUrl);
      } else if (fieldName === "details" && index !== null) {
        const updatedDetails = [...formik.values.details];
        updatedDetails[index].image = imageUrl;
        formik.setFieldValue("details", updatedDetails);
      }
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  console.log(formik.values, "testimonial value");

  console.log(imagePreview, "image preview");

  return (
    <div className="p-4">
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <Input
            name="name"
            type="text"
            placeholder="Enter name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Designation</label>
          <Input
            name="designation"
            type="text"
            placeholder="Enter designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Video url</label>
          <Input
            name="url"
            type="text"
            placeholder="Enter designation"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>



        <div>
          <label className="block mb-1 text-sm font-medium">Main Image</label>
          <Input
            type="file"
            accept="image/*"
            // onChange={(e) => {
            //   const file = e.currentTarget.files?.[0];
            //   formik.setFieldValue("img", file);
            //   if (file) setImagePreview(URL.createObjectURL(file));
            // }}
            onChange={(e) => {
              handleImageChange(e, "image")
            }}
          />
          {formik.values.img && (
            <div className="text-sm text-gray-500 mt-1">
              Current image: <span className="font-medium">{formik.values.img.split("/").pop()}</span>
            </div>
          )}
        </div>

        {imagePreview && (
          <div>
            <label className="block mb-1 text-sm font-medium">Preview</label>
            <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
          </div>
        )}
        <div className="col-span-full">
          <label className="block mb-1 text-sm font-medium">Testimonial</label>
          <Textarea
            name="testimonial"
            type="textarea"
            placeholder="Enter  Testimonial"
            value={formik.values.testimonial}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>



        <div className="col-span-full">
          <button
            type="submit"
            className={`px-4 py-1 rounded-md text-white transition ${formik.values.id ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
              }`}>
            {formik.values.id ? "Update" : "Submit"}
          </button>

          <button onClick={handleReset} type="button" className={`ml-3 px-4 py-1 rounded-md text-white transition ${"bg-red-600 hover:bg-red-700"}`}>
            Reset
          </button>
        </div>
      </form>

     <div className="mt-10 overflow-x-auto">
  <div className="min-w-full border rounded-lg shadow-sm">
    <table className="min-w-full text-sm text-left whitespace-nowrap">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Designation</th>
          <th className="px-4 py-2 max-w-[200px]">Url</th>
          <th className="px-4 py-2 max-w-[250px]">Testimonial</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((row) => (
          <tr key={row._id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-2">
              <Link href={`${BASE_URL}/${row.image}`} target="_blank">
                <img
                  src={`${BASE_URL}/${row.image}`}
                  alt="insight"
                  className="w-14 h-14 object-cover rounded-md"
                />
              </Link>
            </td>
            <td className="px-4 py-2 font-medium">{row.name}</td>
            <td className="px-4 py-2">{row.designation}</td>

            {/* URL with truncation */}
            <td className="px-4 py-2 max-w-[200px] truncate" title={row.url}>
              {row.url}
            </td>

            {/* Testimonial with truncation */}
            <td className="px-4 py-2 max-w-[250px] truncate" title={row.testimonial}>
              {row.testimonial}
            </td>

            <td className="px-4 py-2">
              <div className="flex justify-center items-center gap-2">
                <span className="cursor-pointer" onClick={() => handleEdit(row)}>
                  <Pencil size={18} />
                </span>
                <span className="cursor-pointer" onClick={() => handleDelete(row._id)}>
                  <Trash2 size={18} />
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default Testimonial;
