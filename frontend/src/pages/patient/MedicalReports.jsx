import { useState, useEffect } from 'react';
import { medicalReportService } from '../../services/medicalReportService';

const REPORT_TYPES = [
  'Prescription', 'Blood Report', 'Urine Report', 'ECG', 'X-Ray', 
  'MRI', 'CT Scan', 'Ultrasound', 'Medical Certificate', 
  'Vaccination Record', 'Hospital Discharge Summary', 'Other'
];

export default function MedicalReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');
  
  const [showUpload, setShowUpload] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  
  // Upload/Edit Form State
  const [formData, setFormData] = useState({ reportTitle: '', reportType: '', description: '', hospitalName: '', doctorName: '', reportDate: '' });
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await medicalReportService.getReports(filterType, search);
      if (res.success) setReports(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchReports();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [filterType, search]);

  const resetForm = () => {
    setFormData({ reportTitle: '', reportType: '', description: '', hospitalName: '', doctorName: '', reportDate: '' });
    setFile(null);
    setFormError(null);
    setEditingReport(null);
    setShowUpload(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 10 * 1024 * 1024) {
        setFormError('File size exceeds 10MB limit');
        return;
      }
      setFile(selected);
      setFormError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      if (editingReport) {
        await medicalReportService.updateReport(editingReport.id, formData);
      } else {
        if (!file) {
          setFormError('Please select a file to upload');
          setIsSubmitting(false);
          return;
        }
        const data = new FormData();
        data.append('file', file);
        Object.keys(formData).forEach(key => {
          if (formData[key]) data.append(key, formData[key]);
        });
        await medicalReportService.uploadReport(data);
      }
      fetchReports();
      resetForm();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error saving report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      try {
        await medicalReportService.deleteReport(id);
        fetchReports();
      } catch (e) {
        console.error(e);
        alert('Failed to delete report');
      }
    }
  };

  const openEdit = (report) => {
    setFormData({
      reportTitle: report.reportTitle,
      reportType: report.reportType,
      description: report.description || '',
      hospitalName: report.hospitalName || '',
      doctorName: report.doctorName || '',
      reportDate: report.reportDate || ''
    });
    setEditingReport(report);
    setShowUpload(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Medical Reports</h1>
        <button onClick={() => {resetForm(); setShowUpload(true);}} className="bg-blue-600 text-white px-5 py-2.5 rounded shadow hover:bg-blue-700 transition">
          Upload New Report
        </button>
      </div>

      {showUpload && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{editingReport ? 'Edit Report Info' : 'Upload Medical Report'}</h2>
          {formError && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{formError}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Report Title *</label>
                <input type="text" value={formData.reportTitle} onChange={e => setFormData({...formData, reportTitle: e.target.value})} required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Report Type *</label>
                <select value={formData.reportType} onChange={e => setFormData({...formData, reportType: e.target.value})} required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border bg-white">
                  <option value="">Select Type</option>
                  {REPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hospital / Lab Name</label>
                <input type="text" value={formData.hospitalName} onChange={e => setFormData({...formData, hospitalName: e.target.value})} 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
                <input type="text" value={formData.doctorName} onChange={e => setFormData({...formData, doctorName: e.target.value})} 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Report Date</label>
                <input type="date" value={formData.reportDate} onChange={e => setFormData({...formData, reportDate: e.target.value})} 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              {!editingReport && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">File (PDF, PNG, JPG) * Max 10MB</label>
                  <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} required
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border p-1 rounded-md" />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="2"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-700 hover:text-gray-900">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 disabled:opacity-50">
                {isSubmitting ? 'Saving...' : (editingReport ? 'Save Changes' : 'Upload')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)}
          className="flex-grow border-gray-300 rounded-md shadow-sm p-2 border" />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full md:w-64 border-gray-300 rounded-md shadow-sm p-2 border bg-white">
          <option value="">All Types</option>
          {REPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-center p-8 text-gray-500">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg border text-gray-500">
          No reports found. Upload your first medical document.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reports.map(report => (
            <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col transition hover:shadow-md">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{report.reportTitle}</h3>
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium whitespace-nowrap ml-2">
                    {report.reportType}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  {report.hospitalName && <p className="font-medium text-gray-900">{report.hospitalName}</p>}
                  {report.doctorName && <p>Dr. {report.doctorName}</p>}
                  <p>Date: {report.reportDate || new Date(report.createdAt).toLocaleDateString()}</p>
                </div>
                {report.description && <p className="text-sm text-gray-500 line-clamp-2">{report.description}</p>}
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center gap-2">
                <div className="flex space-x-2">
                  <a href={report.cloudinaryUrl} target="_blank" rel="noreferrer" className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition">
                    View
                  </a>
                  <button onClick={() => openEdit(report)} className="text-sm bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50 transition">
                    Edit
                  </button>
                </div>
                <button onClick={() => handleDelete(report.id)} className="text-sm text-red-600 hover:text-red-800 font-medium px-2 py-1.5">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
