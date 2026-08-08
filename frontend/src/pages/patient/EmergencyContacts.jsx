import { useState, useEffect } from 'react';
import { emergencyContactService } from '../../services/emergencyContactService';

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', relationship: '', phone: '', alternatePhone: '', isPrimary: false });
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
    setFormData({ name: '', relationship: '', phone: '', alternatePhone: '', isPrimary: false });
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

  if (loading) return <div className="p-6 text-center text-gray-500">Loading Contacts...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Emergency Contacts</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Add New Contact
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{editingId ? 'Edit Contact' : 'Add Contact'}</h2>
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                <input type="text" value={formData.relationship} onChange={e => setFormData({ ...formData, relationship: e.target.value })} required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alternate Phone (Optional)</label>
                <input type="text" value={formData.alternatePhone || ''} onChange={e => setFormData({ ...formData, alternatePhone: e.target.value })} 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" checked={formData.isPrimary} onChange={e => setFormData({ ...formData, isPrimary: e.target.checked })} 
                className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">Set as Primary Contact</label>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-700 hover:text-gray-900">Cancel</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">Save</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.length === 0 && !showForm && (
          <div className="col-span-full text-center p-8 bg-gray-50 border rounded-lg text-gray-500">
            No emergency contacts found. Please add one.
          </div>
        )}
        {contacts.map(contact => (
          <div key={contact.id} className={`bg-white p-6 rounded-lg shadow-sm border ${contact.isPrimary ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
                <p className="text-sm font-medium text-blue-600">{contact.relationship}</p>
              </div>
              {contact.isPrimary && <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Primary</span>}
            </div>
            <div className="space-y-1 mb-4 text-gray-600">
              <p>Phone: {contact.phone}</p>
              {contact.alternatePhone && <p>Alt: {contact.alternatePhone}</p>}
            </div>
            <div className="flex space-x-2 border-t pt-4">
              <button onClick={() => handleEdit(contact)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">Edit</button>
              <button onClick={() => handleDelete(contact.id)} className="text-sm text-red-600 hover:text-red-800 font-medium">Delete</button>
              {!contact.isPrimary && (
                <button onClick={() => handleSetPrimary(contact.id)} className="text-sm text-green-600 hover:text-green-800 font-medium ml-auto">
                  Make Primary
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
