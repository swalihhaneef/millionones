"use client";
import React, { useState, useEffect } from "react";
import { useFormik, getIn } from "formik";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { del, get, post, put } from "@/helpers/api";
import { BASE_URL } from "@/config";
import toast from "react-hot-toast";
import { ReactSelect } from "@/components/ui/select";
import { Trash2, Pencil } from "lucide-react";
import Swal from "sweetalert2";




export default function FixedSeoForm() {
  const [previews, setPreviews] = useState([]);
  const [category, setcategory] = useState([])
  const [selectedType, setSelectedType] = useState(null);
  const [servicesData, setservicesData] = useState([])


  const fetchCategory = () => {
    get(`common/category?type=service`).then((res) => {
      setcategory(res.data)
    })
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     slug: "",
  //     sec1: { title: "", content: "" },
  //     sec2: [{ img: "", title: "", content: "" }],
  //     sec3: { title: "", content: "" },
  //     sec4: { title: "", contents: [{ title: "", content: "" }] },
  //     sec5: { title: "", content: [{ title: "", content: "" }] },
  //     sec6: { title: "", content: "" },
  //     faq: [{ question: "", answer: "" }],
  //   },
  //   onSubmit: (values) => {
  //     console.log("Form submitted:", values);
  //     const { id, ...rest } = values;
  //     const action = id ? put : post;
  //     const url = id ? `/service` : "/service";
  //     action(url, values)
  //       .then((res) => {
  //         toast.success(res.message);
  //         formik.resetForm()
  //         getAllservice()

  //       })
  //       .catch((err) => {
  //         toast.error(err.response.data.message)
  //       })


  //   },
  // });


  const formik = useFormik({
  initialValues: {
    id: "", // ✅ Add id here (optional, helps clarity)
    name: "",
    slug: "",
    sec1: { title: "", content: "" },
    sec2: [{ img: "", title: "", content: "" }],
    sec3: { title: "", content: "" },
    sec4: { title: "", contents: [{ title: "", content: "" }] },
    sec5: { title: "", content: [{ title: "", content: "" }] },
    sec6: { title: "", content: "" },
    faq: [{ question: "", answer: "" }],
  },

  onSubmit: (values) => {
    console.log("Form submitted:", values);

    const { id } = values;
    const action = id ? put : post;
    const url = id ? `/service` : "/service"; // ✅ Fix URL to include id when editing

    action(url, values)
      .then((res) => {
        toast.success(res.message);
        formik.resetForm();
        setSelectedType(null); // ✅ Reset category dropdown after submit
        getAllservice();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  },
});

  const handleArrayChange = (path, index, field, value) => {
    const updated = [...getIn(formik.values, path)];
    updated[index][field] = value;
    formik.setFieldValue(path, updated);
  };



  const addArrayItem = (path, itemTemplate) => {
    const current = [...getIn(formik.values, path)];
    formik.setFieldValue(path, [...current, itemTemplate]);
  };

  const removeArrayItem = (path, index) => {
    const updated = [...getIn(formik.values, path)];
    updated.splice(index, 1);
    formik.setFieldValue(path, updated);
  };

  const handleImageChange = async (e, sec, index) => {
    console.log(e, "e");
    console.log(sec, "sec");
    console.log(index, "index");
    const file = e.target.files?.[0];
    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await post("common/image/service", formData)
      const imageUrl = res?.data?.new_filename;
      const clone = [...formik.values[sec]];
      clone[index]["img"] = imageUrl
      formik.setFieldValue("sec2", clone);

    } catch (err) {

    }

  }

  function getAllservice() {
    get(`service`).then((res) => {
      console.log(res, "get service");
      setservicesData(res.data)
    }).catch((err) => {

    })
  }

  useEffect(() => {
    getAllservice()
  }, [])


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
        del(`service/${id}`).then((res) => {
          toast.success(res.message);
          getAllservice();
        });
      }
    });
  };

