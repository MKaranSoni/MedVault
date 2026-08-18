import { useState, useEffect } from 'react';
import { medicalReportService } from '../../services/medicalReportService';

const REPORT_TYPES = [
  'Prescription',
  'Blood Report',
  'Urine Report',
  'ECG',
  'X-Ray',
  'MRI',
  'CT Scan',
  'Ultrasound',
  'Medical Certificate',
  'Vaccination Record',
  'Hospital Discharge Summary',
  'Other'
];

export default function MedicalReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');

  const [showUpload, setShowUpload] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const [formData, setFormData] = useState({
    reportTitle: '',
    reportType: '',
    description: '',
    hospitalName: '',
    doctorName: '',
    reportDate: ''
  });

  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await medicalReportService.getReports(filterType, search);

      if (res.success) {
        setReports(res.data || []);
      }
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
    setFormData({
      reportTitle: '',
      reportType: '',
      description: '',
      hospitalName: '',
      doctorName: '',
      reportDate: ''
    });

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
          if (formData[key]) {
            data.append(key, formData[key]);
          }
        });

        await medicalReportService.uploadReport(data);
      }

      fetchReports();
      resetForm();
    } catch (err) {
      setFormError(
        err.response?.data?.message || 'Error saving report'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this report? This action cannot be undone.'
      )
    ) {
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

  const getReportIcon = (type) => {
    const icons = {
      'Prescription': 'Rx',
      'Blood Report': 'BL',
      'Urine Report': 'UR',
      'ECG': '♥',
      'X-Ray': 'XR',
      'MRI': 'MR',
      'CT Scan': 'CT',
      'Ultrasound': 'US',
      'Medical Certificate': 'MC',
      'Vaccination Record': 'VC',
      'Hospital Discharge Summary': 'DS',
      'Other': 'DOC'
    };

    return icons[type] || 'DOC';
  };

  const getReportAccent = (type) => {
    if (type === 'Blood Report' || type === 'Urine Report') {
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-600',
        border: 'border-rose-100',
        glow: 'shadow-rose-100'
      };
    }

    if (type === 'ECG') {
      return {
        bg: 'bg-red-50',
        text: 'text-red-500',
        border: 'border-red-100',
        glow: 'shadow-red-100'
      };
    }

    if (
      type === 'X-Ray' ||
      type === 'MRI' ||
      type === 'CT Scan' ||
      type === 'Ultrasound'
    ) {
      return {
        bg: 'bg-cyan-50',
        text: 'text-cyan-600',
        border: 'border-cyan-100',
        glow: 'shadow-cyan-100'
      };
    }

    if (
      type === 'Prescription' ||
      type === 'Medical Certificate'
    ) {
      return {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        border: 'border-indigo-100',
        glow: 'shadow-indigo-100'
      };
    }

    return {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      glow: 'shadow-blue-100'
    };
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f4f8fb] text-slate-800">

      {/* =========================================================
          MEDICAL BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Medical grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />

        {/* Soft clinical glow */}
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-300/10 blur-3xl" />

        {/* Floating medical circles */}
        <div className="absolute left-[8%] top-[25%] h-3 w-3 rounded-full bg-blue-300/40 animate-float-slow" />

        <div className="absolute right-[13%] top-[42%] h-2 w-2 rounded-full bg-red-300/50 animate-float" />

        <div className="absolute left-[18%] bottom-[18%] h-2 w-2 rounded-full bg-cyan-400/40 animate-float-delay" />

        {/* ECG line */}
        <svg
          className="absolute left-0 top-[18%] h-24 w-full opacity-[0.06]"
          viewBox="0 0 1400 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 52
               H180
               L210 52
               L225 42
               L240 52
               L255 52
               L275 15
               L292 84
               L310 52
               H470
               L500 52
               L520 35
               L535 52
               H680
               L710 52
               L730 18
               L748 80
               L765 52
               H920
               L950 52
               L965 43
               L980 52
               H1120
               L1145 52
               L1160 28
               L1178 75
               L1195 52
               H1400"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
          />
        </svg>

        {/* Medical cross */}
        <div className="absolute right-[7%] top-[17%] opacity-[0.035] animate-medical-float">
          <div className="relative h-28 w-28">
            <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 rounded-full bg-blue-600" />
            <div className="absolute left-0 top-1/2 h-7 w-full -translate-y-1/2 rounded-full bg-blue-600" />
          </div>
        </div>

        {/* Document outline */}
        <div className="absolute left-[3%] top-[58%] opacity-[0.025] rotate-[-12deg] animate-document-float">
          <div className="h-40 w-32 rounded-2xl border-[5px] border-blue-600" />
        </div>
      </div>


      {/* =========================================================
          MAIN WORKSPACE
      ========================================================== */}

      <main className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="relative mb-7 overflow-hidden rounded-[28px] border border-white bg-white/80 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl">

          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50/70 to-transparent" />

          <div className="relative flex flex-col gap-6 px-6 py-7 lg:flex-row lg:items-center lg:justify-between xl:px-8">

            <div className="flex items-start gap-4">

              {/* Medical document icon */}
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-sm">

                <div className="absolute inset-2 rounded-xl border border-blue-100/80" />

                <svg
                  className="relative h-8 w-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h9l4 4v14H6z" />
                  <path d="M15 3v5h5" />
                  <path d="M9 13h6" />
                  <path d="M9 17h4" />
                  <path d="M9 9h2" />
                </svg>

                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>


              <div>

                <div className="mb-1.5 flex items-center gap-2">

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                    Medical Records
                  </span>

                  <span className="h-1 w-1 rounded-full bg-slate-300" />

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                    Secure Vault
                  </span>

                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Medical Reports
                </h1>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                  Your clinical documents, test results and medical records,
                  organized in one secure workspace.
                </p>

              </div>

            </div>


            {/* Existing button */}
            <button
              onClick={() => {
                resetForm();
                setShowUpload(true);
              }}
              className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_14px_30px_rgba(37,99,235,0.28)] active:translate-y-0"
            >

              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15">

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>

              </span>

              Upload New Report

            </button>

          </div>


          {/* Bottom clinical status bar */}
          <div className="flex items-center gap-4 border-t border-slate-100 bg-slate-50/60 px-6 py-2.5 xl:px-8">

            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              Medical vault active

            </span>

            <span className="hidden h-3 w-px bg-slate-200 sm:block" />

            <span className="hidden text-[10px] font-medium text-slate-400 sm:block">
              DOCUMENT STORAGE
            </span>

            <div className="ml-auto hidden items-center gap-2 text-[10px] font-semibold text-slate-400 sm:flex">
              <span>PDF</span>
              <span>•</span>
              <span>PNG</span>
              <span>•</span>
              <span>JPG</span>
            </div>

          </div>

        </section>


        {/* =====================================================
            UPLOAD / EDIT PANEL
        ====================================================== */}

        {showUpload && (

          <section className="mb-7 animate-[panelIn_.4s_ease-out]">

            <div className="overflow-hidden rounded-[26px] border border-blue-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">

              {/* Form header */}
              <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 px-6 py-5">

                <div className="absolute -right-8 -top-16 h-40 w-40 rounded-full border-[18px] border-blue-100/50" />

                <div className="relative flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">

                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 16V4" />
                      <path d="m7 9 5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-slate-900">
                      {editingReport
                        ? 'Edit Report Information'
                        : 'Upload Medical Report'}
                    </h2>

                    <p className="text-xs text-slate-500">
                      Add clinical details to keep your medical history organized.
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-6 lg:p-8">

                {formError && (

                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">

                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                      !
                    </div>

                    <span>{formError}</span>

                  </div>

                )}


                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                    {/* Report title */}
                    <div>

                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Report Title *
                      </label>

                      <input
                        type="text"
                        value={formData.reportTitle}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            reportTitle: e.target.value
                          })
                        }
                        required
                        placeholder="e.g. Complete Blood Count"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />

                    </div>


                    {/* Type */}
                    <div>

                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Report Type *
                      </label>

                      <select
                        value={formData.reportType}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            reportType: e.target.value
                          })
                        }
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      >

                        <option value="">Select Type</option>

                        {REPORT_TYPES.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}

                      </select>

                    </div>


                    {/* Hospital */}
                    <div>

                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Hospital / Lab Name
                      </label>

                      <input
                        type="text"
                        value={formData.hospitalName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            hospitalName: e.target.value
                          })
                        }
                        placeholder="Hospital or diagnostic lab"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />

                    </div>


                    {/* Doctor */}
                    <div>

                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Doctor Name
                      </label>

                      <input
                        type="text"
                        value={formData.doctorName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            doctorName: e.target.value
                          })
                        }
                        placeholder="Attending doctor"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />

                    </div>


                    {/* Date */}
                    <div>

                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Report Date
                      </label>

                      <input
                        type="date"
                        value={formData.reportDate}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            reportDate: e.target.value
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />

                    </div>


                    {/* File */}
                    {!editingReport && (

                      <div>

                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Medical File *
                        </label>

                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2 text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-100 file:px-3 file:py-2 file:text-xs file:font-bold file:text-blue-700 hover:file:bg-blue-200"
                        />

                        <p className="mt-1 text-[10px] text-slate-400">
                          PDF, PNG or JPG • Maximum 10MB
                        </p>

                      </div>

                    )}


                    {/* Description */}
                    <div className="md:col-span-2 lg:col-span-3">

                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Description
                      </label>

                      <textarea
                        value={formData.description}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            description: e.target.value
                          })
                        }
                        rows="3"
                        placeholder="Add any useful clinical notes about this document..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />

                    </div>

                  </div>


                  <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting
                        ? 'Saving...'
                        : editingReport
                          ? 'Save Changes'
                          : 'Upload'}
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </section>

        )}


        {/* =====================================================
            SEARCH / FILTER DESK
        ====================================================== */}

        <section className="mb-7 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">

          <div className="relative">

            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              placeholder="Search medical reports, hospitals, doctors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm shadow-[0_8px_25px_rgba(15,23,42,0.04)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />

          </div>


          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-600 shadow-[0_8px_25px_rgba(15,23,42,0.04)] outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          >

            <option value="">All Report Types</option>

            {REPORT_TYPES.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}

          </select>

        </section>


        {/* =====================================================
            REPORT AREA
        ====================================================== */}

        {loading ? (

          <section className="flex min-h-[360px] items-center justify-center rounded-[28px] border border-white bg-white/80 shadow-sm">

            <div className="flex flex-col items-center">

              <div className="relative h-16 w-16">

                <div className="absolute inset-0 rounded-full border-4 border-blue-100" />

                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />

                <div className="absolute inset-[19px] rounded-full bg-blue-600 animate-pulse" />

              </div>

              <p className="mt-5 text-sm font-bold text-slate-700">
                Loading medical records
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Retrieving your secure documents...
              </p>

            </div>

          </section>

        ) : reports.length === 0 ? (

          <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-slate-200 bg-white/70">

            <div className="absolute left-10 top-10 h-24 w-24 rounded-full border-[10px] border-blue-50" />

            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full border-[12px] border-cyan-50" />

            <div className="relative z-10 max-w-md px-6 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-500 shadow-inner">

                <svg
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 3h9l4 4v14H6z" />
                  <path d="M15 3v5h5" />
                  <path d="M9 13h6" />
                  <path d="M9 17h4" />
                </svg>

              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                No medical reports found
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your clinical documents will appear here once uploaded.
                Keep your reports organized and accessible from one place.
              </p>

            </div>

          </section>

        ) : (

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {reports.map((report, index) => {

              const accent = getReportAccent(report.reportType);

              return (

                <article
                  key={report.id}
                  className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.045)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
                  style={{
                    animation: `cardIn .45s ease-out ${index * 70}ms both`
                  }}
                >

                  {/* Top medical line */}
                  <div className={`h-1 w-full bg-gradient-to-r ${
                    report.reportType === 'ECG'
                      ? 'from-red-400 via-rose-500 to-red-300'
                      : 'from-blue-500 via-cyan-400 to-emerald-400'
                  }`} />


                  <div className="relative flex flex-1 flex-col p-5">

                    {/* Decorative document watermark */}
                    <div className="pointer-events-none absolute -right-8 -top-8 opacity-[0.035] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">

                      <svg
                        className="h-32 w-32"
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <rect x="18" y="10" width="64" height="80" rx="8" />
                        <path d="M32 35h36M32 50h36M32 65h24" />
                      </svg>

                    </div>


                    {/* Icon + Type */}
                    <div className="relative flex items-start justify-between">

                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${accent.border} ${accent.bg} ${accent.text} text-xs font-black shadow-sm transition-transform duration-300 group-hover:scale-105`}>

                        {report.reportType === 'ECG' ? (

                          <svg
                            className="h-7 w-7"
                            viewBox="0 0 32 32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 17h7l3-8 5 15 4-10 3 3h8" />
                          </svg>

                        ) : (

                          getReportIcon(report.reportType)

                        )}

                      </div>


                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${accent.bg} ${accent.border} ${accent.text}`}>
                        {report.reportType}
                      </span>

                    </div>


                    {/* Title */}
                    <div className="relative mt-5">

                      <h3 className="line-clamp-2 min-h-[48px] text-lg font-bold leading-6 text-slate-900">
                        {report.reportTitle}
                      </h3>

                    </div>


                    {/* Metadata */}
                    <div className="mt-5 space-y-2.5">

                      {report.hospitalName && (

                        <div className="flex items-center gap-2.5 text-xs">

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">

                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                            >
                              <path d="M3 21h18" />
                              <path d="M5 21V6l7-3 7 3v15" />
                              <path d="M9 9h1M14 9h1M9 13h1M14 13h1" />
                            </svg>

                          </div>

                          <span className="truncate font-semibold text-slate-700">
                            {report.hospitalName}
                          </span>

                        </div>

                      )}


                      {report.doctorName && (

                        <div className="flex items-center gap-2.5 text-xs">

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">

                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                            >
                              <circle cx="12" cy="8" r="3" />
                              <path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
                            </svg>

                          </div>

                          <span className="truncate text-slate-600">
                            Dr. {report.doctorName}
                          </span>

                        </div>

                      )}


                      <div className="flex items-center gap-2.5 text-xs">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">

                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          >
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M8 3v4M16 3v4M4 10h16" />
                          </svg>

                        </div>

                        <span className="text-slate-500">
                          {report.reportDate ||
                            new Date(report.createdAt).toLocaleDateString()}
                        </span>

                      </div>

                    </div>


                    {/* Description */}
                    {report.description && (

                      <p className="mt-4 line-clamp-2 text-xs leading-5 text-slate-400">
                        {report.description}
                      </p>

                    )}

                  </div>


                  {/* Actions */}
                  <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3.5">

                    <a
                      href={report.cloudinaryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
                    >

                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>

                      View

                    </a>


                    <button
                      onClick={() => openEdit(report)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Edit
                    </button>


                    <button
                      onClick={() => handleDelete(report.id)}
                      className="rounded-lg px-2.5 py-2 text-xs font-bold text-red-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </article>

              );
            })}

          </section>

        )}

      </main>


      {/* =========================================================
          ANIMATIONS
      ========================================================== */}

      <style>{`

        @keyframes cardIn {

          from {
            opacity: 0;
            transform: translateY(18px) scale(.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }


        @keyframes panelIn {

          from {
            opacity: 0;
            transform: translateY(-12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        @keyframes float {

          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-18px);
          }

        }


        @keyframes floatSlow {

          0%, 100% {
            transform: translateY(0) translateX(0);
          }

          50% {
            transform: translateY(-25px) translateX(10px);
          }

        }


        @keyframes medicalFloat {

          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-18px) rotate(5deg);
          }

        }


        @keyframes documentFloat {

          0%, 100% {
            transform: translateY(0) rotate(-12deg);
          }

          50% {
            transform: translateY(-14px) rotate(-7deg);
          }

        }


        .animate-float {
          animation: float 5s ease-in-out infinite;
        }


        .animate-float-slow {
          animation: floatSlow 7s ease-in-out infinite;
        }


        .animate-float-delay {
          animation: float 6s ease-in-out 1.5s infinite;
        }


        .animate-medical-float {
          animation: medicalFloat 8s ease-in-out infinite;
        }


        .animate-document-float {
          animation: documentFloat 9s ease-in-out infinite;
        }

      `}</style>

    </div>
  );
}
