import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import Logo from '../../assets/red_brick_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Why Bricks?', path: '/why-bricks' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-card/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border shadow-subtle">
      <div className="container-width section-padding py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img className="w-10 h-10" src={Logo} alt="Logo" />
          <div>
            <h2 className="text-xl font-bold text-gradient-brick">Global Red Bricks</h2>
            <p className="text-xs text-muted-foreground">Building Excellence</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition-colors duration-300 hover:text-primary ${
                isActive(item.path)
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 font-medium hover:text-primary"
              >
                <User size={18} />
                {user.name}
                <ChevronDown size={16} className={`${userMenuOpen ? 'rotate-180' : ''} transition-transform`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-border z-50">
                 
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden mt-4 animate-fade-in">
          <div className="flex flex-col space-y-3 py-4 border-t border-border">
            {/* Main links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* User section */}
            {user ? (
              <div className="border-t border-border pt-3">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center justify-between w-full py-2 px-4 rounded-lg font-medium hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <User size={18} /> {user.name}
                  </span>
                  <ChevronDown size={16} className={`${userMenuOpen ? 'rotate-180' : ''} transition-transform`} />
                </button>

                {userMenuOpen && (
                  <div className="flex flex-col mt-2 space-y-1 px-2">
                    <Link
                      to="/profile"
                      onClick={() => { setUserMenuOpen(false); setIsOpen(false); }}
                      className="py-2 px-4 rounded-lg hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => { setUserMenuOpen(false); setIsOpen(false); }}
                        className="py-2 px-4 rounded-lg hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="py-2 px-4 text-red-500 rounded-lg hover:bg-red-50 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="py-2 px-4 rounded-lg font-medium text-primary hover:bg-muted border-t border-border pt-3"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
