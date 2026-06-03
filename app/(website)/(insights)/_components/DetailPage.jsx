import Footer from "@/components/Footer";
import { API_URL, BASE_URL } from "@/config";
import React from "react";
import { notFound } from "next/navigation";
import BlogCard from "@/components/Blog/Card";

const getDetails = async (slug) => {
  try {
    const response = await fetch(`${API_URL}insight/details/${slug}`).then((res) => res.json());
    return response?.data || {};
  } catch (error) {
    console.log("Error fetching insight details:", error.message);
    return {};
  }
};

const getLatestDetails = async ({ type, slug }) => {
  try {
    const response = await fetch(`${API_URL}insight/latest/${type}?slug=${slug}`).then((res) => res.json());
    return response?.data || [];
  } catch (error) {
    console.log("Error fetching insight latest:", error.message);
    return [];
  }
};

const DetailPage = async (props) => {
  const { slug } = await props.params;

  const details = await getDetails(slug);

  if (!details || Object.keys(details).length === 0) {
    notFound();
  }

  const latest = await getLatestDetails({ type: details.type, slug });

  const title = {
    blog: "Latest Blogs",
    event: "Latest Events",
    news: "Latest News",
  };

  const routes = {
    blog: "blogs",
    event: "events",
    news: "news",
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-10 mt-24">
        <div className=" mx-auto py-12 md:flex md:justify-between md:items-center gap-10">
          <div className="md:w-full text-gray-800  mb-5">
            <h2 className="text-3xl md:text-4xl font-medium mb-10">{details.name} </h2>
            <p className="mb-6 text-lg leading-relaxed">{details.desc}</p>

            <div className="uppercase text-sm">
              <span className="font-light">Written by: </span>
              <span>{details.writer}</span>
            </div>
          </div>

          <div className="md:w-full mb-8 md:mb-0">
            <img alt={details.name} src={`${BASE_URL}${details.image}`} className="rounded-lg w-full overflow-hidden max-w-[900px] h-auto" />
          </div>
        </div>

        <div className="prose" style={{ minWidth: "100%" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: details.content || "<p>No content available</p>",
            }}></div>
        </div>
        <hr />
      </section>

      {latest.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-2 bg-white">
          <h1 className="text-5xl font-normal mb-10 ">{title[details.type]}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((blog, index) => (
              <BlogCard
                key={index}
                image={`${BASE_URL}${blog.image}`}
                title={blog.name}
                description={blog.desc}
                link={`/${routes[blog.type]}/${blog.permalink}`}
              />
            ))}
          </div>
        </div>
      )}

      <Footer show={false} />
    </>
  );
};

export default DetailPage;
