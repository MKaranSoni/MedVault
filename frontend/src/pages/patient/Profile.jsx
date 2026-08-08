import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { patientService } from '../../services/patientService';
import ProfileCompletion from '../../components/patient/ProfileCompletion';
import MedicalInfoCard from '../../components/patient/MedicalInfoCard';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await patientService.getProfile();
        if (res.success) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading Profile...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Medical Profile</h1>
        <Link to="/profile/edit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Edit Profile
        </Link>
      </div>

      <ProfileCompletion profile={profile} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 col-span-full md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Basic Info</h2>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Phone:</span> {profile?.phone || 'N/A'}</p>
            <p><span className="font-medium">DOB:</span> {profile?.dateOfBirth || 'N/A'}</p>
            <p><span className="font-medium">Gender:</span> {profile?.gender || 'N/A'}</p>
            <p><span className="font-medium">Blood Group:</span> {profile?.bloodGroup || 'N/A'}</p>
            <p><span className="font-medium">Height:</span> {profile?.height ? `${profile.height} cm` : 'N/A'}</p>
            <p><span className="font-medium">Weight:</span> {profile?.weight ? `${profile.weight} kg` : 'N/A'}</p>
            <p><span className="font-medium">Organ Donor:</span> {profile?.organDonorStatus ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <MedicalInfoCard title="Allergies" data={profile?.allergies || []} />
        <MedicalInfoCard title="Chronic Diseases" data={profile?.chronicDiseases || []} />
        <MedicalInfoCard title="Current Medications" data={profile?.currentMedications || []} />
        <MedicalInfoCard title="Previous Surgeries" data={profile?.previousSurgeries || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MedicalInfoCard title="Lifestyle Information" data={profile?.lifestyleInformation} />
        <MedicalInfoCard title="Emergency Notes" data={profile?.emergencyNotes} />
      </div>
    </div>
  );
}
