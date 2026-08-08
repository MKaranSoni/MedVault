import { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Link } from 'react-router-dom';

export default function AiDashboard() {
  const [medicalSummary, setMedicalSummary] = useState(null);
  const [emergencySummary, setEmergencySummary] = useState(null);
  const [loadingMed, setLoadingMed] = useState(false);
  const [loadingEmerg, setLoadingEmerg] = useState(false);

  const fetchMedicalSummary = async () => {
    setLoadingMed(true);
    try {
      const res = await aiService.getMedicalSummary();
      if (res.success) setMedicalSummary(res.data);
    } catch (e) {
      console.error(e);
      setMedicalSummary("Failed to generate summary. Please try again.");
    } finally {
      setLoadingMed(false);
    }
  };

  const fetchEmergencySummary = async () => {
    setLoadingEmerg(true);
    try {
      const res = await aiService.getEmergencySummary();
      if (res.success) setEmergencySummary(res.data);
    } catch (e) {
      console.error(e);
      setEmergencySummary("Failed to generate summary. Please try again.");
    } finally {
      setLoadingEmerg(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gemini AI Assistant</h1>
        <Link to="/ai-chat" className="bg-purple-600 text-white px-5 py-2.5 rounded shadow hover:bg-purple-700 transition font-medium">
          Open AI Chat
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Medical Summary Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-blue-50 border-b border-blue-100 p-5">
            <h2 className="text-xl font-bold text-blue-900">AI Medical Summary</h2>
            <p className="text-sm text-blue-700 mt-1">Get a comprehensive overview of your health profile.</p>
          </div>
          <div className="p-5 flex-grow">
            {loadingMed ? (
              <div className="flex justify-center items-center h-32 space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            ) : medicalSummary ? (
              <div className="prose prose-sm text-gray-700 whitespace-pre-wrap">{medicalSummary}</div>
            ) : (
              <div className="text-center text-gray-500 py-10">Click below to generate your summary.</div>
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <button onClick={fetchMedicalSummary} disabled={loadingMed} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {medicalSummary ? 'Regenerate Summary' : 'Generate Summary'}
            </button>
          </div>
        </div>

        {/* Emergency Summary Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-red-50 border-b border-red-100 p-5">
            <h2 className="text-xl font-bold text-red-900">AI Emergency Summary</h2>
            <p className="text-sm text-red-700 mt-1">Critical information for first responders.</p>
          </div>
          <div className="p-5 flex-grow">
            {loadingEmerg ? (
              <div className="flex justify-center items-center h-32 space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            ) : emergencySummary ? (
              <div className="prose prose-sm text-gray-700 whitespace-pre-wrap">{emergencySummary}</div>
            ) : (
              <div className="text-center text-gray-500 py-10">Click below to generate your emergency summary.</div>
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <button onClick={fetchEmergencySummary} disabled={loadingEmerg} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50">
              {emergencySummary ? 'Regenerate Summary' : 'Generate Summary'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
        <strong>Disclaimer:</strong> The AI assistant does not provide medical diagnoses or prescribe treatments. 
        Always consult a qualified healthcare professional for medical decisions.
      </div>
    </div>
  );
}
