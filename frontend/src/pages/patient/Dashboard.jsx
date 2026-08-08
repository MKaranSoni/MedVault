import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
        <Link to="/profile" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          View Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Welcome to MedVault</h2>
          <p className="text-gray-600">Your secure healthcare platform. Please ensure your profile is up to date.</p>
        </div>
      </div>
    </div>
  );
}
