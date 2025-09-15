import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: 'Pricing & Costs',
      questions: [
        {
          question: 'How much do your bricks cost compared to sandcrete blocks?',
          answer: 'While our initial brick cost may be slightly higher, the total project cost is typically 15-25% lower due to eliminated transportation costs, reduced labor requirements, no mortar needed, and no plastering required. We provide detailed cost comparisons for each project.',
        },
        {
          question: 'What factors affect the cost of cement and laterite materials?',
          answer: 'Material costs depend on local availability, transportation distance to your site, quantity required, and current market prices. Since we produce on-site, you benefit from bulk purchasing power and eliminated transportation costs for the bricks themselves.',
        },
        {
          question: 'Do you offer payment plans or financing options?',
          answer: 'Yes, we offer flexible payment terms including milestone-based payments, extended payment plans for large projects, and partnerships with financial institutions for construction financing. Contact us to discuss options for your specific project.',
        },
        {
          question: 'Are there additional costs I should consider?',
          answer: 'Our pricing is comprehensive and includes machine setup, on-site production, quality testing, and basic technical support. Additional costs may include site preparation (if needed) and extended technical support for complex projects.',
        },
      ],
    },
    {
      category: 'Transportation & Delivery',
      questions: [
        {
          question: 'How do you eliminate transportation costs?',
          answer: 'Our mobile brick machines are transported to your site once and produce bricks on-location. This eliminates the need to transport finished bricks, reducing costs and delivery delays while ensuring fresh production.',
        },
        {
          question: 'What is the setup time for your mobile machines?',
          answer: 'Our mobile brick machines can be set up and operational within 6-8 hours of arrival at your site. This includes equipment positioning, calibration, and initial quality testing to ensure optimal production.',
        },
        {
          question: 'How long can the machine stay on-site?',
          answer: 'Our machines can remain on-site for the duration of your project, from a few weeks to several months. This ensures continuous brick supply and eliminates scheduling delays common with traditional brick supply chains.',
        },
        {
          question: 'What about remote or difficult-to-access locations?',
          answer: 'Our mobile units are designed for versatility and can access most construction sites. For challenging locations, we conduct a site assessment and may provide specialized transportation solutions.',
        },
      ],
    },
    {
      category: 'Production & Delivery Time',
      questions: [
        {
          question: 'How quickly can you start production at my site?',
          answer: 'After contract signing, we typically mobilize within 3-5 business days. Production begins immediately after setup, usually within 24 hours of our arrival at your site.',
        },
        {
          question: 'What is your daily brick production capacity?',
          answer: 'Our mobile machines can produce 2,000-5,000 bricks per day depending on brick type and size requirements. Production runs continuously during working hours to meet your construction schedule.',
        },
        {
          question: 'How do you handle urgent or rush orders?',
          answer: 'For urgent projects, we can prioritize your order and deploy additional resources including extended working hours and multiple production shifts. Rush handling fees may apply for expedited service.',
        },
        {
          question: 'What happens if there are weather delays?',
          answer: 'Our production process is less weather-dependent than traditional methods. Light rain doesn\'t stop production, and our covered mobile units provide protection. Severe weather delays are minimal compared to traditional block laying.',
        },
      ],
    },
    {
      category: 'Durability & Quality',
      questions: [
        {
          question: 'How long do your bricks last compared to sandcrete blocks?',
          answer: 'Our bricks are designed to last 100+ years with minimal maintenance, significantly longer than sandcrete blocks (50-70 years). This longevity provides excellent long-term value and reduces replacement costs.',
        },
        {
          question: 'What quality assurance measures do you have?',
          answer: 'Every batch undergoes rigorous testing including compressive strength tests, water absorption tests, and dimensional accuracy checks. We provide quality certificates and maintain detailed production records for each project.',
        },
        {
          question: 'Do your bricks meet international building standards?',
          answer: 'Yes, our bricks meet and exceed international standards including ASTM, BS, and local Nigerian building codes. We provide all necessary compliance documentation and testing certificates.',
        },
        {
          question: 'How do you handle defective or damaged bricks?',
          answer: 'We maintain strict quality control to minimize defects. Any defective bricks are immediately replaced at no cost. Our on-site production allows for immediate resolution of any quality issues.',
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'Do you provide technical support during construction?',
          answer: 'Yes, we provide comprehensive technical support including on-site consultation, construction guidance, and troubleshooting. Our technical team is available throughout your project duration.',
        },
        {
          question: 'Can you help with architectural and structural design?',
          answer: 'We work with qualified architects and structural engineers to optimize designs for brick construction. We can recommend design modifications that maximize the benefits of our brick systems.',
        },
        {
          question: 'What training do you provide for construction teams?',
          answer: 'We provide hands-on training for your construction team on optimal brick laying techniques, especially for our mortarless systems. This ensures maximum efficiency and quality results.',
        },
        {
          question: 'Do you offer post-construction support?',
          answer: 'Yes, we provide ongoing support including maintenance guidelines, warranty service, and consultation for future expansions or renovations using our brick systems.',
        },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const newIndex = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === newIndex ? null : newIndex);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-width text-center text-white">
          <SectionTitle
            subtitle="FAQ"
            title="Frequently Asked Questions"
            description="Find answers to common questions about our brick manufacturing process, costs, delivery, and quality assurance."
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            {faqData.map((category, categoryIndex) => (
              <div key={category.category} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const isActive = activeIndex === `${categoryIndex}-${questionIndex}`;
                    return (
                      <Card key={questionIndex} className="overflow-hidden">
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <h3 className="font-semibold text-foreground pr-4">
                            {item.question}
                          </h3>
                          {isActive ? (
                            <ChevronUp className="text-primary flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-muted-foreground flex-shrink-0" size={20} />
                          )}
                        </button>
                        {isActive && (
                          <div className="px-6 pb-4 animate-fade-in">
                            <p className="text-muted-foreground leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <SectionTitle
            title="Still Have Questions?"
            description="Our expert team is here to help. Get in touch for personalized answers to your specific project needs."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card variant="highlight" className="text-center">
              <Card.Content>
                <div className="w-16 h-16 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={32} className="text-primary-foreground" />
                </div>
                <Card.Title className="mb-3">Call Our Experts</Card.Title>
                <Card.Description className="mb-6">
                  Speak directly with our technical team for immediate answers to your questions.
                </Card.Description>
                <a href="tel:+2341234567890">
                  <Button variant="primary" className="w-full">
                    <Phone className="mr-2" size={18} />
                    +234 123 456 7890
                  </Button>
                </a>
              </Card.Content>
            </Card>

            <Card variant="highlight" className="text-center">
              <Card.Content>
                <div className="w-16 h-16 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-primary-foreground" />
                </div>
                <Card.Title className="mb-3">WhatsApp Support</Card.Title>
                <Card.Description className="mb-6">
                  Get instant responses to your questions via WhatsApp chat support.
                </Card.Description>
                <a
                  href="https://wa.me/2341234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="construction" className="w-full">
                    <MessageCircle className="mr-2" size={18} />
                    Chat on WhatsApp
                  </Button>
                </a>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="section-padding">
        <div className="container-width">
          <SectionTitle
            title="Quick Decision Guide"
            description="Not sure if our bricks are right for your project? Here are key indicators that make our solution ideal."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="feature">
              <Card.Content>
                <Card.Title className="text-lg mb-3 text-primary">Perfect For:</Card.Title>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Multi-story buildings</li>
                  <li>• Remote construction sites</li>
                  <li>• Tight construction schedules</li>
                  <li>• Quality-focused projects</li>
                  <li>• Long-term investments</li>
                </ul>
              </Card.Content>
            </Card>

            <Card variant="feature">
              <Card.Content>
                <Card.Title className="text-lg mb-3 text-construction">Consider If:</Card.Title>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• You need 2,000+ bricks</li>
                  <li>• Site access for mobile unit</li>
                  <li>• Project timeline 2 weeks</li>
                  <li>• Quality is priority</li>
                  <li>• Cost optimization important</li>
                </ul>
              </Card.Content>
            </Card>

            <Card variant="feature">
              <Card.Content>
                <Card.Title className="text-lg mb-3 text-secondary">Benefits:</Card.Title>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 15-25% cost savings</li>
                  <li>• 25% faster construction</li>
                  <li>• 100+ year durability</li>
                  <li>• Zero transportation costs</li>
                  <li>• Immediate availability</li>
                </ul>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;