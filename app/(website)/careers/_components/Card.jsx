"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, Globe, Heart, Coffee, Laptop, Zap, Target, Star } from "lucide-react";
import ApplyForm from "./ApplyForm";
import { get } from "@/helpers/api";
import { Toaster } from "react-hot-toast";

const Card = ({ jobs }) => {
  const [activeJob, setActiveJob] = useState(null);

  const [apply, setApply] = useState(null);

  const [job, setJob] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);

  useEffect(() => {
    get("job-post/options").then((res) => {
      setJob(res.data || []);
    });
    get("common/countries").then((res) => {
      setCountry(res.data || []);
    });
  }, []);

  return (
    <>
      {jobs.map((job, index) => {
        return (
          <div
            key={job._id}
            className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-all cursor-pointer"
            onClick={() => setActiveJob(index)}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold mb-3">{job.title}</h3>
                <div className="flex gap-4 text-gray-400">
                  <span>{job.department}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.jobType}</span>
                </div>
              </div>
              <ChevronRight size={24} className={`transform transition-transform text-gray-400 ${activeJob === index ? "rotate-90" : ""}`} />
            </div>
            {activeJob === index && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-300 mb-6 text-lg">{job.desc}</p>
                <h4 className="font-semibold mb-4 text-xl">Requirements:</h4>
                <ul className="list-none space-y-3 text-gray-300">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Star size={16} className="text-gray-500 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setApply(job)}
                  className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all text-lg z-40">
                  Apply Now
                </button>
              </div>
            )}
          </div>
        );
      })}

      {apply && <ApplyForm item={apply} setApply={setApply} options={{ job, country, state }} />}

      <Toaster position="top-right" />
    </>
  );
};

export default Card;
