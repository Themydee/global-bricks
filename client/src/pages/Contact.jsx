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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      alert('Form submitted successfully!');

      // Clear form
      setFormData({ name: '', email: '', phone: '', company: '', projectType: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone Number', details: '+2348037321144', link: 'tel:+2348037321144' },
    { icon: Mail, title: 'Email Address', details: 'info@globalredbricks.com', link: 'mailto:info@globalredbricks.com' },
    { icon: MapPin, title: 'Head Office Location', details: "Opp. Ebunoluwa Int'l School, Ofatedo Osogbo Osun State", link: '#' },
    { icon: Clock, title: 'Working Hours', details: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM', link: '#' },
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
            {contactInfo.map((info) => (
              <Card key={info.title} variant="feature" className="text-center">
                <Card.Content>
                  <div className="w-12 h-12 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon size={24} className="text-primary-foreground" />
                  </div>
                  <Card.Title className="text-lg mb-2">{info.title}</Card.Title>
                  {info.link.startsWith('#') ? (
                    <Card.Description className="whitespace-pre-line">{info.details}</Card.Description>
                  ) : (
                    <a href={info.link} className="text-primary hover:text-primary-dark transition-colors">
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
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
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
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
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
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number *</label>
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
                        <label htmlFor="company" className="block text-sm font-medium mb-2">Company/Organization</label>
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
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">Project Type *</label>
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
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details *</label>
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
                      <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={isSubmitting}>
                        <Send className="mr-2" size={20} />
                        {isSubmitting ? 'Submitting...' : 'Send Quote Request'}
                      </Button>
                      <Button type="button" variant="outline" size="lg">Save as Draft</Button>
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
                  <Card.Description>Need immediate assistance? Reach out through these channels.</Card.Description>
                </Card.Header>
                <Card.Content className="space-y-4">
                  <a href="tel:+2348037321144" className="block w-full">
                    <Button variant="primary" className="w-full justify-center"><Phone className="mr-2" size={20} />Call Now</Button>
                  </a>
                  <a href="https://wa.me/2348035841845" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button variant="construction" className="w-full justify-center"><MessageCircle className="mr-2" size={20} />WhatsApp</Button>
                  </a>
                  <a href="mailto:info@globalredbricks.com" className="block w-full">
                    <Button variant="outline" className="w-full justify-center"><Mail className="mr-2" size={20} />Send Email</Button>
                  </a>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Response Time</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span>Quote Requests:</span><span className="font-medium text-primary">24 hours</span></div>
                    <div className="flex justify-between"><span>General Inquiries:</span><span className="font-medium text-primary">4-6 hours</span></div>
                    <div className="flex justify-between"><span>Emergency Support:</span><span className="font-medium text-primary">1 hour</span></div>
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
          <SectionTitle title="Visit Our Location" description="Find us at our main office and manufacturing facility." />
          <Card className="p-0 overflow-hidden">
            <div className="aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.47991115257!2d4.491084087158202!3d7.777101099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037876e0f0eb18f%3A0x4eb17f04a057032f!2sEbunoluwa%20International%20School%20Offatedo!5e0!3m2!1sen!2sng!4v1758373958603!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
