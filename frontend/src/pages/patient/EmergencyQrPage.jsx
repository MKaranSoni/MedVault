import { useState, useEffect } from 'react';
import { qrCodeService } from '../../services/qrCodeService';

export default function EmergencyQrPage() {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQrStatus = async () => {
    try {
      const res = await qrCodeService.getQrStatus();
      if (res.success) setQrData(res.data);
    } catch (e) {
      setQrData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQrStatus(); }, []);

  const handleAction = async (actionFn) => {
    setLoading(true);
    try {
      const res = await actionFn();
      if (res && res.success) {
        if (actionFn === qrCodeService.revokeQr) setQrData(null);
        else setQrData(res.data);
      }
    } catch (e) {
      console.error(e);
      alert('Action failed. Please try again.');
    } finally {
      setLoading(false);
      fetchQrStatus();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>Print MedVault QR</title></head>
      <body style="text-align:center; padding: 50px;">
        <h2>My MedVault Emergency QR</h2>
        <img src="${qrData.qrCodeImageBase64}" width="300" height="300" />
        <p>Scan this QR code during a medical emergency for secure access to my critical medical profile.</p>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Secure Emergency QR</h1>
      <p className="text-gray-600 mb-8">Generate and manage your emergency access QR code. First responders can scan this to view your critical medical history.</p>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading QR Status...</div>
      ) : !qrData || qrData.status === 'REVOKED' ? (
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Active QR Code</h2>
          <p className="text-gray-500 mb-6">You currently do not have an active Emergency QR code. Generate one now to protect yourself during emergencies.</p>
          <button onClick={() => handleAction(qrCodeService.generateQr)} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 font-medium">
            Generate Secure QR
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
            <div className="mb-4">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded">STATUS: ACTIVE</span>
            </div>
            <img src={qrData.qrCodeImageBase64} alt="Emergency QR Code" className="w-64 h-64 border p-2 rounded bg-white shadow-sm mb-6" />
            <div className="flex space-x-3 w-full">
              <button onClick={handlePrint} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded font-medium hover:bg-gray-200 border border-gray-300">
                Print
              </button>
              <a href={qrData.qrCodeImageBase64} download="MedVault_Emergency_QR.png" className="flex-1 text-center bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 border border-blue-600">
                Download
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Security Information</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start"><svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Contains NO personal identifiable information (PII).</li>
                <li className="flex items-start"><svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Connects securely to your Medical Emergency Profile via encrypted token.</li>
                <li className="flex items-start"><svg className="w-5 h-5 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Generated At: {new Date(qrData.generatedAt).toLocaleString()}</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 shadow-sm">
              <h3 className="text-lg font-bold text-red-800 mb-3">Danger Zone</h3>
              <p className="text-sm text-red-600 mb-4">If you lose your physical QR code, immediately revoke it to prevent unauthorized access, or generate a new secure token which automatically invalidates the old one.</p>
              <div className="flex space-x-4">
                <button onClick={() => { if(window.confirm('Regenerate QR code? The old code will stop working.')) handleAction(qrCodeService.regenerateQr) }} 
                  className="bg-white text-red-700 border border-red-300 px-4 py-2 rounded text-sm font-medium hover:bg-red-50">
                  Regenerate Token
                </button>
                <button onClick={() => { if(window.confirm('Revoke access? First responders will no longer be able to view your profile.')) handleAction(qrCodeService.revokeQr) }} 
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700">
                  Revoke Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
