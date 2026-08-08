export default function ProfileCompletion({ profile }) {
  if (!profile) return null;

  const fields = ['phone', 'dateOfBirth', 'gender', 'bloodGroup', 'height', 'weight'];
  const filledFields = fields.filter(field => profile[field]);
  const percentage = Math.round((filledFields.length / fields.length) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Profile Completion</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-sm text-gray-600">{percentage}% Complete</p>
    </div>
  );
}
