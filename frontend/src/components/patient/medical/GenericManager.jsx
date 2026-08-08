import { useState } from 'react';

export default function GenericManager({ title, items, onAdd, onDelete, fields, renderItem }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(formData);
    setFormData({});
    setShowForm(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button onClick={() => setShowForm(!showForm)} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100">
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700">{f.label}</label>
                {f.type === 'select' ? (
                  <select required={f.required} onChange={e => setFormData({...formData, [f.name]: e.target.value})} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border bg-white">
                    <option value="">Select</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type || 'text'} required={f.required} onChange={e => setFormData({...formData, [f.name]: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">Save</button>
        </form>
      )}

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm italic border-dashed border-2 border-gray-200 p-4 rounded text-center">No {title.toLowerCase()} recorded.</p>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
              <div className="text-sm text-gray-600 space-y-1">
                {renderItem(item)}
              </div>
              <button onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
