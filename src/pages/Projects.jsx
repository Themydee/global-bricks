import { useState } from 'react';
import { Building, Home, School, Filter, MapPin, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Luxury Residential Complex',
      location: 'Victoria Island, Lagos',
      category: 'Residential',
      year: '2024',
      description: 'Modern residential complex featuring 50 luxury apartments built with our premium clay bricks.',
      features: ['50 Apartments', 'Swimming Pool', 'Gym Facility', 'Parking Garage'],
      image: '/api/placeholder/600/400',
    },
    {
      id: 2,
      title: 'Corporate Office Building',
      location: 'Central Business District, Abuja',
      category: 'Commercial',
      year: '2023',
      description: '12-story commercial office building showcasing the strength and beauty of our brick construction.',
      features: ['12 Floors', '200 Offices', 'Conference Centers', 'Retail Spaces'],
      image: '/api/placeholder/600/400',
    },
    {
      id: 3,
      title: 'International School Campus',
      location: 'Port Harcourt, Rivers State',
      category: 'Institutional',
      year: '2023',
      description: 'Educational facility built with fire-resistant bricks ensuring safety and durability.',
      features: ['30 Classrooms', 'Science Labs', 'Library', 'Sports Complex'],
      image: '/api/placeholder/600/400',
    },
    {
      id: 4,
      title: 'Shopping Mall Complex',
      location: 'Ikeja, Lagos',
      category: 'Commercial',
      year: '2024',
      description: 'Large-scale retail complex demonstrating the versatility of our brick systems.',
      features: ['3 Floors', '150 Shops', 'Food Court', '500 Parking Spaces'],
      image: '/api/placeholder/600/400',
    },
    {
      id: 5,
      title: 'Residential Estate',
      location: 'Lekki, Lagos',
      category: 'Residential',
      year: '2023',
      description: 'Gated community of 100 homes showcasing sustainable brick construction.',
      features: ['100 Houses', 'Club House', 'Playground', 'Security Post'],
      image: '/api/placeholder/600/400',
    },
    {
      id: 6,
      title: 'Healthcare Facility',
      location: 'Kano, Kano State',
      category: 'Institutional',
      year: '2024',
      description: 'Modern hospital building with superior fire safety using our advanced brick technology.',
      features: ['200 Beds', 'Operating Theaters', 'Emergency Wing', 'Parking'],
      image: '/api/placeholder/600/400',
    },
  ];

  const categories = ['All', 'Residential', 'Commercial', 'Institutional'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Residential':
        return Home;
      case 'Commercial':
        return Building;
      case 'Institutional':
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category);
              return (
                <Card key={project.id} variant="project" className="animate-fade-in">
                  <div className="aspect-video bg-muted rounded-t-xl flex items-center justify-center">
                    <Building size={48} className="text-muted-foreground" />
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
                        {project.features.map((feature, index) => (
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

          {filteredProjects.length === 0 && (
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

      {/* Stats Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <SectionTitle
            title="Our Track Record"
            description="Numbers that speak to our experience and commitment to excellence."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card variant="feature" className="text-center">
              <Card.Content>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <Card.Title className="text-lg">Projects Completed</Card.Title>
                <Card.Description>Successful construction projects across Nigeria</Card.Description>
              </Card.Content>
            </Card>
            
            <Card variant="feature" className="text-center">
              <Card.Content>
                <div className="text-3xl font-bold text-primary mb-2">2M+</div>
                <Card.Title className="text-lg">Bricks Produced</Card.Title>
                <Card.Description>High-quality bricks manufactured to date</Card.Description>
              </Card.Content>
            </Card>
            
            <Card variant="feature" className="text-center">
              <Card.Content>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <Card.Title className="text-lg">States Served</Card.Title>
                <Card.Description>Construction projects across Nigerian states</Card.Description>
              </Card.Content>
            </Card>
            
            <Card variant="feature" className="text-center">
              <Card.Content>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <Card.Title className="text-lg">Client Satisfaction</Card.Title>
                <Card.Description>Happy clients who recommend our services</Card.Description>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-earth">
        <div className="container-width text-center text-white">
          <SectionTitle
            title="Start Your Project Today"
            description="Ready to join our growing list of successful projects? Contact us for a consultation and see how we can bring your construction vision to life."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="construction" size="lg">
              Request Project Consultation
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-foreground">
              View Our Process
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;