"use client";
import { BASE_URL } from "@/config";
import { get } from "@/helpers/api";
import { dateConverter, timeConverter } from "@/helpers/functions";
import { FileText } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const JobApplications = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    get("job-application?limit=500").then((res) => {
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
              <th className="px-4 py-2">Job Id</th>
              <th className="px-4 py-2">Job</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Remarks</th>
              <th className="px-4 py-2">Resume</th>
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
                <td className="px-4 py-2 max-w-48 text-wrap">{row?.job?.jobId}</td>
                <td className="px-4 py-2 max-w-48 text-wrap">{row?.job?.title}</td>
                <td className="px-4 py-2">{row?.name}</td>
                <td className="px-4 py-2">
                  <Link href={`tel:${row?.mobile.startsWith("+") ? row?.mobile : `+${row?.mobile}`}`}>{row?.mobile}</Link>
                </td>
                <td className="px-4 py-2">
                  <a href={`mailto:${row?.email}`}>{row?.email}</a>
                </td>
                <td className="px-4 py-2 max-w-48 text-wrap">{row?.country}</td>
                <td className="px-4 py-2 max-w-48 text-wrap">{row?.state}</td>
                <td className="px-4 py-2 max-w-48 text-wrap">{row?.remarks || "---"}</td>
                <td className="px-4 py-2 max-w-48 text-wrap">
                  {row?.resume ? (
                    <Link target="_blank" href={`${BASE_URL}${row?.resume}`}>
                      <FileText size={16} />
                    </Link>
                  ) : (
                    "---"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplications;
