import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { emergencyService } from '../../services/emergencyService';

export default function IceMode() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIceProfile = async () => {
      try {
        const res = await emergencyService.getIceProfile(token);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError("Invalid or expired emergency token.");
      } finally {
        setLoading(false);
      }
    };
    fetchIceProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-3xl font-bold animate-pulse">Loading Critical Information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-600 text-white p-8 rounded-lg max-w-md w-full border-4 border-red-800 shadow-2xl">
          <h1 className="text-4xl font-black mb-4">ACCESS DENIED</h1>
          <p className="text-xl font-bold">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* HEADER */}
      <div className="bg-red-700 text-white p-6 sticky top-0 z-50 shadow-lg border-b-4 border-red-900">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight uppercase leading-none">I.C.E. MODE</h1>
            <p className="text-xl font-bold text-red-200 mt-2 uppercase">In Case of Emergency</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold uppercase">{data.patientName}</h2>
            <p className="text-2xl font-bold text-red-100">{data.age} Y/O • {data.gender}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6 mt-4">

        {/* CRITICAL ALERTS SECTION */}
        {data.criticalAlerts && data.criticalAlerts.length > 0 && (
          <section className="bg-red-600 border-4 border-red-800 rounded-xl p-6 shadow-2xl animate-pulse-slow">
            <h3 className="text-3xl font-black uppercase border-b-4 border-red-800 pb-3 mb-4 flex items-center">
              <span className="text-5xl mr-4">⚠️</span> CRITICAL ALERTS
            </h3>
            <ul className="space-y-4">
              {data.criticalAlerts.map((alert, idx) => (
                <li key={idx} className="bg-white text-red-900 p-4 rounded-lg font-bold text-2xl shadow-inner flex items-center justify-between">
                  <span className="uppercase">{alert.title}</span>
                  <span className="bg-red-800 text-white px-3 py-1 rounded text-sm uppercase tracking-wider">{alert.severity}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* AI EMERGENCY SUMMARY SECTION */}
        <section className="bg-yellow-500 border-4 border-yellow-600 rounded-xl p-6 text-black shadow-xl">
          <h3 className="text-3xl font-black uppercase border-b-4 border-yellow-600 pb-3 mb-4 flex items-center">
            <span className="text-4xl mr-4">🤖</span> AI EMERGENCY SUMMARY
          </h3>
          <div className="bg-yellow-100 p-4 rounded-lg font-bold text-xl leading-relaxed whitespace-pre-wrap border-2 border-yellow-300">
            {data.aiEmergencySummary}
          </div>
        </section>

        {/* ESSENTIAL MEDICAL INFO SECTION */}
        <section className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
          <h3 className="text-2xl font-black text-gray-300 uppercase mb-4 border-b-2 border-gray-700 pb-2">Vitals & Info</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 p-4 rounded text-center border-l-4 border-red-500">
              <div className="text-gray-400 text-sm font-bold uppercase mb-1">Blood</div>
              <div className="text-4xl font-black text-red-500">{data.bloodGroup || 'N/A'}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded text-center border-l-4 border-blue-500">
              <div className="text-gray-400 text-sm font-bold uppercase mb-1">Weight</div>
              <div className="text-3xl font-bold">{data.weight ? `${data.weight}kg` : 'N/A'}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded text-center border-l-4 border-green-500">
              <div className="text-gray-400 text-sm font-bold uppercase mb-1">Height</div>
              <div className="text-3xl font-bold">{data.height ? `${data.height}cm` : 'N/A'}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded text-center border-l-4 border-purple-500">
              <div className="text-gray-400 text-sm font-bold uppercase mb-1">Donor</div>
              <div className="text-2xl font-bold uppercase">{data.organDonorStatus}</div>
            </div>
          </div>
        </section>

        {/* CURRENT MEDICATIONS SECTION */}
        {data.currentMedications && data.currentMedications.length > 0 && (
          <section className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
            <h3 className="text-2xl font-black text-gray-300 uppercase mb-4 border-b-2 border-gray-700 pb-2">Current Medications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.currentMedications.map((med, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-xl font-bold text-white mb-1">{med.medicineName}</div>
                  <div className="text-gray-400 font-semibold">{med.dosage} - {med.frequency}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EMERGENCY CONTACTS SECTION */}
        {data.emergencyContacts && data.emergencyContacts.length > 0 && (
          <section className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
            <h3 className="text-2xl font-black text-gray-300 uppercase mb-4 border-b-2 border-gray-700 pb-2 flex items-center">
              <span className="text-3xl mr-3">📞</span> Emergency Contacts
            </h3>
            <div className="space-y-4">
              {data.emergencyContacts.map((contact, idx) => (
                <div key={idx} className={`bg-gray-900 p-5 rounded-lg border-2 ${contact.isPrimary ? 'border-green-600' : 'border-gray-700'} flex items-center justify-between`}>
                  <div>
                    <div className="text-2xl font-bold text-white">{contact.name}</div>
                    <div className="text-gray-400 font-bold uppercase text-sm mt-1">{contact.relationship} {contact.isPrimary && '• PRIMARY'}</div>
                  </div>
                  <a href={`tel:${contact.phone}`} className="bg-green-600 hover:bg-green-500 text-white font-black text-xl py-3 px-6 rounded-lg uppercase transition shadow-lg">
                    Call
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* FIXED ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t-4 border-gray-800 p-4 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <button onClick={() => window.location.reload()} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-lg uppercase transition text-xl">
            Refresh
          </button>
          <button onClick={() => navigate(`/emergency/${token}/dashboard`)} className="flex-[2] bg-blue-700 hover:bg-blue-600 text-white font-black py-4 rounded-lg uppercase transition text-2xl shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            Open Full Dashboard →
          </button>
        </div>
      </div>

    </div>
  );
}
