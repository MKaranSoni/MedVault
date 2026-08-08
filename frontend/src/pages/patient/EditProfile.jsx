import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../../services/patientService';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    phone: '', dateOfBirth: '', gender: '', bloodGroup: '', height: '', weight: '',
    allergies: [], chronicDiseases: [], currentMedications: [], previousSurgeries: [],
    organDonorStatus: false, lifestyleInformation: '', emergencyNotes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await patientService.getProfile();
        if (res.success && res.data) {
          // ensure arrays are mapped correctly for inputs, or kept as arrays
          setFormData({
            ...res.data,
            allergies: res.data.allergies?.join(', ') || '',
            chronicDiseases: res.data.chronicDiseases?.join(', ') || '',
            currentMedications: res.data.currentMedications?.join(', ') || '',
            previousSurgeries: res.data.previousSurgeries?.join(', ') || '',
            height: res.data.height || '',
            weight: res.data.weight || ''
          });
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
        chronicDiseases: formData.chronicDiseases ? formData.chronicDiseases.split(',').map(s => s.trim()).filter(Boolean) : [],
        currentMedications: formData.currentMedications ? formData.currentMedications.split(',').map(s => s.trim()).filter(Boolean) : [],
        previousSurgeries: formData.previousSurgeries ? formData.previousSurgeries.split(',').map(s => s.trim()).filter(Boolean) : [],
      };
      const res = await patientService.updateProfile(payload);
      if (res.success) {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading Form...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white my-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Medical Profile</h1>
      {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleChange} 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select name="gender" value={formData.gender || ''} onChange={handleChange} 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border bg-white">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <input type="text" name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleChange} placeholder="e.g. O+"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input type="number" step="0.1" name="height" value={formData.height || ''} onChange={handleChange} 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" step="0.1" name="weight" value={formData.weight || ''} onChange={handleChange} 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies (comma separated)</label>
            <textarea name="allergies" value={formData.allergies || ''} onChange={handleChange} rows="2"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chronic Diseases (comma separated)</label>
            <textarea name="chronicDiseases" value={formData.chronicDiseases || ''} onChange={handleChange} rows="2"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Medications (comma separated)</label>
            <textarea name="currentMedications" value={formData.currentMedications || ''} onChange={handleChange} rows="2"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Surgeries (comma separated)</label>
            <textarea name="previousSurgeries" value={formData.previousSurgeries || ''} onChange={handleChange} rows="2"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" name="organDonorStatus" checked={formData.organDonorStatus || false} onChange={handleChange} 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm text-gray-900">Registered Organ Donor</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lifestyle Information</label>
            <textarea name="lifestyleInformation" value={formData.lifestyleInformation || ''} onChange={handleChange} rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Notes</label>
            <textarea name="emergencyNotes" value={formData.emergencyNotes || ''} onChange={handleChange} rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={() => navigate('/profile')} className="px-4 py-2 text-gray-700 hover:text-gray-900">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
