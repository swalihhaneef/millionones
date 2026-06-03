"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { get, post, put, del } from "@/helpers/api";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { BASE_URL, API_URL } from "@/config";
import { ReactSelect } from "@/components/ui/select";
import SunEditor from "suneditor-react";
import plugins from "suneditor/src/plugins";
import { en } from "suneditor/src/lang";
import { EditorView } from "codemirror";
import katex from "katex";
import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";


const WorkForm = () => {
  const [rows, setRows] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setcategory] = useState([])
  const [selectedType, setSelectedType] = useState(null);

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
    formik.setFieldValue("conclusion", content);
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchData = () => {
    get("works").then((res) => setRows(res.data));
  };

  const fetchCategory = () => {
    get(`common/category?type=works`).then((res) => {
      setcategory(res.data)
    })
  }


  const formik = useFormik({
    initialValues: {
      id: null,
      title: "",
      heading: "",
      details: [{ title: "", desc: "", img: null }],
      conclusion: "",
      img: "",
      client: "",
      service: "",
      category: "",
    },
    onSubmit: (values) => {
      const { id, ...rest } = values;
      // Append details as JSON, and add each file separately
      const action = id ? put : post;
      const url = id ? `/works` : "/works";
      action(url, values)
        .then((res) => {
          toast.success(res.message);
          fetchData();
          formik.resetForm();
          setImagePreview(null);
        })
        .catch((err) => toast.error(err?.response?.data?.message || err.message));
    },
  });

  const handleEdit = (item) => {
    console.log(item);

    formik.setValues({
      id: item._id,
      title: item.title,
      heading: item.heading,
      details: item.details.map((d) => ({ ...d })),
      conclusion: item.conclusion,
      img: item.img,
      client: item.client,
      service: item.service,
      category: item.category,
    });
    setImagePreview(BASE_URL + "/" + item.img);

  };

  console.log(formik.values, "formik values");


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the entry.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        del(`works/${id}`).then((res) => {
          toast.success(res.message);
          fetchData();
        });
      }
    });
  };

  const addDetail = () => {
    formik.setFieldValue("details", [...formik.values.details, { title: "", desc: "", img: null }]);
  };

  const removeDetail = (index) => {
    const newDetails = [...formik.values.details];
    newDetails.splice(index, 1);
    formik.setFieldValue("details", newDetails);
  };
  const handleImageChange = async (e, fieldName, index = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await post("common/image/works", formData);

      // Use image URL from response
      const imageUrl = res.data?.new_filename; // adjust key based on your API

      if (fieldName === "img") {
        formik.setFieldValue("img", imageUrl);
        setImagePreview(BASE_URL + "/" + imageUrl);
      } else if (fieldName === "details" && index !== null) {
        const updatedDetails = [...formik.values.details];
        updatedDetails[index].img = imageUrl;
        formik.setFieldValue("details", updatedDetails);
      }
    } catch (err) {
      toast.error("Image upload failed");
    }
  };



  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-4">Add Work</h4>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <Input name="title" value={formik.values.title} onChange={formik.handleChange} />
        </div>

        <div className="col-span-full">
          <label className="block mb-1 text-sm font-medium">Heading</label>
          <Input name="heading" value={formik.values.heading} onChange={formik.handleChange} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Client</label>
          <Input name="client" value={formik.values.client} onChange={formik.handleChange} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Service</label>
          <Input name="service" value={formik.values.service} onChange={formik.handleChange} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Category </label>
          <ReactSelect
            options={category}
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e);
              formik.setFieldValue("category", e.value);
            }}
          />
          {/* <Input name="category" value={formik.values.category} onChange={formik.handleChange} /> */}
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
              handleImageChange(e, "img")
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
          <label className="block mb-2 text-sm font-medium">Details</label>
          {formik.values.details.map((detail, index) => (
            <div key={index} className="border p-3 rounded-md mb-4 relative">
              <div className="absolute top-2 right-2 cursor-pointer" onClick={() => removeDetail(index)}>
                <Trash2 size={16} />
              </div>

              <label className="block text-sm font-medium">Title</label>
              <Input
                type="text"
                name={`details[${index}].title`}
                value={detail.title}
                onChange={formik.handleChange}
              />

              <label className="block text-sm font-medium mt-2">Description</label>
              <textarea
                name={`details[${index}].desc`}
                value={detail.desc}
                onChange={formik.handleChange}
                className="w-full p-2 border rounded mt-1 text-sm"
              />

              {/* <label className="block text-sm font-medium mt-2">Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e, "details", index)
                }}
              /> */}
              <label className="block text-sm font-medium mt-2">Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e, "details", index);
                }}
              />

              {detail.img && (
                <div className="mt-2 flex items-center gap-4">
                  <img
                    src={`${BASE_URL}/${detail.img}`}
                    alt={`Preview ${index}`}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="text-sm text-gray-600">
                    <span className="block">Current image:</span>
                    <a
                      href={`${BASE_URL}/${detail.img}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {detail.img.split("/").pop()}
                    </a>
                  </div>
                </div>
              )}

            </div>
          ))}

          <button
            type="button"
            onClick={addDetail}
            className="mt-2 text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            + Add Detail
          </button>
        </div>

        {/* <div className="col-span-full">
          <label className="block mb-1 text-sm font-medium">Conclusion</label>
          <textarea
            name="conclusion"
            value={formik.values.conclusion}
            onChange={formik.handleChange}
            className="w-full border p-2 rounded text-sm"
          />
        </div> */}
        <div className="col-span-full">
          <label>Conclusion</label>
          <div>
            <SunEditor
              setDefaultStyle="font-family: Arial; font-size: 14px;min-height:250px;"
              lang="en"
              setOptions={options}
              onChange={(content) => onChangeSuneditor(content)}
              setContents={formik.values.conclusion || null}
              height="100%"
            />
          </div>
        </div>

        <div className="col-span-full mt-4">
          <button
            type="submit"
            className={`px-4 py-1 rounded-md text-white transition ${formik.values.id ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {formik.values.id ? "Update" : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setImagePreview(null);
            }}
            className="ml-3 px-4 py-1 rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Table View */}
      <div className="mt-10">
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row._id}>
                  <td className="px-4 py-2">{row.title}</td>
                  <td className="px-4 py-2">{row.client}</td>
                  <td className="px-4 py-2">{row.service}</td>
                  <td className="px-4 py-2">{row.categoryName}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <span className="cursor-pointer" onClick={() => handleEdit(row)}>
                      <Pencil size={18} />
                    </span>
                    <span className="cursor-pointer" onClick={() => handleDelete(row._id)}>
                      <Trash2 size={18} />
                    </span>
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

export default WorkForm;
