import { 
  Shield, 
  Flame, 
  Bug, 
  DollarSign, 
  Leaf, 
  Building, 
  Hammer, 
  Thermometer,
  Palette,
  Clock,
  Truck,
  CheckCircle
} from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';

const WhyBricks = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'On-Site Production Saves Cost',
      description: 'Our mobile brick machines eliminate transportation costs by producing bricks directly at your construction site. This reduces overall project costs by 15-25% compared to traditional materials.',
      features: ['Zero transportation costs', 'Reduced handling expenses', 'Lower labor costs', 'Bulk production discounts'],
    },
    {
      icon: Hammer,
      title: 'No Mortar Required',
      description: 'Our precision-manufactured bricks fit together perfectly with interlocking design, eliminating the need for mortar in many applications. This speeds up construction and reduces material costs.',
      features: ['Faster construction', '50% less labor required', 'Perfect alignment', 'Weather-independent work'],
    },
    {
      icon: Palette,
      title: 'No External Plastering',
      description: 'Beautiful finish straight from production means no additional plastering is required on external walls. This saves both time and money while providing an attractive, durable surface.',
      features: ['Natural brick aesthetics', 'Weather-resistant finish', 'Maintenance-free exterior', 'Immediate occupancy'],
    },
    {
      icon: Shield,
      title: 'Superior Structural Stability',
      description: 'High compressive strength (15-20 MPa) provides exceptional structural integrity. Our bricks can support multi-story buildings with confidence and safety.',
      features: ['Multi-story capability', 'Earthquake resistance', 'Load-bearing strength', 'Long-term stability'],
    },
    {
      icon: Shield,
      title: 'Bulletproof Protection',
      description: 'Dense construction and superior materials provide exceptional resistance to impact and penetration, offering enhanced security for your property.',
      features: ['Impact resistance', 'Security enhancement', 'Peace of mind', 'Insurance benefits'],
    },
    {
      icon: Flame,
      title: 'Fire-Resistant Safety',
      description: 'Excellent fire resistance properties protect your investment and ensure occupant safety. Our bricks meet international fire safety standards.',
      features: ['4-hour fire rating', 'Non-combustible materials', 'Slow heat transfer', 'Emergency evacuation time'],
    },
    {
      icon: Thermometer,
      title: 'Temperature Regulation',
      description: 'Natural thermal mass properties help maintain comfortable indoor temperatures year-round, reducing energy costs for heating and cooling.',
      features: ['Natural insulation', 'Energy savings', 'Comfortable interiors', 'Reduced HVAC costs'],
    },
    {
      icon: Palette,
      title: 'Aesthetic Beauty',
      description: 'Timeless brick appearance adds character and value to any building. Various colors and textures available to match your design vision.',
      features: ['Classic appearance', 'Multiple color options', 'Texture variations', 'Increased property value'],
    },
    {
      icon: Bug,
      title: 'Complete Termite Protection',
      description: 'Inorganic materials provide 100% protection against termite damage, unlike wood-based alternatives that require regular treatment.',
      features: ['Zero termite risk', 'No chemical treatments', 'Permanent protection', 'Reduced maintenance'],
    },
    {
      icon: Leaf,
      title: 'Environmental Sustainability',
      description: 'Manufactured using locally sourced materials with minimal environmental impact. Energy-efficient production process supports green building initiatives.',
      features: ['Local material sourcing', 'Low carbon footprint', 'Recyclable materials', 'Green building credits'],
    },
  ];

  const comparisonChart = [
    { aspect: 'Initial Cost', bricks: 'Medium', sandcrete: 'Low', winner: 'sandcrete' },
    { aspect: 'Transportation', bricks: 'None (On-site)', sandcrete: 'High', winner: 'bricks' },
    { aspect: 'Labor Costs', bricks: 'Low', sandcrete: 'High', winner: 'bricks' },
    { aspect: 'Plastering Needed', bricks: 'No', sandcrete: 'Yes', winner: 'bricks' },
    { aspect: 'Mortar Required', bricks: 'Optional', sandcrete: 'Essential', winner: 'bricks' },
    { aspect: 'Construction Speed', bricks: 'Fast', sandcrete: 'Slow', winner: 'bricks' },
    { aspect: 'Total Project Cost', bricks: 'Lower', sandcrete: 'Higher', winner: 'bricks' },
    { aspect: 'Durability (Years)', bricks: '100+', sandcrete: '50-70', winner: 'bricks' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-width text-center text-white">
          <SectionTitle
            subtitle="Educational Guide"
            title="Why Choose Bricks Over Sandcrete?"
            description="Discover the comprehensive advantages of modern brick construction technology and why it's the superior choice for your building project."
          />
        </div>
      </section>

      {/* Main Benefits */}
      <section className="section-padding">
        <div className="container-width">
          <SectionTitle
            subtitle="Complete Benefits Breakdown"
            title="Superior Performance in Every Aspect"
            description="Our advanced brick technology delivers unmatched advantages across all key construction criteria."
            gradient={true}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} variant="feature" className="animate-fade-in">
                <Card.Content>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-brick rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon size={24} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <Card.Title className="mb-3">{benefit.title}</Card.Title>
                      <Card.Description className="mb-4">
                        {benefit.description}
                      </Card.Description>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {benefit.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle size={14} className="text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <SectionTitle
            title="Total Cost of Ownership Analysis"
            description="See how our bricks deliver superior value when considering all project costs over the building's lifetime."
          />
          
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Cost Factor</th>
                    <th className="px-6 py-4 text-center font-semibold">Global Red Bricks</th>
                    <th className="px-6 py-4 text-center font-semibold">Sandcrete Blocks</th>
                    <th className="px-6 py-4 text-center font-semibold">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonChart.map((row, index) => (
                    <tr key={row.aspect} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{row.aspect}</td>
                      <td className={`px-6 py-4 text-center font-medium ${row.winner === 'bricks' ? 'text-primary' : 'text-muted-foreground'}`}>
                        {row.bricks}
                      </td>
                      <td className={`px-6 py-4 text-center font-medium ${row.winner === 'sandcrete' ? 'text-primary' : 'text-muted-foreground'}`}>
                        {row.sandcrete}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <CheckCircle 
                            size={20} 
                            className={row.winner === 'bricks' ? 'text-primary' : 'text-muted-foreground'} 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Infographic Section */}
      <section className="section-padding">
        <div className="container-width">
          <SectionTitle
            title="Construction Timeline Comparison"
            description="See how our brick construction accelerates your project timeline while reducing costs."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Brick Construction Timeline */}
            <Card variant="highlight">
              <Card.Header>
                <Card.Title className="text-center text-primary">Global Red Bricks Process</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <p className="font-medium">On-site Setup</p>
                      <p className="text-sm text-muted-foreground">Mobile machine deployment (1 day)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <p className="font-medium">Brick Production</p>
                      <p className="text-sm text-muted-foreground">Continuous on-site manufacturing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <p className="font-medium">Direct Construction</p>
                      <p className="text-sm text-muted-foreground">No mortar, faster building</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <p className="font-medium">Ready for Use</p>
                      <p className="text-sm text-muted-foreground">No plastering needed</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="font-bold text-primary text-center">Total Time: 25% Faster</p>
                    <p className="text-sm text-center text-muted-foreground mt-1">Immediate occupancy ready</p>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Traditional Process */}
            <Card>
              <Card.Header>
                <Card.Title className="text-center text-muted-foreground">Traditional Sandcrete Process</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <p className="font-medium">Order & Transport</p>
                      <p className="text-sm text-muted-foreground">Delivery delays and costs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <p className="font-medium">Mortar Preparation</p>
                      <p className="text-sm text-muted-foreground">Time-consuming mixing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <p className="font-medium">Block Laying</p>
                      <p className="text-sm text-muted-foreground">Slow, weather-dependent</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <p className="font-medium">Plastering Required</p>
                      <p className="text-sm text-muted-foreground">Additional time and materials</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="font-bold text-muted-foreground text-center">Standard Timeline</p>
                    <p className="text-sm text-center text-muted-foreground mt-1">Extended completion time</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-brick">
        <div className="container-width text-center text-white">
          <SectionTitle
            title="Experience the Brick Advantage"
            description="Ready to build with superior materials that save time, money, and deliver exceptional results? Contact our experts today."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="construction" size="lg">
              Calculate Your Savings
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-foreground">
              Schedule Site Visit
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyBricks;