"use client";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";

export default function InsightPagination({ page = 1, pageCount, route = "/insights" }) {
  return (
    <div className="flex justify-center bg-white">
      <Pagination
        page={page}
        count={pageCount}
        renderItem={(item) => <PaginationItem component={Link} href={`${route}${item.page === 1 ? "" : `?page=${item.page}`}`} {...item} />}
      />
    </div>
  );
}
