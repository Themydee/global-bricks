import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout.jsx";
import { MapPin, Calendar, Building, ArrowLeft, Home, School } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams(); // e.g. /projects/:id
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "residential":
        return Home;
      case "commercial":
        return Building;
      case "institutional":
        return School;
      default:
        return Building;
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/projects/${id}`);
        setProject(res.data.project || res.data);
      } catch (error) {
        console.error("❌ Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center py-12">Loading project...</p>;
  if (!project) return <p className="text-center py-12">Project not found.</p>;

  const CategoryIcon = getCategoryIcon(project.category);

  return (
    <Layout>
      <section className="section-padding container-width">
        <Link to="/projects" className="text-primary flex items-center gap-1 mb-6">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT: Image */}
          {project.image && (
            <div className="flex justify-center">
              <img
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `http://localhost:3000/${project.image.replace(/^\/+/, "")}`
                }
                alt={project.title}
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

          {/* RIGHT: Details */}
          <div>
            <h1 className="text-4xl font-bold mb-3 leading-tight">{project.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center gap-2">
                <CategoryIcon size={16} /> {project.category}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {project.year}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} /> {project.location}
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Features */}
            {Array.isArray(project.features) && project.features.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-2">Key Features</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetails;
