import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from '../components/layout/Layout.jsx';
import Button from '../components/ui/Button.jsx';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-width text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-brick rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-primary-foreground">404</span>
            </div>
            <h1 className="heading-lg mb-4">Page Not Found</h1>
            <p className="body-md text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="primary">
                  Return to Home
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
