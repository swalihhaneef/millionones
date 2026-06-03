"use client";
import { get } from "@/helpers/api";
import { dateConverter, timeConverter } from "@/helpers/functions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Contact = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    get("contact?limit=500").then((res) => {
      setRows(res?.data || []);
    });
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Remarks</th>
              <th className="px-4 py-2">Service</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 font-medium">{idx + 1}</td>
                <td className="px-4 py-2">
                  <p className="font-medium">{dateConverter(row?.date)}</p>
                  <p className="font-normal">{timeConverter(row?.time)}</p>
                </td>
                <td className="px-4 py-2">{`${row?.firstName || ""} ${row?.lastName || ""}`}</td>
                <td className="px-4 py-2">
                  <Link href={`tel:${row?.mobile.startsWith("+") ? row?.mobile : `+${row?.mobile}`}`}>{row?.mobile}</Link>
                </td>
                <td className="px-4 py-2">
                  <a href={`mailto:${row?.email}`}>{row?.email}</a>
                </td>
                <td className="px-4 py-2 max-w-48 text-wrap">{row?.remarks || "---"}</td>
                <td className="px-4 py-2 max-w-48 text-wrap">{row?.additional?.service || "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
