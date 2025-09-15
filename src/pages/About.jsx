import { Users, Target, Eye, Award, Wrench, Globe } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import brickMachine from '../assets/brick-machine.jpg';

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Chief Executive Officer',
      experience: '15+ years in construction',
    },
    {
      name: 'Sarah Banks',
      role: 'Technical Director',
      experience: '12+ years in engineering',
    },
    {
      name: 'Michael Chen',
      role: 'Operations Manager',
      experience: '10+ years in manufacturing',
    },
  ];

  const features = [
    {
      icon: Wrench,
      title: 'Mobile Machine Technology',
      description: 'State-of-the-art mobile brick making machines that can produce high-quality bricks on-site, eliminating transportation costs and ensuring fresh production.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensure every brick meets international standards for strength, durability, and consistency.',
    },
    {
      icon: Globe,
      title: 'Sustainable Practices',
      description: 'Environmentally conscious manufacturing using locally sourced materials and energy-efficient processes.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-width text-center text-white">
          <SectionTitle
            subtitle="About Us"
            title="Building the Future with Innovation"
            description="Global Red Bricks is revolutionizing the construction industry with advanced mobile brick manufacturing technology and sustainable practices."
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card variant="highlight">
              <Card.Content>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="text-primary" size={32} />
                  <Card.Title>Our Mission</Card.Title>
                </div>
                <Card.Description>
                  To revolutionize the construction industry by providing superior quality bricks 
                  through innovative mobile manufacturing technology, delivering cost-effective, 
                  sustainable, and durable building solutions that exceed traditional materials 
                  in performance and value.
                </Card.Description>
              </Card.Content>
            </Card>

            <Card variant="highlight">
              <Card.Content>
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="text-primary" size={32} />
                  <Card.Title>Our Vision</Card.Title>
                </div>
                <Card.Description>
                  To become the leading provider of mobile brick manufacturing solutions across 
                  Africa, setting new standards for construction materials while promoting 
                  sustainable building practices and empowering local communities through 
                  innovative technology.
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                subtitle="Our Story"
                title="From Vision to Reality"
                description=""
                centered={false}
                gradient={true}
              />
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Founded with a passion for innovation in construction, Global Red Bricks 
                  emerged from the recognition that traditional building materials had 
                  significant limitations that modern technology could solve.
                </p>
                <p>
                  Our journey began when our founders, experienced construction professionals, 
                  identified the need for stronger, more cost-effective, and environmentally 
                  friendly building materials. This led to the development of our revolutionary 
                  mobile brick manufacturing technology.
                </p>
                <p>
                  Today, we're proud to serve clients across Nigeria, delivering superior 
                  quality bricks that outperform traditional sandcrete blocks while reducing 
                  construction costs and environmental impact.
                </p>
              </div>
            </div>
            <div>
              <img 
                src={brickMachine} 
                alt="Our mobile brick manufacturing process"
                className="rounded-xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-width">
          <SectionTitle
            subtitle="Why Choose Global Red Bricks?"
            title="Excellence in Every Brick"
            description="Our commitment to quality, innovation, and customer satisfaction sets us apart in the construction industry."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} variant="feature" className="text-center">
                <Card.Content>
                  <div className="w-16 h-16 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={32} className="text-primary-foreground" />
                  </div>
                  <Card.Title className="mb-3">{feature.title}</Card.Title>
                  <Card.Description className="text-center">
                    {feature.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <SectionTitle
            subtitle="Our Team"
            title="Meet the Experts"
            description="Our experienced team brings together decades of expertise in construction, engineering, and manufacturing."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={member.name} className="text-center">
                <Card.Content>
                  <div className="w-24 h-24 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={40} className="text-primary-foreground" />
                  </div>
                  <Card.Title className="mb-2">{member.name}</Card.Title>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <Card.Description className="text-center">
                    {member.experience}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;