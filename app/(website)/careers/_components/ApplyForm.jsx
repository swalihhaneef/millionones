"use client";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import { X, XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { get, post } from "@/helpers/api";
import Swal from "sweetalert2";

const initialState = { country: 101 };

export default function ApplyForm({ item, setApply = () => {}, options }) {
  const [state, setState] = useState([]);
  const handleOpen = () => setOpen(true);

  const [master, setMaster] = useState(initialState);

  const fileInputRef = useRef(null);

  const handleClose = () => {
    setApply(null);
    setMaster(initialState);
  };

  useEffect(() => {
    get(`common/states?country=${master.country}`).then((res) => {
      setState(res.data || []);
    });
  }, [master.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaster((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!master?.email) {
      toast.error("Email is required");
      return;
    } else if (!master?.mobile) {
      toast.error("Mobile is required");
      return;
    }

    const formData = new FormData();
    Object.keys(master).map((item) => {
      formData.append(item, master[item]);
    });

    post(`job-application`, formData)
      .then((res) =>
        Swal.fire({
          title: "Job Applied.",
          text: res?.message || "Job application submitted successfully!",
          icon: "success",
          allowOutsideClick: false,
        }).then((result) => {
          // console.log(result.isConfirmed);
          setMaster(initialState);
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; //
          }
          handleClose();
        })
      )
      .catch((err) => {
        toast.error(err?.message || "Something went wrong");
      });
  };

  return (
    <>
      <Modal
        open={item ? true : false}
        className="overflow-auto 2xl:overflow-hidden fixed inset-0"
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 overflow-auto">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for a Position</h2>

              <span className="cursor-pointer" onClick={handleClose}>
                <XIcon />
              </span>
            </div>

            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  required
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="firstName"
                  value={master?.firstName || ""}
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  required
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="lastName"
                  value={master?.lastName || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email*"
                  required
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="email"
                  value={master?.email || ""}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number*"
                  required
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="mobile"
                  value={master?.mobile || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  required
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="jobId"
                  value={master?.jobId || ""}>
                  <option value="">Applying For*</option>
                  {options.job.map((item) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>
                <input
                  type="number"
                  min="0"
                  placeholder="Years of Experience"
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="yrsOfExp"
                  value={master?.yrsOfExp || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  required
                  value={master.country}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="country">
                  <option value="">Select country*</option>
                  {options.country.map((item) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>

                <select
                  required
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={handleChange}
                  name="state"
                  value={master?.state || ""}>
                  <option value="">Select state*</option>
                  {state.map((item) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>
              </div>

              <textarea
                rows={4}
                placeholder="Remarks (Optional)"
                className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleChange}
                name="remarks"
                value={master?.remarks || ""}
              />

              <div>
                <label className="block text-gray-700 font-medium mb-1">Upload CV*</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-black file:text-white hover:file:bg-gray-800"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setMaster((pre) => ({ ...pre, file: file || null }));
                  }}
                />
              </div>

              <button type="submit" className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
