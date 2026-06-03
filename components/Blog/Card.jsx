import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ image, title, description, link }) {
  return (
    <Link
      href={link}
      className="group mx-auto flex flex-col border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white w-full max-w-sm">
      {/* Image Section */}
      <div className="w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 mb-2">{title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 ">{description}</p>

        {/* Read More */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 group-hover:text-black transition">
            <span>READ MORE</span>
            <span className="transform transition-transform duration-300 group-hover:rotate-45">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
