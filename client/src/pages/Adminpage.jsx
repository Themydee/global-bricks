import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import Button from "../components/ui/Button.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Project form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    category: "",
    features: "",
    year: "",
  });
  const [editingProject, setEditingProject] = useState(null);

  // -----------------------------
  // FETCH USERS + PROJECTS
  // -----------------------------
  const fetchData = async () => {
    setLoading(true);
    try {
      const usersRes = await fetch("http://localhost:3000/api/users");
      const usersData = await usersRes.json();
      setUsers(Array.isArray(usersData) ? usersData : usersData.users || []);

      const projectsRes = await fetch("http://localhost:3000/api/projects");
      const projectsData = await projectsRes.json();
      setProjects(Array.isArray(projectsData) ? projectsData : projectsData.projects || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setUsers([]);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -----------------------------
  // DELETE USER
  // -----------------------------
  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // DELETE PROJECT
  // -----------------------------
  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // CREATE / UPDATE PROJECT
  // -----------------------------
const handleSubmit = async (e) => {
  e.preventDefault();

  const method = editingProject ? "PUT" : "POST";
  const url = editingProject
    ? `http://localhost:3000/api/projects/${editingProject.id}`
    : "http://localhost:3000/api/projects";

  // Build FormData for file + text data
  const formDataToSend = new FormData();
  formDataToSend.append("title", formData.title);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("location", formData.location);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("year", formData.year);
  formDataToSend.append(
    "features",
    JSON.stringify(
      formData.features
        ? formData.features.split(",").map((f) => f.trim())
        : []
    )
  );
  if (formData.image && typeof formData.image !== "string") {
    formDataToSend.append("image", formData.image);
  }

  try {
    const res = await fetch(url, {
      method,
      body: formDataToSend,
    });

    const data = await res.json();

    if (data.success) {
      if (editingProject) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id ? { ...p, ...data.project } : p
          )
        );
      } else {
        setProjects((prev) => [...prev, data.project]);
      }

      // Reset
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
  // EDIT + CANCEL
  // -----------------------------
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      location: project.location || "",
      image: project.image || "",
      category: project.category || "",
      features: Array.isArray(project.features)
        ? project.features.join(", ")
        : "",
      year: project.year || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      image: "",
      category: "",
      features: "",
      year: "",
    });
  };

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <Layout>
      <section className="section-padding">
        <SectionTitle
          title="Admin Dashboard"
          description="Manage users and projects"
        />

        {/* USERS TABLE */}
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

        {/* PROJECT SECTION */}
        <h2 className="text-xl font-semibold mt-12 mb-4">Projects</h2>

        {/* Project Form */}
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="border p-2 rounded"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Category"
              className="border p-2 rounded"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
            {/* Image Upload Field */}
<div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
  onClick={() => document.getElementById("imageUpload").click()}
>
  {formData.image ? (
    <img
      src={
        typeof formData.image === "string"
          ? formData.image
          : URL.createObjectURL(formData.image)
      }
      alt="Preview"
      className="w-32 h-32 object-cover rounded-lg mb-2"
    />
  ) : (
    <div className="flex flex-col items-center text-gray-500">
      <span className="text-3xl font-bold">+</span>
      <p className="text-sm">Click to upload image</p>
    </div>
  )}
  <input
    type="file"
    id="imageUpload"
    accept="image/*"
    className="hidden"
    onChange={(e) =>
      setFormData({ ...formData, image: e.target.files[0] })
    }
  />
</div>

            <input
              type="number"
              placeholder="Year"
              className="border p-2 rounded"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Features (comma separated)"
              className="border p-2 rounded"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
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
          <div className="flex gap-3 mt-4">
            <Button type="submit">
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
            {editingProject && (
              <Button
                variant="secondary"
                type="button"
                onClick={handleCancelEdit}
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
                  <th className="p-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{project.title}</td>
                    <td className="p-3 border-b">{project.category}</td>
                    <td className="p-3 border-b">{project.location}</td>
                    <td className="p-3 border-b">{project.year}</td>
                    <td className="p-3 border-b flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(project)}
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
      </section>
    </Layout>
  );
};

export default AdminPage;
