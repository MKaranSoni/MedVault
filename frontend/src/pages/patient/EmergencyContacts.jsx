import { useState, useEffect } from 'react';
import { emergencyContactService } from '../../services/emergencyContactService';

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    alternatePhone: '',
    isPrimary: false
  });
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await emergencyContactService.getContacts();
      if (res.success) setContacts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      alternatePhone: '',
      isPrimary: false
    });
    setEditingId(null);
    setShowForm(false);
    setError(null);
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await emergencyContactService.deleteContact(id);
        fetchContacts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSetPrimary = async (id) => {
    try {
      await emergencyContactService.setPrimaryContact(id);
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingId) {
        await emergencyContactService.updateContact(editingId, formData);
      } else {
        await emergencyContactService.addContact(formData);
      }

      fetchContacts();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving contact');
    }
  };

  if (loading) {
    return (
      <div
        className="flex min-h-[70vh] w-full items-center justify-center bg-[#f5f9fc]"
        style={{
          width: 'calc(100vw - 260px)',
          marginLeft: 0
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
            <div className="absolute inset-[13px] animate-pulse rounded-full bg-blue-600" />
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              Loading emergency contacts
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Securing your medical information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full max-w-none overflow-x-hidden bg-[#f5f9fc] text-slate-800"
      style={{
        width: 'calc(100vw - 260px)'
      }}
    >

      {/* =========================================================
          MEDICAL BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Medical grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Soft medical atmosphere */}
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-200/20 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-teal-200/20 blur-3xl" />

        {/* Soft emergency red glow */}
        <div className="absolute right-[15%] top-[30%] h-72 w-72 rounded-full bg-red-100/20 blur-3xl" />

        {/* Floating medical crosses */}
        <div className="medical-cross cross-one">+</div>
        <div className="medical-cross cross-two">+</div>
        <div className="medical-cross cross-three">+</div>
        <div className="medical-cross cross-four">+</div>

        {/* Floating medical circles */}
        <div className="medical-orb orb-one" />
        <div className="medical-orb orb-two" />
        <div className="medical-orb orb-three" />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative w-full px-5 py-7 sm:px-7 lg:px-10 xl:px-12 2xl:px-14">

        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="mb-8 w-full">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              {/* Medical icon */}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-[0_8px_30px_rgba(37,99,235,0.10)]">

                <div className="absolute inset-2 rounded-xl bg-blue-50" />

                <svg
                  className="relative h-7 w-7 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
                  <path d="M8.5 9.8h2l1.1-2.4 1.8 5 1.1-2.6h1.2" />
                </svg>

                <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <div>

                <div className="mb-1 flex items-center gap-2">

                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                    Medical Safety
                  </span>

                  <span className="h-1 w-1 rounded-full bg-slate-300" />

                  <span className="text-[11px] font-medium text-emerald-600">
                    Protected
                  </span>

                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  Emergency Contacts
                </h1>

                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  Keep trusted contacts ready for urgent medical situations.
                </p>

              </div>
            </div>

            {/* Existing button */}
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_28px_rgba(37,99,235,0.28)] active:translate-y-0"
            >
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

              Add New Contact
            </button>

          </div>

          {/* =====================================================
              MEDICAL PULSE MONITOR
          ===================================================== */}

          <div className="mt-6 h-11 w-full overflow-hidden rounded-xl border border-blue-100 bg-white/85 shadow-sm backdrop-blur">

            <div className="flex h-full items-center">

              <div className="flex h-full shrink-0 items-center gap-2 border-r border-blue-100 bg-blue-50/70 px-4">

                <span className="relative flex h-2.5 w-2.5">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />

                </span>

                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  Emergency Network
                </span>

              </div>

              <div className="relative h-full flex-1 overflow-hidden">

                <svg
                  className="absolute left-0 top-1/2 h-8 w-full -translate-y-1/2 text-blue-300"
                  viewBox="0 0 800 40"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 20 H120 L135 20 L145 9 L157 32 L169 20 H250 L270 20 L282 15 L292 20 H365 L380 20 L392 5 L404 35 L416 20 H500 L520 20 L532 13 L542 20 H620 L640 20 L652 8 L664 31 L676 20 H800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

              </div>

              <div className="hidden px-5 text-[10px] font-medium text-slate-400 sm:block">
                CONTACTS READY
              </div>

            </div>
          </div>

        </div>

        {/* =======================================================
            FORM
        ======================================================= */}

        {showForm && (
          <div className="mb-8 animate-[fadeIn_.35s_ease-out]">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.07)]">

              <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/80 to-white px-5 py-4 sm:px-6">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s-7-4.4-7-10.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 2.5C19 16.6 12 21 12 21Z" />
                    <path d="M12 11v5M9.5 13.5h5" />
                  </svg>

                </div>

                <div>

                  <h2 className="text-base font-bold text-slate-900">
                    {editingId ? 'Edit Contact' : 'Add Contact'}
                  </h2>

                  <p className="text-xs text-slate-500">
                    Keep emergency information accurate and accessible.
                  </p>

                </div>

              </div>

              <div className="p-5 sm:p-6">

                {error && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm text-red-700 animate-[fadeIn_.25s_ease-out]">

                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>

                    <span>{error}</span>

                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Name */}
                    <div>

                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Full Name
                      </label>

                      <div className="relative">

                        <svg
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle cx="12" cy="8" r="3" />
                          <path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
                        </svg>

                        <input
                          type="text"
                          value={formData.name}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              name: e.target.value
                            })
                          }
                          required
                          placeholder="Enter contact name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                        />

                      </div>

                    </div>

                    {/* Relationship */}
                    <div>

                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Relationship
                      </label>

                      <div className="relative">

                        <svg
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M16 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                          <circle cx="9.5" cy="7" r="3" />
                          <path d="M17 11a3 3 0 1 0-1-5.8" />
                          <path d="M21 20v-2a4 4 0 0 0-2.8-3.8" />
                        </svg>

                        <input
                          type="text"
                          value={formData.relationship}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              relationship: e.target.value
                            })
                          }
                          required
                          placeholder="e.g. Father, Mother, Friend"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                        />

                      </div>

                    </div>

                    {/* Phone */}
                    <div>

                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Primary Phone
                      </label>

                      <div className="relative">

                        <svg
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M6.6 3.5 9 3l2 4-2 1.5a15 15 0 0 0 6.5 6.5L17 13l4 2-.5 2.4a3 3 0 0 1-3.3 2.3C10.4 18.8 5.2 13.6 4.3 6.8A3 3 0 0 1 6.6 3.5Z" />
                        </svg>

                        <input
                          type="text"
                          value={formData.phone}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              phone: e.target.value
                            })
                          }
                          required
                          placeholder="Enter phone number"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                        />

                      </div>

                    </div>

                    {/* Alternate Phone */}
                    <div>

                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Alternate Phone
                        <span className="ml-1 font-medium normal-case tracking-normal text-slate-400">
                          (optional)
                        </span>
                      </label>

                      <div className="relative">

                        <svg
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M6.6 3.5 9 3l2 4-2 1.5a15 15 0 0 0 6.5 6.5L17 13l4 2-.5 2.4a3 3 0 0 1-3.3 2.3C10.4 18.8 5.2 13.6 4.3 6.8A3 3 0 0 1 6.6 3.5Z" />
                        </svg>

                        <input
                          type="text"
                          value={formData.alternatePhone || ''}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              alternatePhone: e.target.value
                            })
                          }
                          placeholder="Backup phone number"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                        />

                      </div>

                    </div>

                  </div>

                  {/* Primary */}
                  <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 transition-colors hover:bg-blue-50">

                    <input
                      type="checkbox"
                      checked={formData.isPrimary}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          isPrimary: e.target.checked
                        })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                    />

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        Set as Primary Contact
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Mark this person as your main emergency contact.
                      </p>

                    </div>

                  </label>

                  {/* Actions */}
                  <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-[0_9px_22px_rgba(16,185,129,0.24)] active:translate-y-0"
                    >
                      {editingId ? 'Update Contact' : 'Save Contact'}
                    </button>

                  </div>

                </form>

              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            CONTACT CARDS
        ======================================================= */}

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

          {contacts.length === 0 && !showForm && (
            <div className="col-span-full flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">

                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
                  <path d="M12 8.5v5M9.5 11h5" />
                </svg>

              </div>

              <h3 className="text-base font-bold text-slate-800">
                No emergency contacts yet
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Add a trusted person so their details are available when you
                need them most.
              </p>

            </div>
          )}

          {contacts.map((contact, index) => (

            <div
              key={contact.id}
              className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 ${
                contact.isPrimary
                  ? 'border-blue-300 shadow-[0_12px_35px_rgba(37,99,235,0.13)]'
                  : 'border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.05)] hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)]'
              }`}
              style={{
                animation: `cardIn .4s ease-out ${index * 70}ms both`
              }}
            >

              {/* Status strip */}
              <div
                className={`h-1 w-full transition-colors ${
                  contact.isPrimary
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400'
                    : 'bg-slate-100 group-hover:bg-blue-100'
                }`}
              />

              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        contact.isPrimary
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {contact.name
                        ?.split(' ')
                        .map(word => word[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-base font-bold text-slate-900">
                        {contact.name}
                      </h3>

                      <p className="mt-0.5 text-xs font-semibold text-blue-600">
                        {contact.relationship}
                      </p>

                    </div>

                  </div>

                  {contact.isPrimary && (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">

                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />

                      Primary

                    </span>
                  )}

                </div>

                {/* Contact details */}
                <div className="mt-5 space-y-2.5">

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">

                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M6.6 3.5 9 3l2 4-2 1.5a15 15 0 0 0 6.5 6.5L17 13l4 2-.5 2.4a3 3 0 0 1-3.3 2.3C10.4 18.8 5.2 13.6 4.3 6.8A3 3 0 0 1 6.6 3.5Z" />
                      </svg>

                    </div>

                    <div className="min-w-0">

                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Primary phone
                      </p>

                      <p className="truncate text-sm font-semibold text-slate-700">
                        {contact.phone}
                      </p>

                    </div>

                  </div>

                  {contact.alternatePhone && (
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">

                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M6.6 3.5 9 3l2 4-2 1.5a15 15 0 0 0 6.5 6.5L17 13l4 2-.5 2.4a3 3 0 0 1-3.3 2.3C10.4 18.8 5.2 13.6 4.3 6.8A3 3 0 0 1 6.6 3.5Z" />
                        </svg>

                      </div>

                      <div className="min-w-0">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Alternate phone
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {contact.alternatePhone}
                        </p>

                      </div>

                    </div>
                  )}

                </div>

                {/* Existing actions */}
                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">

                  <button
                    onClick={() => handleEdit(contact)}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>

                  {!contact.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(contact.id)}
                      className="ml-auto rounded-lg px-2.5 py-1.5 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      Make Primary
                    </button>
                  )}

                </div>

              </div>

              {/* Medical decoration */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full border-[10px] border-blue-50/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            </div>

          ))}

        </div>

      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes medicalFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(12px, -18px, 0) rotate(5deg);
          }

          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        @keyframes medicalFloatReverse {
          0% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-15px, 12px, 0);
          }

          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .medical-cross {
          position: absolute;
          font-size: 34px;
          font-weight: 300;
          opacity: 0.06;
          user-select: none;
          animation: medicalFloat 8s ease-in-out infinite;
        }

        .cross-one {
          left: 8%;
          top: 22%;
          color: #2563eb;
        }

        .cross-two {
          right: 11%;
          top: 38%;
          color: #ef4444;
          animation-delay: -3s;
          animation-duration: 10s;
        }

        .cross-three {
          right: 24%;
          bottom: 15%;
          color: #14b8a6;
          animation-delay: -5s;
          animation-duration: 9s;
        }

        .cross-four {
          left: 42%;
          bottom: 9%;
          color: #2563eb;
          animation-delay: -2s;
          animation-duration: 11s;
        }

        .medical-orb {
          position: absolute;
          border-radius: 9999px;
          border: 1px solid currentColor;
          opacity: 0.08;
          animation: medicalFloatReverse 9s ease-in-out infinite;
        }

        .orb-one {
          width: 70px;
          height: 70px;
          right: 7%;
          top: 18%;
          color: #2563eb;
        }

        .orb-two {
          width: 45px;
          height: 45px;
          left: 28%;
          top: 52%;
          color: #14b8a6;
          animation-delay: -4s;
        }

        .orb-three {
          width: 90px;
          height: 90px;
          right: 30%;
          bottom: 8%;
          color: #ef4444;
          animation-delay: -6s;
        }

        @media (prefers-reduced-motion: reduce) {
          .medical-cross,
          .medical-orb {
            animation: none;
          }
        }

        @media (max-width: 1024px) {
          .medical-cross,
          .medical-orb {
            opacity: 0.035;
          }
        }

        @media (max-width: 640px) {
          .medical-cross,
          .medical-orb {
            display: none;
          }
        }

      `}</style>

    </div>
  );
}
