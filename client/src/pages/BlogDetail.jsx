import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout.jsx";
import { Calendar, User, ArrowLeft } from "lucide-react";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${slug}`);
        const data = res.data.blog || res.data.post || res.data;
        setBlog(data);
      } catch (error) {
        console.error("❌ Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="text-center">Loading blog...</p>;
  if (!blog) return <p className="text-center">Blog not found.</p>;

  return (
    <Layout>
      <section className="section-padding container-width">
        <Link to="/blog" className="text-primary flex items-center gap-1 mb-6">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT: Image */}
          {blog.image && (
            <div className="flex justify-center">
              <img
                src={blog.image}
                alt={blog.title}
                className="
                  w-full 
                  h-auto 
                  max-h-[500px]
                  rounded-2xl 
                  shadow-lg 
                  object-cover 
                  transition-transform 
                  duration-300 
                  hover:scale-[1.02]
                "
              />
            </div>
          )}

          {/* RIGHT: Text Details */}
          <div>
            <h1 className="text-4xl font-bold mb-3 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center gap-2">
                <User size={14} /> {blog.author || "Unknown"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />{" "}
                {new Date(blog.created_at || blog.createdAt).toLocaleDateString()}
              </div>
            </div>

            {blog.excerpt && (
              <p className="text-muted-foreground mb-6 text-lg">{blog.excerpt}</p>
            )}

            <div
              className="prose max-w-none leading-relaxed text-base"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
