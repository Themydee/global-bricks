import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import Button from "../components/ui/Button.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // PROJECT FORM DATA
  // -----------------------------
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    category: "",
    features: "",
    year: "",
  });

  // -----------------------------
  // BLOG FORM DATA
  // -----------------------------
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    tags: "",
    author: "",
  });

  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // -----------------------------
  // FETCH DATA
  // -----------------------------
  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, projectsRes, blogsRes] = await Promise.all([
        fetch("http://localhost:3000/api/users"),
        fetch("http://localhost:3000/api/projects"),
        fetch("http://localhost:3000/api/blogs"),
      ]);

      const usersData = await usersRes.json();
      const projectsData = await projectsRes.json();
      const blogsData = await blogsRes.json();

      setUsers(Array.isArray(usersData) ? usersData : usersData.users || []);
      setProjects(
        Array.isArray(projectsData) ? projectsData : projectsData.projects || []
      );
      setBlogs(Array.isArray(blogsData) ? blogsData : blogsData.blogs || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -----------------------------
  // DELETE HANDLERS
  // -----------------------------
  const handleDeleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
      });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await fetch(`http://localhost:3000/api/blogs/${id}`, { method: "DELETE" });
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // PROJECT FORM SUBMIT
  // -----------------------------
  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    const method = editingProject ? "PUT" : "POST";
    const url = editingProject
      ? `http://localhost:3000/api/projects/${editingProject.id}`
      : "http://localhost:3000/api/projects";

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "features") {
        formDataToSend.append(
          "features",
          JSON.stringify(
            formData.features
              ? formData.features.split(",").map((f) => f.trim())
              : []
          )
        );
      } else if (key === "image" && typeof value !== "string" && value) {
        formDataToSend.append("image", value);
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const res = await fetch(url, { method, body: formDataToSend });
      const data = await res.json();

      if (data.success) {
        setProjects((prev) =>
          editingProject
            ? prev.map((p) =>
                p.id === editingProject.id ? { ...p, ...data.project } : p
              )
            : [...prev, data.project]
        );
        setFormData({
          title: "",
          description: "",
          location: "",
          image: "",
          category: "",
          features: "",
          year: "",
        });
        setEditingProject(null);
      }
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  // -----------------------------
  // BLOG FORM SUBMIT
  // -----------------------------
  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    const method = editingBlog ? "PUT" : "POST";
    const url = editingBlog
      ? `http://localhost:3000/api/blogs/${editingBlog.id}`
      : "http://localhost:3000/api/blogs";

    const formDataToSend = new FormData();
    Object.entries(blogForm).forEach(([key, value]) => {
      if (key === "tags") {
        formDataToSend.append(
          "tags",
          JSON.stringify(
            blogForm.tags
              ? blogForm.tags.split(",").map((t) => t.trim())
              : []
          )
        );
      } else if (key === "image" && typeof value !== "string" && value) {
        formDataToSend.append("image", value);
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const res = await fetch(url, { method, body: formDataToSend });
      const data = await res.json();

      if (data.success) {
        setBlogs((prev) =>
          editingBlog
            ? prev.map((b) =>
                b.id === editingBlog.id ? { ...b, ...data.blog } : b
              )
            : [...prev, data.blog]
        );
        setBlogForm({
          title: "",
          excerpt: "",
          content: "",
          image: "",
          tags: "",
          author: "",
        });
        setEditingBlog(null);
      }
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  // -----------------------------
  // EDIT + CANCEL BLOG
  // -----------------------------
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image: blog.image || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      author: blog.author || "",
    });
  };

  const handleCancelBlogEdit = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      tags: "",
      author: "",
    });
  };

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  // -----------------------------
  // JSX RENDER
  // -----------------------------
  return (
    <Layout>
      <section className="section-padding">
        <SectionTitle
          title="Admin Dashboard"
          description="Manage users, projects, and blogs"
        />

        {/* USERS */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b">Name</th>
                  <th className="p-3 text-left border-b">Email</th>
                  <th className="p-3 text-left border-b">Role</th>
                  <th className="p-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{user.name}</td>
                    <td className="p-3 border-b">{user.email}</td>
                    <td className="p-3 border-b">{user.role}</td>
                    <td className="p-3 border-b">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* PROJECTS */}
<h2 className="text-xl font-semibold mt-12 mb-4">Projects</h2>

<form
  onSubmit={handleProjectSubmit}
  className="mb-8 bg-gray-50 p-4 rounded-lg"
  encType="multipart/form-data"
>
  <h3 className="font-semibold mb-3">
    {editingProject ? "Edit Project" : "Add New Project"}
  </h3>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
    <input
      type="text"
      placeholder="Title"
      className="border p-2 rounded"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Location"
      className="border p-2 rounded"
      value={formData.location}
      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Category"
      className="border p-2 rounded"
      value={formData.category}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      required
    />
    <input
      type="number"
      placeholder="Year"
      className="border p-2 rounded"
      value={formData.year}
      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
    />
    <input
      type="text"
      placeholder="Features (comma separated)"
      className="border p-2 rounded"
      value={formData.features}
      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
    />
  </div>

  <textarea
    placeholder="Description"
    className="border p-2 rounded w-full mt-3"
    rows="3"
    value={formData.description}
    onChange={(e) =>
      setFormData({ ...formData, description: e.target.value })
    }
  />

  {/* 📸 IMAGE UPLOAD */}
  <div className="mt-3">
    <label className="block font-medium mb-1">Upload Project Image</label>
    <input
      type="file"
      accept="image/*"
      className="border p-2 rounded w-full"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setFormData({ ...formData, image: file });
        }
      }}
    />
    {/* Image Preview */}
    {formData.image && typeof formData.image === "string" ? (
      <img
        src={formData.image}
        alt="Preview"
        className="w-40 h-40 object-cover rounded mt-3 border"
      />
    ) : formData.image instanceof File ? (
      <img
        src={URL.createObjectURL(formData.image)}
        alt="Preview"
        className="w-40 h-40 object-cover rounded mt-3 border"
      />
    ) : null}
  </div>

  <div className="flex gap-3 mt-4">
    <Button type="submit">
      {editingProject ? "Update Project" : "Add Project"}
    </Button>
    {editingProject && (
      <Button
        variant="secondary"
        type="button"
        onClick={() => setEditingProject(null)}
      >
        Cancel
      </Button>
    )}
  </div>
