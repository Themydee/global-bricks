import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, User, Building } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      details: '+234 123 456 7890',
      link: 'tel:+2341234567890',
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: 'info@globalredbricks.com',
      link: 'mailto:info@globalredbricks.com',
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: '123 Industrial Zone, Construction City, Nigeria',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM',
      link: '#',
    },
  ];

  const projectTypes = [
    'Residential Building',
    'Commercial Complex',
    'Industrial Facility',
    'Educational Institution',
    'Healthcare Facility',
    'Infrastructure Project',
    'Other',
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-width text-center text-white">
          <SectionTitle
            subtitle="Get In Touch"
            title="Contact Global Red Bricks"
            description="Ready to start your construction project? Get in touch with our experts for personalized consultation and competitive quotes."
          />
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={info.title} variant="feature" className="text-center">
                <Card.Content>
                  <div className="w-12 h-12 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon size={24} className="text-primary-foreground" />
                  </div>
                  <Card.Title className="text-lg mb-2">{info.title}</Card.Title>
                  {info.link.startsWith('#') ? (
                    <Card.Description className="whitespace-pre-line">
                      {info.details}
                    </Card.Description>
                  ) : (
                    <a
                      href={info.link}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      {info.details}
                    </a>
                  )}
                </Card.Content>
              </Card>
            ))}
          </div>

          {/* Contact Form and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <Card.Header>
                  <Card.Title className="text-2xl">Request a Quote</Card.Title>
                  <Card.Description>
                    Fill out the form below and our team will get back to you within 24 hours.
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-muted-foreground" size={20} />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-muted-foreground" size={20} />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company/Organization
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 text-muted-foreground" size={20} />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                            placeholder="Enter company name"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background resize-none"
                        placeholder="Please provide details about your project including size, timeline, and specific requirements..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" variant="primary" size="lg" className="flex-1">
                        <Send className="mr-2" size={20} />
                        Send Quote Request
                      </Button>
                      <Button type="button" variant="outline" size="lg">
                        Save as Draft
                      </Button>
                    </div>
                  </form>
                </Card.Content>
              </Card>
            </div>

            {/* Quick Contact Actions */}
            <div className="space-y-6">
              <Card variant="highlight">
                <Card.Header>
                  <Card.Title>Quick Contact</Card.Title>
                  <Card.Description>
                    Need immediate assistance? Reach out through these channels.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="space-y-4">
                  <a
                    href="tel:+2341234567890"
                    className="block w-full"
                  >
                    <Button variant="primary" className="w-full justify-center">
                      <Phone className="mr-2" size={20} />
                      Call Now
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/2341234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="construction" className="w-full justify-center">
                      <MessageCircle className="mr-2" size={20} />
                      WhatsApp
                    </Button>
                  </a>
                  <a
                    href="mailto:info@globalredbricks.com"
                    className="block w-full"
                  >
                    <Button variant="outline" className="w-full justify-center">
                      <Mail className="mr-2" size={20} />
                      Send Email
                    </Button>
                  </a>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Response Time</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Quote Requests:</span>
                      <span className="font-medium text-primary">24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>General Inquiries:</span>
                      <span className="font-medium text-primary">4-6 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency Support:</span>
                      <span className="font-medium text-primary">1 hour</span>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <SectionTitle
            title="Visit Our Location"
            description="Find us at our main office and manufacturing facility."
          />
          <Card className="p-0 overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map would be embedded here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  123 Industrial Zone, Construction City, Nigeria
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;