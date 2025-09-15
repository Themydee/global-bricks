import { Hammer, Layers, Cog, CheckCircle, X } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';

const Products = () => {
  const brickTypes = [
    {
      name: 'Clay Bricks',
      description: 'Traditional clay bricks with superior strength and thermal properties.',
      features: ['High compressive strength', 'Excellent thermal insulation', 'Natural fire resistance', 'Weather resistant'],
      image: '/api/placeholder/400/300',
    },
    {
      name: 'Laterite Bricks',
      description: 'Eco-friendly bricks made from locally sourced laterite soil.',
      features: ['Environmentally sustainable', 'Cost-effective production', 'Good thermal mass', 'Local material sourcing'],
      image: '/api/placeholder/400/300',
    },
    {
      name: 'Cement-Based Bricks',
      description: 'High-strength cement bricks for demanding construction applications.',
      features: ['Maximum structural strength', 'Water resistant', 'Uniform dimensions', 'Quick curing process'],
      image: '/api/placeholder/400/300',
    },
  ];

  const machineFeatures = [
    {
      icon: Hammer,
      title: 'On-Site Production',
      description: 'Mobile units that can be set up directly at your construction site, eliminating transportation costs and ensuring fresh brick production.',
    },
    {
      icon: Layers,
      title: 'Multiple Brick Types',
      description: 'Versatile machines capable of producing various brick types including clay, laterite, and cement-based bricks.',
    },
    {
      icon: Cog,
      title: 'Automated Process',
      description: 'Fully automated production process ensuring consistent quality and optimal efficiency with minimal manual intervention.',
    },
  ];

  const comparisonData = [
    { feature: 'Compressive Strength', bricks: 'High (15-20 MPa)', sandcrete: 'Medium (8-12 MPa)' },
    { feature: 'Fire Resistance', bricks: 'Excellent', sandcrete: 'Good' },
    { feature: 'Thermal Insulation', bricks: 'Superior', sandcrete: 'Average' },
    { feature: 'Water Absorption', bricks: 'Low (8-12%)', sandcrete: 'High (15-20%)' },
    { feature: 'Durability', bricks: '100+ years', sandcrete: '50-70 years' },
    { feature: 'Termite Resistance', bricks: 'Complete', sandcrete: 'Limited' },
    { feature: 'Mortar Requirement', bricks: 'Optional', sandcrete: 'Mandatory' },
    { feature: 'Plastering Required', bricks: 'No', sandcrete: 'Yes' },
    { feature: 'Transportation Cost', bricks: 'Minimal (On-site)', sandcrete: 'High' },
    { feature: 'Environmental Impact', bricks: 'Low', sandcrete: 'Medium' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-width text-center text-white">
          <SectionTitle
            subtitle="Our Products"
            title="Advanced Brick Technology"
            description="Discover our range of high-quality bricks produced using cutting-edge mobile manufacturing technology."
          />
        </div>
      </section>

      {/* Brick Types */}
      <section className="section-padding">
        <div className="container-width">
          <SectionTitle
            subtitle="Brick Varieties"
            title="Quality Bricks for Every Need"
            description="Choose from our range of specialized bricks, each designed for specific applications and environmental conditions."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brickTypes.map((brick, index) => (
              <Card key={brick.name} variant="feature">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Layers size={48} className="text-muted-foreground" />
                </div>
                <Card.Header>
                  <Card.Title>{brick.name}</Card.Title>
                  <Card.Description>{brick.description}</Card.Description>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-2">
                    {brick.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
                <Card.Footer>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Machine Technology */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <SectionTitle
            subtitle="Technology"
            title="Mobile Brick Machine Innovation"
            description="Our state-of-the-art mobile brick manufacturing machines bring production directly to your construction site."
            gradient={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {machineFeatures.map((feature, index) => (
              <Card key={feature.title} variant="highlight" className="text-center">
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

      {/* Comparison Table */}
      <section className="section-padding">
        <div className="container-width">
          <SectionTitle
            subtitle="Performance Comparison"
            title="Bricks vs Sandcrete Blocks"
            description="See how our high-quality bricks outperform traditional sandcrete blocks across all key metrics."
          />
          
          <div className="overflow-x-auto">
            <Card className="p-0">
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center font-semibold text-primary">Global Red Bricks</th>
                      <th className="px-6 py-4 text-center font-semibold text-muted-foreground">Sandcrete Blocks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {comparisonData.map((row, index) => (
                      <tr key={row.feature} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{row.feature}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle size={16} className="text-primary" />
                            <span className="text-primary font-medium">{row.bricks}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <X size={16} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{row.sandcrete}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-earth">
        <div className="container-width text-center text-white">
          <SectionTitle
            title="Ready to Experience Superior Quality?"
            description="Contact us today to learn more about our products and how they can benefit your construction project."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="construction" size="lg">
              Request Product Samples
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-foreground">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;