"use client";
import { Input, Textarea } from "@/components/ui/input";
import { ReactSelect } from "@/components/ui/select";
import { del, get, post, put } from "@/helpers/api";
import { dateConverter, timeConverter } from "@/helpers/functions";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Swal from "sweetalert2";

const Careers = () => {
  const [selectedJobType, setSelectedJobType] = useState(null);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    get("job-post").then((res) => {
      setRows(res.data);
    });
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      title: "",
      desc: "",
      department: "",
      location: "",
      jobType: "",
      requirements: [""],
    },
    onSubmit: (values) => {
      if (formik.values.id) {
        put("job-post", values)
          .then((res) => {
            fetchData();
            toast.success(res.message);
            handleReset();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || err?.message);
          });
      } else {
        post("job-post", values)
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

  function handleReset() {
    formik.resetForm();
    setSelectedJobType(null);
  }

  const addRequirement = () => {
    formik.setFieldValue("requirements", [...formik.values.requirements, ""]);
  };

  const removeRequirement = (index) => {
    const updated = [...formik.values.requirements];
    updated.splice(index, 1);
    formik.setFieldValue("requirements", updated);
  };

  const handleRequirementChange = (e, index) => {
    const updated = [...formik.values.requirements];
    updated[index] = e.target.value;
    formik.setFieldValue("requirements", updated);
  };

  const handleEdit = (data) => {
    formik.setFieldValue("id", data._id);
    formik.setFieldValue("title", data.title);
    formik.setFieldValue("desc", data.desc);
    formik.setFieldValue("department", data.department);
    formik.setFieldValue("location", data.location);
    formik.setFieldValue("jobType", data.jobType);
    formik.setFieldValue("requirements", data.requirements || [""]);
    setSelectedJobType({ label: data.jobType, value: data.jobType });

    toTop();
  };

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
        del(`job-post/${id}`)
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
    <>
      <div className="p-4">
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <Input
              name="title"
              type="text"
              placeholder="Enter title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <Textarea
              name="desc"
              type="textarea"
              placeholder="Enter description"
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Department</label>
            <Input
              name="department"
              type="text"
              placeholder="Enter department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Location</label>
            <Input
              name="location"
              type="text"
              placeholder="Enter location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Job Type</label>
            <ReactSelect
              options={[
                { label: "Full-time", value: "Full-time" },
                { label: "Part-time", value: "Part-time" },
                { label: "Contract", value: "Contract" },
              ]}
              value={selectedJobType}
              onChange={(e) => {
                setSelectedJobType(e);
                formik.setFieldValue("jobType", e.value);
              }}
            />
          </div>

          {formik.values.requirements.map((item, index) => (
            <div key={`req-${index}`} className="mb-4">
              <label className="block mb-1 text-sm font-medium">Requirement {index + 1}</label>
              {/* <input
              type="text"
              name={`requirements[${index}]`}
              placeholder="Enter requirement"
              value={formik.values.requirements[index]}
              onChange={(e) => handleRequirementChange(e, index)}
              onBlur={formik.handleBlur}
              className="border p-2 w-full"
            /> */}

              <Textarea
                name={`requirements[${index}]`}
                type="text"
                placeholder="Enter requirement"
                value={formik.values.requirements[index]}
                onChange={(e) => handleRequirementChange(e, index)}
                onBlur={formik.handleBlur}
              />

              <div className="flex justify-between mt-1">
                <button type="button" onClick={addRequirement} className="text-xs flex gap-1 items-center">
                  Add more <Plus size={12} />
                </button>
                {formik.values.requirements.length > 1 && (
                  <button type="button" onClick={() => removeRequirement(index)} className="text-xs text-red-500">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="col-span-full">
            <button
              type="submit"
              className={`px-4 py-1 rounded-md text-white transition ${
                formik.values.id ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
              }`}>
              {formik.values.id ? "Update" : "Submit"}
            </button>

            <button
              onClick={handleReset}
              type="button"
              className={`ml-3 px-4 py-1 rounded-md text-white transition ${"bg-red-600 hover:bg-red-700"}`}>
              Reset
            </button>
          </div>
        </form>

        <div className="mt-10">
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Job Type</th>
                  <th className="px-4 py-2">Requirement</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((row, idx) => (
                  <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 font-medium">{idx + 1}</td>
                    <td className="px-4 py-2">{row?.title}</td>
                    <td className="px-4 py-2 max-w-56 text-wrap">{row?.desc}</td>
                    <td className="px-4 py-2">{row?.department}</td>
                    <td className="px-4 py-2">{row?.location}</td>
                    <td className="px-4 py-2">{row?.jobType}</td>
                    <td className="px-4 py-2 max-w-56 text-wrap">
                      <ul className="list-disc ">
                        {row?.requirements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
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
      <Modal
        autoFocus={false}
        open={false}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-none focus:border-none focus:outline-none">
        <div className="p-2 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[500px] border-none">
          <h1>hello</h1>
        </div>
      </Modal>
    </>
  );
};

export default Careers;
