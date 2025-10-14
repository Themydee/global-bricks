import { useEffect, useState } from 'react';
import axios from 'axios';
import { Building, Home, School, Filter, MapPin, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/projects/');
        setProjects(res.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Automatically derive unique categories from project data
const categories = ['All', ...new Set(projects.map((p) => p.category))];

const filteredProjects =
  activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter);


const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'residential':
        return Home;
      case 'commercial':
        return Building;
      case 'institutional':
        return School;
      default:
        return Building;
    }
  };
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-width text-center text-white">
          <SectionTitle
            subtitle="Our Projects"
            title="Building Excellence Across Nigeria"
            description="Explore our portfolio of successful construction projects showcasing the superior quality and durability of our brick construction methods."
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? 'primary' : 'outline'}
                onClick={() => setActiveFilter(category)}
                className="flex items-center space-x-2"
              >
                <Filter size={18} />
                <span>{category}</span>
              </Button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-12 text-muted-foreground">
              Loading projects...
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500">
              {error}
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const CategoryIcon = getCategoryIcon(project.category);
                return (
                  <Card key={project.id} variant="project" className="animate-fade-in">
                    <div className="aspect-video bg-muted rounded-t-xl overflow-hidden">
  {project.image ? (
    <img
      src={project.image.startsWith('http')
        ? project.image
        : `http://localhost:3000/${project.image.replace(/^\/+/, '')}`}
      alt={project.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      <Building size={48} />
    </div>
  )}
</div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-construction bg-construction/10 px-3 py-1 rounded-full flex items-center space-x-1">
                          <CategoryIcon size={14} />
                          <span>{project.category}</span>
                        </span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          {project.year}
                        </div>
                      </div>
                      
                      <Card.Title className="mb-2">{project.title}</Card.Title>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin size={14} className="mr-1" />
                        {project.location}
                      </div>
                      
                      <Card.Description className="mb-4">
                        {project.description}
                      </Card.Description>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {Array.isArray(project.features) &&
                            project.features.map((feature, index) => (
                              <span key={index} className="text-xs text-muted-foreground">
                                • {feature}
                              </span>
                            ))}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark w-full">
                        View Project Details
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Building size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground">
                No projects match the selected filter. Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
