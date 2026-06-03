import BlogCard from "@/components/Blog/Card";
import Footer from "@/components/Footer";
import { API_URL, BASE_URL } from "@/config";

import Link from "next/link";
import InsightPagination from "../_components/InsightPagination";
import { setMetaTitleAndDesc } from "@/helpers/functions";

export const metadata = setMetaTitleAndDesc(
  "Insights & Blog | Horatio AI & Digital Marketing Kerala",
  "Stay updated with Horatio’s latest articles, insights, and trends on AI, digital marketing, branding, web design, and tech innovations from Kerala."
);
export function InsightActions() {
  return (
    <div className="flex gap-4">
      <Link href={"/news"} className="px-4 py-2 border rounded-full hover:border-gray-800 transition-colors duration-500">
        News
      </Link>
      <Link href={"/events"} className="px-4 py-2 border rounded-full hover:border-gray-800 transition-colors duration-500">
        Events
      </Link>
      <Link href={"/blogs"} className="px-4 py-2 border rounded-full hover:border-gray-800 transition-colors duration-500">
        Blogs
      </Link>
    </div>
  );
}

const routes = {
  blog: "/blogs",
  event: "/events",
  news: "/news",
};

export default async function Insights(props) {
  const { page } = await props.searchParams;
  const limit = 9;
  const { data = [], ...response } = await getInsights({ page, limit });
  const pageCount = Math.ceil(response.count / limit);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 mt-24 bg-white">
        <div className="flex flex-col mb-10 justify-between sm:items-center sm:flex-row gap-6">
          <div>
            <h1 className="text-5xl font-normal">Insights</h1>
          </div>
          <InsightActions />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((blog, index) => (
            <BlogCard
              key={index}
              image={`${BASE_URL}${blog.image}`}
              title={blog.name}
              description={blog.desc}
              link={`${routes[blog.type]}/${blog.permalink}`}
            />
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center bg-white">
          <InsightPagination page={page ? Number(page) : 1} pageCount={pageCount} />
        </div>
      )}

      <Footer />
    </>
  );
}

const getInsights = async ({ page = 1, limit }) => {
  try {
    const response = await fetch(`${API_URL}insight/all/list?page=${page}&limit=${limit}`).then((res) => res.json());
    return response;
  } catch (error) {
    console.log("Error fetching insight:", error.message);
  }
};
