"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";

import { del, get, post, put } from "@/helpers/api";
import { ReactSelect } from "@/components/ui/select";
import Link from "next/link";
import { dateConverter, timeConverter, toTop } from "@/helpers/functions";
import { Pencil, Trash2, TrashIcon } from "lucide-react";

import SunEditor from "suneditor-react";
import plugins from "suneditor/src/plugins";
import { en } from "suneditor/src/lang";
import { EditorView } from "codemirror";
import katex from "katex";
import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config";
import Swal from "sweetalert2";

const Blogs = () => {
  const [selectedType, setSelectedType] = useState(null);

  const [rows, setRows] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      id: null,
      readMin: "",
      writer: "",
      name: "",
      desc: "",
      type: "",
      content: "",
      image: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();

      Object.keys(values).map((item) => {
        formData.append(item, values[item]);
      });

      if (formik.values.id) {
        put("insight", formData)
          .then((res) => {
            fetchData();
            toast.success(res.message);
            handleReset();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || err?.message);
          });
      } else {
        post("insight", formData)
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
    get("insight").then((res) => {
      setRows(res.data);
    });
  };

  const handleEdit = (blog) => {
    formik.setFieldValue("id", blog._id);
    formik.setFieldValue("readMin", blog.readMin);
    formik.setFieldValue("writer", blog.writer);
    formik.setFieldValue("name", blog.name);
    formik.setFieldValue("desc", blog.desc);
    formik.setFieldValue("content", blog.content);
    formik.setFieldValue("type", blog.type);
    formik.setFieldValue("image", blog.image);
    setImagePreview(BASE_URL + blog.image);
    setSelectedType({ label: blog.type, value: blog.type });
    toTop();
  };

  const options = {
    plugins: plugins,
    height: 250,
    EditorView: {
      src: EditorView,
      options: {
        indentWithTabs: true,
        tabSize: 2,
      },
    },
    katex: katex,
    lang: en,
    buttonList: [
      [
        "font",
        "fontSize",
        "formatBlock",
        "bold",
        "underline",
        "italic",
        "paragraphStyle",
        "blockquote",
        "strike",
        "subscript",
        "superscript",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "undo",
        "redo",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "lineHeight",
        "table",
        "link",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
      ],
    ],
  };

  function onChangeSuneditor(content) {
    formik.setFieldValue("content", content);
  }

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
        del(`insight/${id}`)
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
          <label className="block mb-1 text-sm font-medium">Writer</label>
          <Input
            name="writer"
            type="text"
            placeholder="Enter writer name"
            value={formik.values.writer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Type</label>
          <ReactSelect
            options={[
              { label: "Blog", value: "blog" },
              { label: "News", value: "news" },
              { label: "Event", value: "event" },
            ]}
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e);
              formik.setFieldValue("type", e.value);
            }}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Read Min</label>
          <Input
            name="readMin"
            type="number"
            placeholder="10"
            value={formik.values.readMin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* <div>
          <label className="block mb-1 text-sm font-medium">Image</label>
          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("photo", event.currentTarget.files?.[0] || null);
            }}
          />
        </div> */}

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

        <div className="col-span-full">
          <div>
            <SunEditor
              setDefaultStyle="font-family: Arial; font-size: 14px;min-height:250px;"
              lang="en"
              setOptions={options}
              onChange={(content) => onChangeSuneditor(content)}
              setContents={formik.values.content || null}
              height="100%"
            />
          </div>
        </div>

        <div className="col-span-full">
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
                <th className="px-4 py-2">Written By</th>
                <th className="px-4 py-2">Read Min</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">
                    <Link href={`${BASE_URL}${row.image}`} target="_blank">
                      {" "}
                      <img src={`${BASE_URL}${row.image}`} alt="insight" className="w-14 h-14 object-cover rounded-md" />
                    </Link>
                    {/* <img src={blog.image.replace(/\\/g, "/")} alt="blog" className="w-14 h-14 object-cover rounded-md" /> */}
                  </td>
                  <td className="px-4 py-2 font-medium">{row.name}</td>
                  <td className="px-4 py-2">{row?.type}</td>
                  <td className="px-4 py-2">{row.writer}</td>
                  <td className="px-4 py-2">{row.readMin} min</td>
                  <td className="px-4 py-2">{dateConverter(row.date)}</td>
                  <td className="px-4 py-2">{timeConverter(row.time)}</td>
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
