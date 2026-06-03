"use client";
import { post } from "@/helpers/api";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const ContactForm = () => {
  const services = ["AI Solutions", "Digital Marketing", "Market Identity", "Design", "Code & Craft"];

  const [master, setMaster] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaster((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`contact`, master)
      .then((res) => {
        Swal.fire({
          title: "Message Sent Successfully!",
          text: res?.message || "Thank you for contacting us!",
          icon: "success",
          allowOutsideClick: false,
        }).then((result) => {
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
      <form name="wf-form-Inquiry-form" onSubmit={handleSubmit} data-name="Inquiry-form" method="post" className="form-main">
        <div className="form-wrap">
          <div className="form-group">
            <div className="form-group-head text-18">Tell us about your details*</div>
            <div className="form-inner">
              <div className="form-two">
                <input
                  className="form-input outline-none"
                  maxLength="256"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={master.firstName || ""}
                  required=""
                />
                <input
                  className="form-input outline-none"
                  maxLength="256"
                  placeholder="Last Name"
                  type="text"
                  id="Last-Name"
                  name="lastName"
                  onChange={handleChange}
                  value={master.lastName || ""}
                  required=""
                />
              </div>
              <input
                className="form-input outline-none"
                maxLength="256"
                placeholder="Email"
                type="email"
                id="Email"
                name="email"
                onChange={handleChange}
                value={master.email || ""}
                required=""
              />
              <input
                className="form-input outline-none"
                maxLength="256"
                placeholder="Mobile number"
                type="text"
                name="mobile"
                onChange={handleChange}
                value={master.mobile || ""}
                required=""
              />
              <input
                className="form-input outline-none"
                maxLength="256"
                placeholder="Service you need"
                type="text"
                name="remarks"
                onChange={handleChange}
                value={master.remarks || ""}
                required=""
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-head text-18">How we can help you?*</div>
            <div className="form-inner is-option">
              {services.map((item, index) => {
                return (
                  <label
                    key={index}
                    className={`w-checkbox option-wrap ${master?.additional?.service == item ? "active" : ""} cursor-pointer`}
                    onClick={() => setMaster((prev) => ({ ...prev, additional: { service: item } }))}>
                    <input type="checkbox" name={item} id={item} data-name={item} style={{ opacity: 0, position: "absolute", zIndex: -1 }} />
                    <span className="option-text text-16 w-form-label" for={item}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <button type="submit" className="btn">
          <div className="btn-text-wrap">
            <div className="btn-text text-18">Submit Inquiry</div>
          </div>
          <div className="btn-icon-wrapper is-58">
            <div className="btn-icon-block">
              <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/67494655115913dcaef11a1f/67494d56a000598d086a4010_Icon%20Hatypo.svg"
                alt=""
                className="btn-icon is-26"
              />
            </div>
          </div>
        </button>
      </form>
      <Toaster position="top-right" />
    </>
  );
};

export default ContactForm;
