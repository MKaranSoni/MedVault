import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { emergencyService } from '../../services/emergencyService';

export default function EmergencyAccess() {
  const { token } = useParams();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await emergencyService.getEmergencyDashboard(token);
        if (res.success) {
          setDashboard(res.data);
          setChatMessages([{ role: 'system', content: `Hello Doctor. I am the MedVault AI assistant for ${res.data.patientName}. How can I assist you with this emergency?` }]);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid or expired Emergency Token');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [token]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleAskAi = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await emergencyService.askAi(token, userMessage);
      if (res.success) {
        setChatMessages(prev => [...prev, { role: 'ai', content: res.data }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I could not process that request.' }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai', content: 'Connection error.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-red-600 flex items-center justify-center text-white text-2xl font-bold animate-pulse">VERIFYING SECURE TOKEN...</div>;

  if (error || !dashboard) return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border-t-4 border-red-600">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-red-700 text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <h1 className="text-xl font-bold">EMERGENCY DOCTOR DASHBOARD</h1>
          </div>
          <span className="bg-white text-red-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">LIVE EMERGENCY</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 mt-4 space-y-6">

        {/* Critical Alerts Banner */}
        {dashboard.criticalAlerts && dashboard.criticalAlerts.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded shadow-sm">
            <h2 className="text-red-800 font-bold text-lg mb-2 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              CRITICAL ALERTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dashboard.criticalAlerts.map((alert, idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-red-200">
                  <span className="text-xs font-bold text-red-600 uppercase">{alert.type}</span>
                  <div className="font-bold text-gray-900">{alert.title}</div>
                  <div className="text-sm text-gray-700">{alert.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patient Overview */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {dashboard.profilePhotoUrl ? (
            <img src={dashboard.profilePhotoUrl} alt="Patient" className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-100 shadow">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">{dashboard.patientName}</h2>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="bg-gray-100 px-3 py-1 rounded text-sm"><span className="font-semibold">Age:</span> {dashboard.age || 'Unknown'}</div>
              <div className="bg-gray-100 px-3 py-1 rounded text-sm"><span className="font-semibold">Gender:</span> {dashboard.gender || 'Unknown'}</div>
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-bold border border-red-200">Blood: {dashboard.bloodGroup || 'Unknown'}</div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm border border-blue-200">Donor: {dashboard.organDonorStatus}</div>
            </div>
          </div>
        </div>

        {/* AI Emergency Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            AI Emergency Summary
          </h2>
          <div className="text-blue-900 whitespace-pre-wrap leading-relaxed">
            {dashboard.aiEmergencySummary}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Timeline */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Medical History Timeline</h2>
              {dashboard.timeline && dashboard.timeline.length > 0 ? (
                <div className="space-y-4">
                  {dashboard.timeline.map((event, idx) => (
                    <div key={idx} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                        {idx !== dashboard.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1"></div>}
                      </div>
                      <div className="pb-4">
                        <div className="text-sm font-bold text-blue-600">{new Date(event.date).toLocaleDateString()}</div>
                        <div className="font-bold text-gray-800">{event.title}</div>
                        <div className="text-sm text-gray-600">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500">No major medical events recorded.</p>}
            </div>

            {/* Medications */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Current Medications</h2>
              {dashboard.currentMedications && dashboard.currentMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboard.currentMedications.map((m, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded border border-gray-200">
                      <div className="font-bold text-gray-900 text-lg">{m.medicineName}</div>
                      <div className="text-gray-600 mt-1"><span className="font-semibold">Dosage:</span> {m.dosage}</div>
                      <div className="text-gray-600"><span className="font-semibold">Freq:</span> {m.frequency}</div>
                      {m.notes && <div className="text-sm text-gray-500 mt-2 italic">{m.notes}</div>}
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500">No current medications.</p>}
            </div>

            {/* Reports */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Medical Reports</h2>
              {dashboard.medicalReports && dashboard.medicalReports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboard.medicalReports.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                      <div>
                        <div className="font-bold text-gray-800">{r.reportTitle}</div>
                        <div className="text-xs text-gray-500">{r.reportType} • {new Date(r.createdAt).toLocaleDateString()}</div>
                      </div>
                      <a href={r.cloudinaryUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </a>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500">No reports available.</p>}
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Contacts */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Emergency Contacts</h2>
              {dashboard.emergencyContacts && dashboard.emergencyContacts.length > 0 ? (
                <div className="space-y-4">
                  {dashboard.emergencyContacts.map((c, i) => (
                    <div key={i} className={`p-4 rounded border ${c.isPrimary ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-900 flex items-center">
                            {c.name} {c.isPrimary && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 rounded font-bold">PRIMARY</span>}
                          </div>
                          <div className="text-sm text-gray-600">{c.relationship}</div>
                          <div className="text-gray-800 font-medium mt-1">{c.phone}</div>
                        </div>
                        <a href={`tel:${c.phone}`} className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500">No emergency contacts listed.</p>}
            </div>

            {/* Notes */}
            {dashboard.emergencyNotes && (
              <div className="bg-yellow-50 p-6 rounded-lg shadow border border-yellow-200">
                <h2 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Emergency Notes
                </h2>
                <p className="text-yellow-900 text-sm whitespace-pre-wrap">{dashboard.emergencyNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating AI Chat for Doctors */}
      <div className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 bg-white shadow-2xl transition-transform duration-300 transform ${chatOpen ? 'translate-y-0 md:rounded-t-lg' : 'translate-y-full'}`} style={{ height: '500px', zIndex: 50 }}>
        {/* Chat Header */}
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center rounded-t-lg cursor-pointer" onClick={() => setChatOpen(!chatOpen)}>
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span className="font-bold">Ask AI Assistant</span>
          </div>
          <button className="text-white hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-4 h-[380px] overflow-y-auto bg-gray-50 flex flex-col space-y-4">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none whitespace-pre-wrap'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-500 p-3 rounded-lg rounded-tl-none flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleAskAi} className="p-3 bg-white border-t flex items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <input 
            type="text" 
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            placeholder="E.g. What allergies should I know?" 
            className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:border-indigo-500 text-sm"
            disabled={chatLoading}
          />
          <button type="submit" disabled={chatLoading || !chatInput.trim()} className="bg-indigo-600 text-white p-2 rounded-r hover:bg-indigo-700 disabled:opacity-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>

      {/* Floating Chat Toggle Button (Visible when chat is closed) */}
      {!chatOpen && (
        <button 
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105 z-40 flex items-center space-x-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          <span className="font-bold hidden md:inline">Ask AI</span>
        </button>
      )}

    </div>
  );
}
