import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, MessageCircle, Instagram } from 'lucide-react';
import Logo from '../../assets/red_brick_logo.png'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Why Bricks?', path: '/why-bricks' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Brick Manufacturing',
    'On-site Production',
    'Construction Consulting',
    'Quality Testing',
    'Delivery Services',
    'Technical Support',
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
                         <img className='w-10 h-10 ' src={Logo} alt="" />
             
              <div>
                <h3 className="text-xl font-bold text-primary-foreground">Global Red Bricks</h3>
                <p className="text-sm text-secondary-light">Building Excellence</p>
              </div>
            </div>
            <p className="text-secondary-light mb-6 leading-relaxed">
              Leading manufacturer of high-quality bricks using mobile machine technology. 
              Stronger, smarter, and sustainable building solutions.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-secondary-light rounded-lg hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-secondary-light rounded-lg hover:bg-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-secondary-light rounded-lg hover:bg-primary transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="p-2 bg-secondary-light rounded-lg hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-light hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary-foreground">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-secondary-light">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary-foreground">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-construction mt-1 flex-shrink-0" />
                <p className="text-secondary-light">
                  123 Industrial Zone, Construction City, Nigeria
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-construction flex-shrink-0" />
                <a href="tel:+2341234567890" className="text-secondary-light hover:text-primary-foreground transition-colors">
                  +234 123 456 7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-construction flex-shrink-0" />
                <a href="mailto:info@globalredbricks.com" className="text-secondary-light hover:text-primary-foreground transition-colors">
                  info@globalredbricks.com
                </a>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-6">
              <a
                href="https://wa.me/2341234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-light mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-light text-sm">
              © 2024 Global Red Bricks. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-secondary-light hover:text-primary-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-light hover:text-primary-foreground text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;