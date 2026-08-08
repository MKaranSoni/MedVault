export default function MedicalInfoCard({ title, data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">{title}</h3>
      {Array.isArray(data) ? (
        <ul className="list-disc list-inside text-gray-600">
          {data.length > 0 ? data.map((item, index) => <li key={index}>{item}</li>) : <li>No data recorded</li>}
        </ul>
      ) : (
        <p className="text-gray-600">{data || 'No data recorded'}</p>
      )}
    </div>
  );
}
