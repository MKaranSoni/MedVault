import { useState, useEffect } from 'react';
import { medicalRecordService } from '../../services/medicalRecordService';
import GenericManager from '../../components/patient/medical/GenericManager';

export default function MedicalHistory() {
  const [data, setData] = useState({ allergies: [], diseases: [], medications: [], surgeries: [], immunizations: [], familyHistories: [] });
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const [al, di, me, su, im, fa] = await Promise.all([
        medicalRecordService.getAllergies(),
        medicalRecordService.getDiseases(),
        medicalRecordService.getMedications(),
        medicalRecordService.getSurgeries(),
        medicalRecordService.getImmunizations(),
        medicalRecordService.getFamilyHistories()
      ]);
      setData({
        allergies: al.data || [],
        diseases: di.data || [],
        medications: me.data || [],
        surgeries: su.data || [],
        immunizations: im.data || [],
        familyHistories: fa.data || []
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAdd = (type, serviceCall) => async (formData) => {
    try { await serviceCall(formData); fetchAll(); } catch (e) { console.error(e); }
  };
  const handleDelete = (type, serviceCall) => async (id) => {
    if(window.confirm('Delete this record?')) { try { await serviceCall(id); fetchAll(); } catch (e) { console.error(e); } }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading Medical Records...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Medical Information</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <GenericManager title="Allergies" items={data.allergies}
          onAdd={handleAdd('allergies', medicalRecordService.addAllergy)}
          onDelete={handleDelete('allergies', medicalRecordService.deleteAllergy)}
          fields={[
            { name: 'allergyType', label: 'Type', type: 'select', options: ['Drug', 'Food', 'Other'], required: true },
            { name: 'name', label: 'Name', required: true },
            { name: 'severity', label: 'Severity', type: 'select', options: ['Mild', 'Moderate', 'Severe'] },
            { name: 'notes', label: 'Notes' }
          ]}
          renderItem={item => (
            <>
              <p><strong className="text-gray-900">{item.name}</strong> ({item.allergyType})</p>
              {item.severity && <p>Severity: {item.severity}</p>}
              {item.notes && <p className="italic">{item.notes}</p>}
            </>
          )}
        />

        <GenericManager title="Chronic Diseases" items={data.diseases}
          onAdd={handleAdd('diseases', medicalRecordService.addDisease)}
          onDelete={handleDelete('diseases', medicalRecordService.deleteDisease)}
          fields={[{ name: 'diseaseName', label: 'Disease Name', required: true }]}
          renderItem={item => <p><strong className="text-gray-900">{item.diseaseName}</strong></p>}
        />

        <GenericManager title="Current Medications" items={data.medications}
          onAdd={handleAdd('medications', medicalRecordService.addMedication)}
          onDelete={handleDelete('medications', medicalRecordService.deleteMedication)}
          fields={[
            { name: 'medicineName', label: 'Medicine Name', required: true },
            { name: 'dosage', label: 'Dosage', required: true },
            { name: 'frequency', label: 'Frequency' },
            { name: 'duration', label: 'Duration' },
            { name: 'prescribingDoctor', label: 'Prescribing Doctor' },
            { name: 'notes', label: 'Notes' }
          ]}
          renderItem={item => (
            <>
              <p><strong className="text-gray-900">{item.medicineName}</strong> - {item.dosage}</p>
              <p>Frequency: {item.frequency} | Duration: {item.duration}</p>
              {item.prescribingDoctor && <p>Doctor: {item.prescribingDoctor}</p>}
            </>
          )}
        />

        <GenericManager title="Previous Surgeries" items={data.surgeries}
          onAdd={handleAdd('surgeries', medicalRecordService.addSurgery)}
          onDelete={handleDelete('surgeries', medicalRecordService.deleteSurgery)}
          fields={[
            { name: 'surgeryName', label: 'Surgery Name', required: true },
            { name: 'hospital', label: 'Hospital' },
            { name: 'surgeryDate', label: 'Date', type: 'date' },
            { name: 'outcome', label: 'Outcome' }
          ]}
          renderItem={item => (
            <>
              <p><strong className="text-gray-900">{item.surgeryName}</strong></p>
              <p>Hospital: {item.hospital} | Date: {item.surgeryDate}</p>
              {item.outcome && <p>Outcome: {item.outcome}</p>}
            </>
          )}
        />

        <GenericManager title="Immunizations" items={data.immunizations}
          onAdd={handleAdd('immunizations', medicalRecordService.addImmunization)}
          onDelete={handleDelete('immunizations', medicalRecordService.deleteImmunization)}
          fields={[
            { name: 'vaccineName', label: 'Vaccine Name', required: true },
            { name: 'dateAdministered', label: 'Date', type: 'date' },
            { name: 'boosterStatus', label: 'Booster Status' }
          ]}
          renderItem={item => (
            <>
              <p><strong className="text-gray-900">{item.vaccineName}</strong></p>
              <p>Date: {item.dateAdministered} | Status: {item.boosterStatus}</p>
            </>
          )}
        />

        <GenericManager title="Family Medical History" items={data.familyHistories}
          onAdd={handleAdd('familyHistories', medicalRecordService.addFamilyHistory)}
          onDelete={handleDelete('familyHistories', medicalRecordService.deleteFamilyHistory)}
          fields={[
            { name: 'relationship', label: 'Relationship', required: true },
            { name: 'medicalCondition', label: 'Medical Condition', required: true },
            { name: 'notes', label: 'Notes' }
          ]}
          renderItem={item => (
            <>
              <p><strong className="text-gray-900">{item.relationship}</strong>: {item.medicalCondition}</p>
              {item.notes && <p className="italic">{item.notes}</p>}
            </>
          )}
        />

      </div>
    </div>
  );
}
