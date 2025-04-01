import React, { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  BookOpen,
  Clock,
  Loader,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import config from "../../config";

const BlogCard = ({ blog }) => {
  // Format date from "2024-11-25 16:42:02" to "Nov 25, 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Estimate reading time based on content length
  const calculateReadingTime = (content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return minutes;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-l-4 border-l-[#cf6615] h-full flex flex-col">
      {/* Blog Image with overlay gradient */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#09305d]/70 to-transparent z-10"></div>
        <img
          src={blog.post_photo}
          alt={blog.post_title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        {/* Date pill positioned on image */}
        <div className="absolute top-4 right-4 z-20 bg-[#cf6615] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md">
          <Calendar size={12} className="mr-1" />
          {formatDate(blog.created_at)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Reading time */}
        <div className="flex items-center text-[#36322e] text-sm mb-2">
          <Clock size={14} className="mr-1 text-[#7daa71]" />
          <span>{calculateReadingTime(blog.post_content)} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#09305d] mb-3 line-clamp-2">
          {blog.post_title}
        </h3>

        {/* Summary */}
        <p className="text-[#36322e] mb-4 line-clamp-3 flex-grow">
          {blog.post_content_short}
        </p>

        {/* Read More */}
        <div className="mt-auto pt-4 border-t border-[#e0e0e0]">
          <a
            href={`/blogs/${blog.post_slug}`}
            className="inline-flex items-center px-4 py-2 bg-[#7daa71] text-white rounded-md hover:bg-[#09305d] transition-colors duration-300"
          >
            <span>Read Article</span>
            <ArrowRight
              size={16}
              className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/blogs?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({
        top: document.getElementById("blogs-section").offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div
        id="blogs-section"
        className="bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px] flex items-center justify-center"
      >
        <Loader size={36} className="text-[#cf6615] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="blogs-section"
        className="bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="bg-[#cf6615]/10 p-6 rounded-lg border-l-4 border-[#cf6615] max-w-4xl mx-auto">
          <div className="flex items-center">
            <AlertTriangle size={24} className="mr-3 text-[#cf6615]" />
            <p className="text-[#36322e]">Failed to load blogs: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="blogs-section" className="bg-[#f8f9fa] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <div className="relative mb-16 text-center">
          <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-16 h-16 rounded-full bg-[#09305d] flex items-center justify-center shadow-lg">
            <BookOpen size={24} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-[#09305d] pt-12 pb-2">Insights & Articles</h2>
          <p className="text-[#36322e] max-w-2xl mx-auto">
            Explore our latest thoughts, industry trends, and expert opinions
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="h-1 w-16 rounded-full bg-[#cf6615]"></div>
            <div className="h-1 w-32 rounded-full bg-[#7daa71] mx-2"></div>
            <div className="h-1 w-16 rounded-full bg-[#cf6615]"></div>
          </div>
        </div>

        {/* Blog Grid with new layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination with updated styling */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center">
            <div className="inline-flex bg-white rounded-lg shadow-md p-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-l-lg transition-all ${
                  currentPage === 1
                    ? "text-[#e0e0e0] cursor-not-allowed"
                    : "text-[#09305d] hover:bg-[#09305d] hover:text-white"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex border-l border-r border-[#e0e0e0]">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center font-medium transition-all ${
                      currentPage === index + 1
                        ? "bg-[#09305d] text-white"
                        : "text-[#36322e] hover:bg-[#e0e0e0]"
                    }`}
                    aria-label={`Page ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-r-lg transition-all ${
                  currentPage === totalPages
                    ? "text-[#e0e0e0] cursor-not-allowed"
                    : "text-[#09305d] hover:bg-[#09305d] hover:text-white"
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;