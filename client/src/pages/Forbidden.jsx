import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";

const Forbidden = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-5xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold mt-4">Forbidden Access</h2>
        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>
        <Link to="/" className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Go Back Home
        </Link>
      </div>
    </Layout>
  );
};

export default Forbidden;
