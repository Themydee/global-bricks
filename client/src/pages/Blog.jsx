import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/blogs");
        setPosts(res.data.blogs || res.data.posts || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-hero text-white text-center">
        <div className="container-width">
          <SectionTitle
            subtitle="Insights & Updates"
            title="Our Blog"
            description="Explore articles, news, and expert advice from the world of construction and architecture."
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-width">
          {loading ? (
            <p className="text-center">Loading blogs...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Card.Content className="p-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <Card.Title className="text-xl mb-2">
                        {post.title}
                      </Card.Title>
                      <Card.Description className="text-sm text-muted-foreground mb-4">
                        {post.excerpt}
                      </Card.Description>
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User size={14} /> {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} /> {post.date}
                        </div>
                      </div>
                    <Link to={`/blog/${post.id}`} className="block w-full">
  <Button variant="primary" size="sm" className="w-full justify-center">
    Read More
  </Button>
</Link>


                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