const handleEdit = (item) => {
  console.log("Editing item:", item);

  formik.setValues({
    id: item._id,
    name: item.name || "",
    slug: item.slug || "",
    category: item.category || "",
    sec1: {
      title: item.sec1?.title || "",
      content: item.sec1?.content || "",
    },
    sec2:
      item.sec2?.length > 0
        ? item.sec2.map((card) => ({
            img: card.img || card.image || "",
            title: card.title || "",
            content: card.content || "",
          }))
        : item.section2?.length > 0
        ? item.section2.map((card) => ({
            img: card.img || card.image || "",
            title: card.title || "",
            content: card.content || "",
          }))
        : [{ img: "", title: "", content: "" }],
    sec3: {
      title: item.sec3?.title || "",
      content: item.sec3?.content || "",
    },
    sec4: {
      title: item.sec4?.title || "",
      contents:
        item.sec4?.contents?.length > 0
          ? item.sec4.contents.map((c) => ({
              title: c.title || "",
              content: c.content || "",
            }))
          : [{ title: "", content: "" }],
    },
    sec5: {
      title: item.sec5?.title || "",
      content:
        item.sec5?.content?.length > 0
          ? item.sec5.content.map((c) => ({
              title: c.title || "",
              content: c.content || "",
            }))
          : [{ title: "", content: "" }],
    },
    sec6: {
      title: item.sec6?.title || "",
      content: item.sec6?.content || "",
    },
    faq:
      item.faq?.length > 0
        ? item.faq.map((f) => ({
            question: f.question || "",
            answer: f.answer || "",
          }))
        : [{ question: "", answer: "" }],
  });

  const selectedCat = category.find((opt) => opt.value === item.category);
  setSelectedType(selectedCat || null);

  toast.success("Loaded data for editing");
};




  return (
    <>
      <form onSubmit={formik.handleSubmit} className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Name & Slug */}
        <div className="grid grid-cols-2 gap-4">
          <Input name="name" placeholder="Name" onChange={formik.handleChange} value={formik.values.name} />
          <Input name="slug" placeholder="Slug" onChange={formik.handleChange} value={formik.values.slug} />
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
        </div>

        {/* Section 1 */}
        <div>
          <h2 className="font-bold text-lg mb-2">Section 1</h2>
          <Input name="sec1.title" placeholder="Title" onChange={formik.handleChange} value={formik.values.sec1.title} />
          <Textarea className="mt-4" name="sec1.content" placeholder="Content" onChange={formik.handleChange} value={formik.values.sec1.content} />
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="font-bold text-lg mb-2">Section 2 (Array of Cards)</h2>
          {formik.values.sec2.map((item, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <Input type="file" placeholder="Image URL"
                //  onChange={(e) => handleArrayChange("sec2", index, "img", e.target.value)}
                onChange={(e) => {
                  handleImageChange(e, "sec2", index);
                }}
              />
              {item?.img ? (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Preview</label>
                    <img src={`${BASE_URL}/${item.img}`} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                  </div>
                </>
              ) : null}

              <Input className="mt-4" placeholder="Title" value={item.title} onChange={(e) => handleArrayChange("sec2", index, "title", e.target.value)} />
              <Textarea className="mt-4" placeholder="Content" value={item.content} onChange={(e) => handleArrayChange("sec2", index, "content", e.target.value)} />
              <Button type="button" onClick={() => removeArrayItem("sec2", index)} variant="destructive" className="mt-2">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("sec2", { img: "", title: "", content: "" })}>+ Add Card</Button>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="font-bold text-lg mb-2">Section 3</h2>
          <Input name="sec3.title" placeholder="Title" onChange={formik.handleChange} value={formik.values.sec3.title} />
          <Textarea className="mt-4" name="sec3.content" placeholder="Content" onChange={formik.handleChange} value={formik.values.sec3.content} />
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="font-bold text-lg mb-2">Section 4 (Multiple Items)</h2>
          <Input className="mb-4" name="sec4.title" placeholder="Main Title" onChange={formik.handleChange} value={formik.values.sec4.title} />
          {formik.values.sec4.contents.map((item, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <Input placeholder="Title" value={item.title} onChange={(e) => handleArrayChange("sec4.contents", index, "title", e.target.value)} />
              <Textarea className="mt-4" placeholder="Content" value={item.content} onChange={(e) => handleArrayChange("sec4.contents", index, "content", e.target.value)} />
              <Button type="button" onClick={() => removeArrayItem("sec4.contents", index)} variant="destructive" className="mt-2">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("sec4.contents", { title: "", content: "" })}>+ Add Item</Button>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="font-bold text-lg mb-2">Section 5</h2>
          <Input className="mb-2" name="sec5.title" placeholder="Main Title" onChange={formik.handleChange} value={formik.values.sec5.title} />
          {formik.values.sec5.content.map((item, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <Input placeholder="Title" value={item.title} onChange={(e) => handleArrayChange("sec5.content", index, "title", e.target.value)} />
              <Textarea className="mt-4" placeholder="Content" value={item.content} onChange={(e) => handleArrayChange("sec5.content", index, "content", e.target.value)} />
              <Button type="button" onClick={() => removeArrayItem("sec5.content", index)} variant="destructive" className="mt-2">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("sec5.content", { title: "", content: "" })}>+ Add Item</Button>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="font-bold text-lg mb-2">Section 6</h2>
          <Input name="sec6.title" placeholder="Title" onChange={formik.handleChange} value={formik.values.sec6.title} />
          <Textarea className="mt-4" name="sec6.content" placeholder="Content" onChange={formik.handleChange} value={formik.values.sec6.content} />
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-bold text-lg mb-2">FAQ</h2>
          {formik.values.faq.map((item, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <Input placeholder="Question" value={item.question} onChange={(e) => handleArrayChange("faq", index, "question", e.target.value)} />
              <Textarea className="mt-4" placeholder="Answer" value={item.answer} onChange={(e) => handleArrayChange("faq", index, "answer", e.target.value)} />
              <Button type="button" onClick={() => removeArrayItem("faq", index)} variant="destructive" className="mt-2">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("faq", { question: "", answer: "" })}>+ Add FAQ</Button>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-[100PX] bg-green-600 text-white mt-4 hover:bg-green-700">
          Submit
        </Button>
      </form>


      <div className="mt-10">
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Slug</th>
                {/* <th className="px-4 py-2">Service</th> */}
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {servicesData?.map((row) => (
                <tr key={row._id}>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.slug}</td>
                  {/* <td className="px-4 py-2">{row.category}</td> */}
                  <td className="px-4 py-2">{category.find(opt => opt?.value === row?.category).label}</td>

                  {/* <td className="px-4 py-2">{row.categoryName}</td> */}
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
    </>

  );
}
