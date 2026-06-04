"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { get } from "@/helpers/api";
import { BASE_URL } from "@/config";

const routes = {
  blog: "/blogs",
  event: "/events",
  news: "/news",
};

const InsightSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await get("insight/latest/all");
      if (response && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  return (
    <div className="">
      <div className="news-insights-grid">
        <div className="top-left-section w-full">
          <div>
            <Link href="/insights" title="Millionones Insights">
              <h2>Insights</h2>

              <div className="flex gap-2 justify-center items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.24 7.35" width="10" stroke="currentColor">
                  <line y1="3.68" x2="6.5" y2="3.68" fill="none" strokeMiterlimit="10"></line>
                  <polyline points="3.21 0.35 6.54 3.68 3.21 7" fill="none" strokeMiterlimit="10"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        </div>

        <div className="bottom-left-section">
          <Link href={`${routes[data[0]?.type]}/${data[0]?.permalink}`}>
            <img className="w-full max-h-[305px]" src={`${BASE_URL}${data[0]?.image}`} alt={data[0]?.title} />
            <p className="line-clamp-2">{data[0]?.desc}</p>
          </Link>
        </div>

        <div className="middle-section">
          <Link href={`${routes[data[1]?.type]}/${data[1]?.permalink}`}>
            <img className=" max-h-[611px] w-full" src={`${BASE_URL}${data[1]?.image}`} alt={data[1]?.title} />
            <p className="line-clamp-2">{data[1]?.desc}</p>
          </Link>
        </div>

        <div className="right-section">
          <Link href={`${routes[data[2]?.type]}/${data[2]?.permalink}`}>
            <img className=" max-h-[611px] w-full" src={`${BASE_URL}${data[2]?.image}`} alt={data[2]?.title} />

            <p className="line-clamp-2">{data[2]?.desc}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InsightSection;
