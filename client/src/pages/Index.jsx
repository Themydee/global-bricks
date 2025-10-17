import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  Shield, 
  Flame, 
  Bug, 
  DollarSign, 
  Leaf, 
  Building, 
  Phone, 
  MessageCircle,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import heroImage from '../assets/hero-construction.jpg';
import brickMachine from '../assets/brick-machine.jpg';


const Index = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const advantages = [
    {
      icon: Shield,
      title: 'Bulletproof Strength',
      description: 'Superior structural integrity that withstands extreme conditions and provides unmatched security.',
    },
    {
      icon: Flame,
      title: 'Fire Resistant',
      description: 'Exceptional fire resistance properties that protect your investment and ensure safety.',
    },
    {
      icon: Bug,
      title: 'Termite Proof',
      description: 'Complete protection against termite damage, ensuring long-lasting structural integrity.',
    },
    {
      icon: DollarSign,
      title: 'Cost Effective',
      description: 'On-site production eliminates transportation costs and reduces overall construction expenses.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Sustainable manufacturing process using locally sourced materials with minimal environmental impact.',
    },
    {
      icon: Building,
      title: 'No Plastering Needed',
      description: 'Beautiful finish straight from production eliminates the need for external plastering.',
    },
  ];

 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/projects'); 
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []); // 👈 important

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center hero-pattern"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImage})` }}
      >
        <div className="container-width section-padding text-center text-white">
          <div className="animate-fade-in">
            <h1 className="heading-xl mb-6">
              Stronger. Smarter. <span className="text-construction">Sustainable</span> Bricks.
            </h1>
            <p className="body-lg mb-8 max-w-2xl mx-auto text-gray-200">
              Revolutionary mobile brick machine technology delivering superior quality bricks 
              that outperform traditional sandcrete blocks in every way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Request a Quote
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white hover:bg-white hover:text-foreground">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-width">
          <SectionTitle
            subtitle="Why Choose Bricks?"
            title="Superior Building Materials"
            description="Our advanced brick manufacturing technology delivers unmatched quality and performance compared to traditional sandcrete blocks."
            gradient={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={advantage.title} variant="feature" className="animate-slide-up text-center">
                <Card.Content>
                  <div className="w-16 h-16 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-4">
                    <advantage.icon size={32} className="text-primary-foreground" />
                  </div>
                  <Card.Title className="mb-3">{advantage.title}</Card.Title>
                  <Card.Description className="text-center">
                    {advantage.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Company Snippet */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img 
                src={brickMachine} 
                alt="Mobile brick making machine in operation"
                className="rounded-xl shadow-elevated w-full"
              />
            </div>
            <div className="animate-fade-in">
              <SectionTitle
                subtitle="About Global Red Bricks"
                title="Revolutionizing Construction with Mobile Technology"
                description=""
                centered={false}
                gradient={true}
              />
              <p className="body-md text-muted-foreground mb-6">
                We are pioneering the future of construction with our advanced mobile brick 
                manufacturing technology. Our on-site production capabilities eliminate 
                transportation costs while delivering superior quality bricks that outperform 
                traditional building materials.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>On-site brick production using mobile machines</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>No mortar required for construction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>Exceptional durability and strength</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>Eco-friendly manufacturing process</span>
                </div>
              </div>

              <Link to="/about">
                <Button variant="secondary">
                  Learn More About Us
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

   
       {/* Featured Projects */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <SectionTitle
            subtitle="Our Work"
            title="Featured Projects"
            description="Discover the quality and craftsmanship of our brick construction projects across Nigeria."
          />

          {loading ? (
            <p className="text-center text-muted-foreground">Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <Card key={project.id} variant="project" className="animate-scale-in">
                  <div className="aspect-video bg-muted rounded-t-xl flex items-center justify-center">
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
  )}                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-construction bg-construction/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <Card.Title className="mb-2">{project.title}</Card.Title>
                    <Card.Description className="mb-4">{project.location}</Card.Description>
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
                        View Details <ArrowRight className="ml-1" size={16} />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-width text-center text-white">
          <div className="animate-fade-in">
            <h2 className="heading-lg mb-6">Build with Global Red Bricks Today</h2>
            <p className="body-lg mb-8 max-w-2xl mx-auto text-gray-200">
              Ready to start your construction project with superior quality bricks? 
              Get in touch with our experts for a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+2341234567890">
                <Button variant="construction" size="lg" className="w-full sm:w-auto">
                  <Phone className="mr-2" size={20} />
                  Call Now
                </Button>
              </a>
              <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white hover:bg-white hover:text-foreground">
                  <MessageCircle className="mr-2" size={20} />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;