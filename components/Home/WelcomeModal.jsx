"use client";
import React, { useEffect, useState } from "react";
import { Modal, Fade, Backdrop } from "@mui/material";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { post } from "@/helpers/api";
import Swal from "sweetalert2";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [master, setMaster] = useState({});

  useEffect(() => {
    const isSubmitted = document.cookie.split("; ").find((row) => row.startsWith("formSubmitted="));

    if (!isSubmitted) {
      setTimeout(() => {
        handleOpen();
      }, 10000);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaster((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`contact`, master)
      .then((res) => {
        // toast.success(res.message);

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `formSubmitted=true; expires=${expires}; path=/`;

        return Swal.fire({
          title: "Message Sent Successfully!",
          text: res?.message || "Thank you for contacting us!",
          icon: "success",
          allowOutsideClick: false,
        }).then((result) => {
          handleClose();
          setMaster({});
        });
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        toast.error(err.response?.data?.message || "Something went wrong");
      });
    console.log("Form submitted with data:", master);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableAutoFocus
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <div tabIndex={-1} className="modal-box launch-modal rounded-2xl overflow-hidden focus:outline-none">
          <button className="close-btn" onClick={handleClose}>
            <X className="w-5 sm:w-6" />
          </button>
          <div className="flex" style={{ height: "-webkit-fill-available" }}>
            <div className="w-1/2 hidden md:flex">
              <img
                className="insect-image"
                src="/images/artisan_54301_Create_a_clean_white_and_metallic_silver-themed_b_d836ddb3-72f6-43d9-8dea-f3a789ae1766 (1).png"
                alt=""
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="logo py-4">
                  <img className="logo-img" src="/images/new-logo.svg" alt="" />
                </div>
                {/* <div className="py-4 pb-3 hidden sm:flex">
                  <p className="text-sm ">
                    Millionones empowered brands through cutting-edge AI,bold marketing,strategy design, and smart development to help them thrive
                    creatively in the digital era
                  </p>
                </div> */}
                <div className="pt-2 sm:pt-4">
                  {/* <h4 className="text-base sm:text-lg pb-4">Ready to thrive creatively? Let's Talk</h4> */}
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form">
                      <input
                        type="text"
                        className="outline-gray-400 border-none rounded-md"
                        placeholder="First Name*"
                        name="firstName"
                        onChange={handleChange}
                        value={master.firstName || ""}
                      />
                      <input
                        type="text"
                        className="outline-gray-400 border-none rounded-md"
                        placeholder="Last Name*"
                        name="lastName"
                        onChange={handleChange}
                        value={master.lastName || ""}
                      />
                      <input
                        type="text"
                        className="outline-gray-400 border-none rounded-md"
                        placeholder="Email*"
                        name="email"
                        onChange={handleChange}
                        value={master.email || ""}
                      />
                      <input
                        type="text"
                        className="outline-gray-400 border-none rounded-md"
                        placeholder="Contact Number*"
                        name="mobile"
                        onChange={handleChange}
                        value={master.mobile || ""}
                      />
                      <textarea
                        name="remarks"
                        rows={5}
                        className="outline-gray-400 border-none rounded-md"
                        placeholder="Message*"
                        value={master.remarks || ""}
                        onChange={handleChange}></textarea>
                    </div>
                    <div className="mt-4 w-full flex">
                      <button type="submit" className="w-full rounded-lg">
                        Send
                      </button>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-base">Let's Connect and Build Something Great Together</h4>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Toaster position="top-right" />
    </>
  );
}
