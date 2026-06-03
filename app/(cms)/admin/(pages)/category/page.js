"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";

import { del, get, post, put } from "@/helpers/api";
import { ReactSelect } from "@/components/ui/select";
import Link from "next/link";
import { toTop } from "@/helpers/functions";
import { Pencil, Trash2, TrashIcon } from "lucide-react";

import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config";
import Swal from "sweetalert2";

const Blogs = () => {
  const [selectedType, setSelectedType] = useState(null);

  const [rows, setRows] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);

  const [imagePreviews, setImagePreviews] = useState([null, null, null]);

  const formik = useFormik({
    initialValues: {
      id: null,
      name: "",
      desc: "",
      type: "",
      order: null,
      image: null,
      brands: [null, null, null],
    },
    onSubmit: (values) => {
      const formData = new FormData();

      Object.keys(values).map((item) => {
        formData.append(item, values[item]);
      });

      if (formik.values.id) {
        put("category", formData)
          .then((res) => {
            fetchData();
            toast.success(res.message);
            handleReset();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || err?.message);
          });
      } else {
        post("category", formData)
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
    fetchData();
  }, []);

  const fetchData = () => {
    get("category").then((res) => {
      setRows(res.data);
    });
  };

  const handleEdit = (category) => {
    formik.setFieldValue("id", category._id);
    formik.setFieldValue("name", category.name);
    formik.setFieldValue("desc", category.desc);
    formik.setFieldValue("type", category.type);
    formik.setFieldValue("order", category.order);
    formik.setFieldValue("image", category.image);
    formik.setFieldValue(
      "brands",
      Array.from({ length: 3 }, (_, i) => category.brands[i] || null)
    );
    setImagePreview(BASE_URL + category.image);
    setSelectedType(category.type.map((item) => ({ label: item, value: item })));
    setImagePreviews(category.brands.map((brand) => BASE_URL + "/" + brand));
    toTop();
  };

  function handleReset() {
    formik.resetForm();
    setSelectedType(null);
    setImagePreview(null);
    setImagePreviews([null, null, null]);
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
        del(`category/${id}`)
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

  const handleUploadImage = (file, index) => {
    const formData = new FormData();
    formData.append("image", file);
    post("common/image/category_brands", formData)
      .then((res) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = BASE_URL + "/" + res?.data?.new_filename;
        setImagePreviews(newPreviews);

        const newImages = [...formik.values.brands];
        newImages[index] = res?.data?.new_filename;
        formik.setFieldValue("brands", newImages);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || err?.message);
      });
  };

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
          <label className="block mb-1 text-sm font-medium">Description</label>
          <Input
            name="desc"
            type="text"
            placeholder="Enter description"
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Type</label>
          <ReactSelect
            isMulti
            isClearable={false}
            options={[
              { label: "works", value: "works" },
              { label: "service", value: "service" },
            ]}
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e);
              formik.setFieldValue(
                "type",
                e.map((item) => item.value)
              );
            }}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">View Order</label>
          <Input
            name="order"
            type="number"
            placeholder="Enter Order"
            value={formik.values.order}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          {imagePreview ? (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />

              <button
                onClick={() => {
                  setImagePreview(null);
                  formik.setFieldValue("image", null);
                }}
                className="text-center w-24 bg-gray-300 hover:bg-gray-400 rounded-ee-lg rounded-es-lg ">
                <div className="p-1 flex justify-center">
                  <TrashIcon size={20} />
                </div>
              </button>
            </div>
          ) : (
            <>
              <label className="block mb-1 text-sm font-medium">Image</label>
              <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  formik.setFieldValue("image", file || null);
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </>
          )}
        </div>

        {formik.values.brands.map((_, index) => (
          <div key={index}>
            {imagePreviews[index] ? (
              <div className="mt-2">
                <img src={imagePreviews[index]} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                <button
                  onClick={() => {
                    const newPreviews = [...imagePreviews];
                    newPreviews[index] = null;
                    setImagePreviews(newPreviews);

                    const newImages = [...formik.values.brands];
                    newImages[index] = null;
                    formik.setFieldValue("brands", newImages);
                  }}
                  className="text-center w-24 bg-gray-300 hover:bg-gray-400 rounded-ee-lg rounded-es-lg">
                  <div className="p-1 flex justify-center">
                    <TrashIcon size={20} />
                  </div>
                </button>
              </div>
            ) : (
              <>
                <label className="block mb-1 text-sm font-medium">Brand Image {index + 1}</label>
                <Input
                  name={`images.${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];

                    if (file) handleUploadImage(file, index);
                    // if (file) {
                    //   const newPreviews = [...imagePreviews];
                    //   newPreviews[index] = URL.createObjectURL(file);
                    //   setImagePreviews(newPreviews);

                    //   const newImages = [...formik.values.images];
                    //   newImages[index] = file;
                    //   formik.setFieldValue("images", newImages);
                    // }
                  }}
                />
              </>
            )}
          </div>
        ))}

        <div className="col-span-full mt-3">
          <button
            type="submit"
            className={`px-4 py-1 rounded-md text-white transition ${
              formik.values.id ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {formik.values.id ? "Update" : "Submit"}
          </button>

          <button onClick={handleReset} type="button" className={`ml-3 px-4 py-1 rounded-md text-white transition ${"bg-red-600 hover:bg-red-700"}`}>
            Reset
          </button>
        </div>
      </form>

      <div className="mt-10">
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Desc</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">
                    <Link href={`${BASE_URL}${row?.image || ""}`} target="_blank">
                      <img src={`${BASE_URL}${row.image}`} alt="insight" className="w-14 h-14 object-cover rounded-md" />
                    </Link>
                  </td>
                  <td className="px-4 py-2 font-medium">{row.name}</td>
                  <td className="px-4 py-2">{row?.type.join(",")}</td>
                  <td className="px-4 py-2 2 max-w-56 text-wrap line-clamp-6">{row.desc}</td>
                  <td>
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

export default Blogs;