</form>

{/* Project Table */}
{projects.length === 0 ? (
  <p>No projects found.</p>
) : (
  <div className="overflow-x-auto">
    <table className="w-full border border-border rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left border-b">Title</th>
          <th className="p-3 text-left border-b">Category</th>
          <th className="p-3 text-left border-b">Location</th>
          <th className="p-3 text-left border-b">Year</th>
          <th className="p-3 text-left border-b">Features</th>
          <th className="p-3 text-left border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id} className="hover:bg-gray-50">
            <td className="p-3 border-b">{project.title}</td>
            <td className="p-3 border-b">{project.category}</td>
            <td className="p-3 border-b">{project.location || "-"}</td>
            <td className="p-3 border-b">{project.year || "-"}</td>
            <td className="p-3 border-b">
              {Array.isArray(project.features)
                ? project.features.join(", ")
                : ""}
            </td>
            <td className="p-3 border-b flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleEditProject(project)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


    {/* BLOGS SECTION */}
<h2 className="text-xl font-semibold mt-12 mb-4">Blogs</h2>

<form
  onSubmit={handleBlogSubmit}
  className="mb-8 bg-gray-50 p-4 rounded-lg"
  encType="multipart/form-data"
>
  <h3 className="font-semibold mb-3">
    {editingBlog ? "Edit Blog" : "Add New Blog"}
  </h3>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
    <input
      type="text"
      placeholder="Title"
      className="border p-2 rounded"
      value={blogForm.title}
      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Excerpt"
      className="border p-2 rounded"
      value={blogForm.excerpt}
      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
    />
    <input
      type="text"
      placeholder="Author"
      className="border p-2 rounded"
      value={blogForm.author}
      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
    />
    <input
      type="text"
      placeholder="Tags (comma separated)"
      className="border p-2 rounded"
      value={blogForm.tags}
      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
    />
  </div>

  {/* 📸 IMAGE UPLOAD */}
  <div className="mt-3">
    <label className="block font-medium mb-1">Upload Image</label>
    <input
      type="file"
      accept="image/*"
      className="border p-2 rounded w-full"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setBlogForm({ ...blogForm, image: file });
        }
      }}
    />
    {/* Image Preview */}
    {blogForm.image && typeof blogForm.image === "string" ? (
      <img
        src={blogForm.image}
        alt="Preview"
        className="w-40 h-40 object-cover rounded mt-3 border"
      />
    ) : blogForm.image instanceof File ? (
      <img
        src={URL.createObjectURL(blogForm.image)}
        alt="Preview"
        className="w-40 h-40 object-cover rounded mt-3 border"
      />
    ) : null}
  </div>

  <textarea
    placeholder="Content (HTML or Markdown)"
    className="border p-2 rounded w-full mt-3"
    rows="6"
    value={blogForm.content}
    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
  />

  <div className="flex gap-3 mt-4">
    <Button type="submit">
      {editingBlog ? "Update Blog" : "Add Blog"}
    </Button>
    {editingBlog && (
      <Button
        variant="secondary"
        type="button"
        onClick={handleCancelBlogEdit}
      >
        Cancel
      </Button>
    )}
  </div>
</form>


        {/* Blog Table */}
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b">Title</th>
                  <th className="p-3 text-left border-b">Author</th>
                  <th className="p-3 text-left border-b">Tags</th>
                  <th className="p-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{blog.title}</td>
                    <td className="p-3 border-b">{blog.author}</td>
                    <td className="p-3 border-b">
                      {Array.isArray(blog.tags) ? blog.tags.join(", ") : ""}
                    </td>
                    <td className="p-3 border-b flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditBlog(blog)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default AdminPage;
