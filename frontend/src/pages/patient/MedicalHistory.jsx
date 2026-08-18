import { useState, useEffect } from 'react';
import { medicalRecordService } from '../../services/medicalRecordService';
import GenericManager from '../../components/patient/medical/GenericManager';

export default function MedicalHistory() {
  const [data, setData] = useState({
    allergies: [],
    diseases: [],
    medications: [],
    surgeries: [],
    immunizations: [],
    familyHistories: []
  });

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

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = (type, serviceCall) => async (formData) => {
    try {
      await serviceCall(formData);
      fetchAll();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (type, serviceCall) => async (id) => {
    if (window.confirm('Delete this record?')) {
      try {
        await serviceCall(id);
        fetchAll();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (loading) {
    return (
      <div className="medical-loading">
        <div className="loading-heart">
          <svg viewBox="0 0 24 24">
            <path d="M20.8 8.7c0 5.5-8.8 10.4-8.8 10.4S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
          </svg>
        </div>

        <div className="loading-line">
          <span />
          <span />
          <span />
        </div>

        <p>Loading medical records</p>
        <small>Preparing your clinical history...</small>
      </div>
    );
  }

  return (
    <div className="medical-page">

      {/* =========================================================
          ANIMATED MEDICAL BACKGROUND
      ========================================================= */}

      <div className="medical-background">

        <div className="medical-cross cross-1">+</div>
        <div className="medical-cross cross-2">+</div>
        <div className="medical-cross cross-3">+</div>
        <div className="medical-cross cross-4">+</div>
        <div className="medical-cross cross-5">+</div>

        <div className="medical-circle circle-1" />
        <div className="medical-circle circle-2" />
        <div className="medical-circle circle-3" />

        <div className="medical-pill pill-1">
          <span />
        </div>

        <div className="medical-pill pill-2">
          <span />
        </div>

        <div className="floating-heart heart-1">
          <svg viewBox="0 0 24 24">
            <path d="M20.8 8.7c0 5.5-8.8 10.4-8.8 10.4S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
          </svg>
        </div>

        <div className="floating-heart heart-2">
          <svg viewBox="0 0 24 24">
            <path d="M20.8 8.7c0 5.5-8.8 10.4-8.8 10.4S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
          </svg>
        </div>

        <div className="syringe syringe-1">
          <div className="syringe-body" />
          <div className="syringe-tip" />
        </div>

        <div className="ecg-background">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M0 50 H160 L180 50 L195 25 L210 75 L225 50 H350 L375 50 L395 50 L415 10 L435 90 L455 50 H590 L615 50 L635 50 L650 30 L665 50 H790 L815 50 L835 50 L850 15 L865 85 L880 50 H1020 L1045 50 L1065 50 L1080 28 L1095 72 L1110 50 H1200" />
          </svg>
        </div>

      </div>


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="medical-content">

        {/* HEADER */}

        <header className="medical-header">

          <div className="header-top">

            <div className="header-icon-wrap">

              <div className="header-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
                  <path d="M14 3.5V8h5" />
                  <path d="M8.5 12h7M8.5 15h7M8.5 18h4" />
                </svg>

              </div>

              <span className="header-status-dot" />

            </div>


            <div className="header-copy">

              <div className="header-labels">

                <span className="label-blue">
                  PATIENT RECORDS
                </span>

                <span className="label-separator">•</span>

                <span className="label-green">
                  <i />
                  SECURE & ACTIVE
                </span>

              </div>

              <h1>Medical Information</h1>

              <p>
                Your essential health information, organized in one secure
                medical record.
              </p>

            </div>

          </div>


          {/* ECG */}

          <div className="clinical-monitor">

            <div className="monitor-label">

              <span className="monitor-dot" />

              <div>
                <strong>Clinical Record Monitor</strong>
                <small>RECORD STATUS</small>
              </div>

            </div>

            <div className="monitor-wave">

              <svg viewBox="0 0 1000 60" preserveAspectRatio="none">

                <path
                  className="wave-back"
                  d="M0 30 H120 L138 30 L150 18 L162 42 L174 30 H270 L288 30 L305 30 L318 8 L331 52 L344 30 H440 L458 30 L475 30 L488 19 L501 30 H590 L610 30 L626 30 L640 9 L654 51 L668 30 H760 L780 30 L796 30 L809 18 L822 42 L835 30 H1000"
                />

                <path
                  className="wave-front"
                  d="M0 30 H120 L138 30 L150 18 L162 42 L174 30 H270 L288 30 L305 30 L318 8 L331 52 L344 30 H440 L458 30 L475 30 L488 19 L501 30 H590 L610 30 L626 30 L640 9 L654 51 L668 30 H760 L780 30 L796 30 L809 18 L822 42 L835 30 H1000"
                />

              </svg>

              <div className="wave-scanner" />

            </div>

            <div className="record-count">
              6 RECORD CATEGORIES
            </div>

          </div>

        </header>


        {/* =========================================================
            RECORD GRID
        ========================================================= */}

        <main className="medical-grid">

          {/* ALLERGIES */}

          <MedicalSection
            color="red"
            label="SAFETY PROFILE"
            title="Allergies"
            description="Known allergies and sensitivity information"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-7-4.4-7-10.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 2.5C19 16.6 12 21 12 21Z" />
                <path d="M12 11v4M10 13h4" />
              </svg>
            }
          >

            <GenericManager
              title="Allergies"
              items={data.allergies}
              onAdd={handleAdd(
                'allergies',
                medicalRecordService.addAllergy
              )}
              onDelete={handleDelete(
                'allergies',
                medicalRecordService.deleteAllergy
              )}
              fields={[
                {
                  name: 'allergyType',
                  label: 'Type',
                  type: 'select',
                  options: ['Drug', 'Food', 'Other'],
                  required: true
                },
                {
                  name: 'name',
                  label: 'Name',
                  required: true
                },
                {
                  name: 'severity',
                  label: 'Severity',
                  type: 'select',
                  options: ['Mild', 'Moderate', 'Severe']
                },
                {
                  name: 'notes',
                  label: 'Notes'
                }
              ]}
              renderItem={item => (
                <>
                  <p>
                    <strong className="text-gray-900">
                      {item.name}
                    </strong>{' '}
                    ({item.allergyType})
                  </p>

                  {item.severity && (
                    <p>Severity: {item.severity}</p>
                  )}

                  {item.notes && (
                    <p className="italic">{item.notes}</p>
                  )}
                </>
              )}
            />

          </MedicalSection>


          {/* CHRONIC DISEASES */}

          <MedicalSection
            color="blue"
            label="LONG-TERM CARE"
            title="Chronic Diseases"
            description="Conditions that are part of your medical history"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-7-4.4-7-10.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 2.5C19 16.6 12 21 12 21Z" />
                <path d="M12 8v6M9 11h6" />
              </svg>
            }
          >

            <GenericManager
              title="Chronic Diseases"
              items={data.diseases}
              onAdd={handleAdd(
                'diseases',
                medicalRecordService.addDisease
              )}
              onDelete={handleDelete(
                'diseases',
                medicalRecordService.deleteDisease
              )}
              fields={[
                {
                  name: 'diseaseName',
                  label: 'Disease Name',
                  required: true
                }
              ]}
              renderItem={item => (
                <p>
                  <strong className="text-gray-900">
                    {item.diseaseName}
                  </strong>
                </p>
              )}
            />

          </MedicalSection>


          {/* MEDICATIONS */}

          <MedicalSection
            color="teal"
            label="TREATMENT"
            title="Current Medications"
            description="Medicines currently prescribed or being taken"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="m9 3 12 12-6 6L3 9l6-6Z" />
                <path d="m7 7 10 10" />
              </svg>
            }
          >

            <GenericManager
              title="Current Medications"
              items={data.medications}
              onAdd={handleAdd(
                'medications',
                medicalRecordService.addMedication
              )}
              onDelete={handleDelete(
                'medications',
                medicalRecordService.deleteMedication
              )}
              fields={[
                {
                  name: 'medicineName',
                  label: 'Medicine Name',
                  required: true
                },
                {
                  name: 'dosage',
                  label: 'Dosage',
                  required: true
                },
                {
                  name: 'frequency',
                  label: 'Frequency'
                },
                {
                  name: 'duration',
                  label: 'Duration'
                },
                {
                  name: 'prescribingDoctor',
                  label: 'Prescribing Doctor'
                },
                {
                  name: 'notes',
                  label: 'Notes'
                }
              ]}
              renderItem={item => (
                <>
                  <p>
                    <strong className="text-gray-900">
                      {item.medicineName}
                    </strong>{' '}
                    - {item.dosage}
                  </p>

                  <p>
                    Frequency: {item.frequency} | Duration: {item.duration}
                  </p>

                  {item.prescribingDoctor && (
                    <p>
                      Doctor: {item.prescribingDoctor}
                    </p>
                  )}
                </>
              )}
            />

          </MedicalSection>


          {/* SURGERIES */}

          <MedicalSection
            color="indigo"
            label="PROCEDURES"
            title="Previous Surgeries"
            description="Past surgical procedures and outcomes"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="m4 20 5-5" />
                <path d="m14 6 4-4 2 2-4 4" />
                <path d="m13 7 4 4" />
                <path d="M7 13 4 10l3-3 3 3" />
                <path d="m9 15 6-6" />
              </svg>
            }
          >

            <GenericManager
              title="Previous Surgeries"
              items={data.surgeries}
              onAdd={handleAdd(
                'surgeries',
                medicalRecordService.addSurgery
              )}
              onDelete={handleDelete(
                'surgeries',
                medicalRecordService.deleteSurgery
              )}
              fields={[
                {
                  name: 'surgeryName',
                  label: 'Surgery Name',
                  required: true
                },
                {
                  name: 'hospital',
                  label: 'Hospital'
                },
                {
                  name: 'surgeryDate',
                  label: 'Date',
                  type: 'date'
                },
                {
                  name: 'outcome',
                  label: 'Outcome'
                }
              ]}
              renderItem={item => (
                <>
                  <p>
                    <strong className="text-gray-900">
                      {item.surgeryName}
                    </strong>
                  </p>

                  <p>
                    Hospital: {item.hospital} | Date: {item.surgeryDate}
                  </p>

                  {item.outcome && (
                    <p>Outcome: {item.outcome}</p>
                  )}
                </>
              )}
            />

          </MedicalSection>


          {/* IMMUNIZATIONS */}

          <MedicalSection
            color="green"
            label="PREVENTIVE CARE"
            title="Immunizations"
            description="Vaccination history and booster information"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="m14 4 6 6" />
                <path d="m12 6 6 6" />
                <path d="M5 19 17 7" />
                <path d="m3 21 2-2" />
                <path d="M13 3 3 13" />
              </svg>
            }
          >

            <GenericManager
              title="Immunizations"
              items={data.immunizations}
              onAdd={handleAdd(
                'immunizations',
                medicalRecordService.addImmunization
              )}
              onDelete={handleDelete(
                'immunizations',
                medicalRecordService.deleteImmunization
              )}
              fields={[
                {
                  name: 'vaccineName',
                  label: 'Vaccine Name',
                  required: true
                },
                {
                  name: 'dateAdministered',
                  label: 'Date',
                  type: 'date'
                },
                {
                  name: 'boosterStatus',
                  label: 'Booster Status'
                }
              ]}
              renderItem={item => (
                <>
                  <p>
                    <strong className="text-gray-900">
                      {item.vaccineName}
                    </strong>
                  </p>

                  <p>
                    Date: {item.dateAdministered} | Status:{' '}
                    {item.boosterStatus}
                  </p>
                </>
              )}
            />

          </MedicalSection>


          {/* FAMILY HISTORY */}

          <MedicalSection
            color="violet"
            label="GENETIC CONTEXT"
            title="Family Medical History"
            description="Relevant medical conditions within your family"
            icon={
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="7" r="3" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6" />
                <path d="M14.5 14c3.2 0 5.2 1.7 6 5" />
              </svg>
            }
          >

            <GenericManager
              title="Family Medical History"
              items={data.familyHistories}
              onAdd={handleAdd(
                'familyHistories',
                medicalRecordService.addFamilyHistory
              )}
              onDelete={handleDelete(
                'familyHistories',
                medicalRecordService.deleteFamilyHistory
              )}
              fields={[
                {
                  name: 'relationship',
                  label: 'Relationship',
                  required: true
                },
                {
                  name: 'medicalCondition',
                  label: 'Medical Condition',
                  required: true
                },
                {
                  name: 'notes',
                  label: 'Notes'
                }
              ]}
              renderItem={item => (
                <>
                  <p>
                    <strong className="text-gray-900">
                      {item.relationship}
                    </strong>
                    : {item.medicalCondition}
                  </p>

                  {item.notes && (
                    <p className="italic">
                      {item.notes}
                    </p>
                  )}
                </>
              )}
            />

          </MedicalSection>

        </main>

      </div>


      {/* =========================================================
          STYLES
      ========================================================= */}

      <style>{`

        /* ===============================
           PAGE
        =============================== */

        .medical-page {
          position: relative;
          width: 100%;
          min-height: 100%;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #f8fbff 0%,
              #f4f8fc 48%,
              #f8fbfd 100%
            );
          color: #172033;
        }

        .medical-content {
          position: relative;
          z-index: 5;
          width: 100%;
          padding: 30px 32px 55px;
        }


        /* ===============================
           MEDICAL BACKGROUND
        =============================== */

        .medical-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .medical-background::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: .32;
          background-image:
            linear-gradient(
              rgba(37,99,235,.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(37,99,235,.035) 1px,
              transparent 1px
            );
          background-size: 34px 34px;
        }

        .medical-background::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          top: -260px;
          right: -180px;
          border-radius: 50%;
          background: rgba(59,130,246,.055);
          filter: blur(80px);
        }


        /* Floating crosses */

        .medical-cross {
          position: absolute;
          color: rgba(37,99,235,.09);
          font-size: 30px;
          font-weight: 300;
          animation: crossFloat 10s ease-in-out infinite;
        }

        .cross-1 {
          left: 7%;
          top: 18%;
          animation-delay: -1s;
        }

        .cross-2 {
          left: 48%;
          top: 14%;
          color: rgba(239,68,68,.08);
          animation-delay: -4s;
        }

        .cross-3 {
          right: 8%;
          top: 38%;
          animation-delay: -7s;
        }

        .cross-4 {
          right: 20%;
          bottom: 14%;
          color: rgba(13,148,136,.08);
          animation-delay: -2s;
        }

        .cross-5 {
          left: 22%;
          bottom: 9%;
          color: rgba(239,68,68,.065);
          animation-delay: -6s;
        }

        @keyframes crossFloat {
          0%,
          100% {
            transform: translate3d(0,0,0) rotate(0deg);
            opacity: .45;
          }

          50% {
            transform: translate3d(12px,-18px,0) rotate(8deg);
            opacity: .9;
          }
        }


        /* Medical circles */

        .medical-circle {
          position: absolute;
          border: 1px solid rgba(37,99,235,.07);
          border-radius: 50%;
          animation: circleFloat 14s ease-in-out infinite;
        }

        .circle-1 {
          width: 180px;
          height: 180px;
          top: 30%;
          right: 4%;
        }

        .circle-2 {
          width: 120px;
          height: 120px;
          left: 4%;
          bottom: 16%;
          border-color: rgba(239,68,68,.07);
          animation-delay: -5s;
        }

        .circle-3 {
          width: 260px;
          height: 260px;
          right: 32%;
          bottom: -130px;
          border-color: rgba(13,148,136,.055);
          animation-delay: -9s;
        }

        @keyframes circleFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-15px) scale(1.03);
          }
        }


        /* ===============================
           FLOATING PILLS
        =============================== */

        .medical-pill {
          position: absolute;
          width: 42px;
          height: 16px;
          border: 1px solid rgba(37,99,235,.11);
          border-radius: 20px;
          transform: rotate(-35deg);
          background: rgba(255,255,255,.45);
          animation: pillFloat 11s ease-in-out infinite;
        }

        .medical-pill::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          background: rgba(37,99,235,.12);
        }

        .pill-1 {
          top: 28%;
          right: 15%;
        }

        .pill-2 {
          bottom: 26%;
          left: 11%;
          transform: rotate(30deg);
          animation-delay: -5s;
          border-color: rgba(239,68,68,.09);
        }

        @keyframes pillFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-35deg);
          }

          50% {
            transform: translateY(-20px) rotate(-25deg);
          }
        }


        /* ===============================
           FLOATING HEARTS
        =============================== */

        .floating-heart {
          position: absolute;
          width: 28px;
          height: 28px;
          color: rgba(239,68,68,.10);
          animation: heartFloat 9s ease-in-out infinite;
        }

        .floating-heart svg {
          width: 100%;
          height: 100%;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.2;
        }

        .heart-1 {
          top: 43%;
          left: 13%;
        }

        .heart-2 {
          top: 22%;
          right: 28%;
          color: rgba(239,68,68,.065);
          animation-delay: -4s;
        }

        @keyframes heartFloat {
          0%,
          100% {
            transform: translate3d(0,0,0) rotate(-5deg);
          }

          50% {
            transform: translate3d(12px,-20px,0) rotate(5deg);
          }
        }


        /* ===============================
           SYRINGE
        =============================== */

        .syringe {
          position: absolute;
          width: 70px;
          height: 20px;
          right: 7%;
          bottom: 28%;
          transform: rotate(-30deg);
          opacity: .16;
          animation: syringeFloat 12s ease-in-out infinite;
        }

        .syringe-body {
          position: absolute;
          left: 15px;
          top: 4px;
          width: 42px;
          height: 12px;
          border: 1px solid #2563eb;
          border-radius: 3px;
        }

        .syringe-body::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          background: #2563eb;
        }

        .syringe-tip {
          position: absolute;
          right: 0;
          top: 9px;
          width: 17px;
          height: 1px;
          background: #2563eb;
        }

        @keyframes syringeFloat {
          0%,
          100% {
            transform: translate(0,0) rotate(-30deg);
          }

          50% {
            transform: translate(-15px,-18px) rotate(-24deg);
          }
        }


        /* ===============================
           BACKGROUND ECG
        =============================== */

        .ecg-background {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 8%;
          height: 90px;
          opacity: .035;
        }

        .ecg-background svg {
          width: 100%;
          height: 100%;
        }

        .ecg-background path {
          fill: none;
          stroke: #2563eb;
          stroke-width: 1.4;
          stroke-dasharray: 900;
          animation: backgroundECG 12s linear infinite;
        }

        @keyframes backgroundECG {
          from {
            stroke-dashoffset: 900;
          }

          to {
            stroke-dashoffset: 0;
          }
        }


        /* ===============================
           HEADER
        =============================== */

        .medical-header {
          width: 100%;
          margin-bottom: 30px;
          animation: headerEnter .65s cubic-bezier(.22,1,.36,1);
        }

        @keyframes headerEnter {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-top {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .header-icon-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .header-icon {
          display: flex;
          width: 60px;
          height: 60px;
          align-items: center;
          justify-content: center;
          border: 1px solid #dbeafe;
          border-radius: 17px;
          background: rgba(255,255,255,.9);
          color: #2563eb;
          box-shadow: 0 12px 32px rgba(37,99,235,.09);
          backdrop-filter: blur(12px);
        }

        .header-icon svg {
          width: 30px;
          height: 30px;
        }

        .header-status-dot {
          position: absolute;
          right: -2px;
          top: -2px;
          width: 10px;
          height: 10px;
          border: 2px solid white;
          border-radius: 50%;
          background: #10b981;
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(16,185,129,.3);
          }

          50% {
            box-shadow: 0 0 0 6px rgba(16,185,129,0);
          }
        }

        .header-labels {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }

        .label-blue,
        .label-green {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .15em;
        }

        .label-blue {
          color: #2563eb;
        }

        .label-green {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #059669;
        }

        .label-green i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }

        .label-separator {
          color: #cbd5e1;
          font-size: 10px;
        }

        .header-copy h1 {
          margin: 0;
          color: #172033;
          font-size: clamp(26px,2.4vw,36px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -.04em;
        }

        .header-copy p {
          margin: 7px 0 0;
          color: #71819a;
          font-size: 14px;
        }


        /* ===============================
           CLINICAL MONITOR
        =============================== */

        .clinical-monitor {
          display: flex;
          width: 100%;
          height: 58px;
          margin-top: 22px;
          overflow: hidden;
          border: 1px solid #dbeafe;
          border-radius: 15px;
          background: rgba(255,255,255,.82);
          box-shadow: 0 8px 30px rgba(15,23,42,.04);
          backdrop-filter: blur(12px);
        }

        .monitor-label {
          display: flex;
          min-width: 210px;
          align-items: center;
          gap: 10px;
          padding: 0 17px;
          border-right: 1px solid #dbeafe;
          background: rgba(239,246,255,.7);
        }

        .monitor-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #10b981;
          animation: monitorPulse 1.5s infinite;
        }

        @keyframes monitorPulse {
          50% {
            box-shadow: 0 0 0 5px rgba(16,185,129,0);
          }
        }

        .monitor-label strong {
          display: block;
          color: #475569;
          font-size: 11px;
          letter-spacing: .04em;
        }

        .monitor-label small {
          display: block;
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .14em;
        }

        .monitor-wave {
          position: relative;
          flex: 1;
          overflow: hidden;
        }

        .monitor-wave svg {
          width: 100%;
          height: 100%;
        }

        .wave-back,
        .wave-front {
          fill: none;
          stroke: #60a5fa;
          stroke-width: 1.5;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: ecgAnimation 5s linear infinite;
        }

        .wave-back {
          opacity: .13;
        }

        .wave-front {
          opacity: .75;
        }

        @keyframes ecgAnimation {
          to {
            stroke-dashoffset: 0;
          }
        }

        .wave-scanner {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            transparent,
            rgba(37,99,235,.5),
            transparent
          );
          animation: scanner 3.2s linear infinite;
        }

        @keyframes scanner {
          from {
            left: 0;
          }

          to {
            left: 100%;
          }
        }

        .record-count {
          display: flex;
          align-items: center;
          padding: 0 18px;
          color: #94a3b8;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .12em;
          white-space: nowrap;
        }


        /* ===============================
           GRID
        =============================== */

        .medical-grid {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 30px 26px;
        }

        .medical-section {
          position: relative;
          min-width: 0;
          animation: sectionEnter .65s cubic-bezier(.22,1,.36,1) both;
        }

        .medical-section:nth-child(1) {
          animation-delay: .05s;
        }

        .medical-section:nth-child(2) {
          animation-delay: .12s;
        }

        .medical-section:nth-child(3) {
          animation-delay: .19s;
        }

        .medical-section:nth-child(4) {
          animation-delay: .26s;
        }

        .medical-section:nth-child(5) {
          animation-delay: .33s;
        }

        .medical-section:nth-child(6) {
          animation-delay: .40s;
        }

        @keyframes sectionEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* ===============================
           SECTION HEADER
        =============================== */

        .section-heading {
          display: flex;
          align-items: center;
          gap: 11px;
          min-height: 51px;
          margin-bottom: 9px;
        }

        .section-icon {
          position: relative;
          display: flex;
          width: 41px;
          height: 41px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          border-radius: 12px;
          background: rgba(255,255,255,.86);
          transition: .3s ease;
        }

        .section-icon svg {
          width: 19px;
          height: 19px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .section-pulse {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: littlePulse 1.8s infinite;
        }

        @keyframes littlePulse {
          50% {
            transform: scale(1.4);
            opacity: .5;
          }
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .15em;
        }

        .section-label-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }

        .section-title {
          margin-top: 2px;
          color: #172033;
          font-size: 16px;
          font-weight: 800;
        }

        .section-description {
          margin-top: 2px;
          overflow: hidden;
          color: #8a9ab0;
          font-size: 11px;
          line-height: 1.35;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .medical-section:hover .section-icon {
          transform: translateY(-3px);
          box-shadow: 0 9px 24px rgba(15,23,42,.08);
        }


        /* ===============================
           SECTION COLORS
        =============================== */

        .color-red .section-icon {
          color: #ef4444;
          border-color: #fee2e2;
          background: #fffafa;
        }

        .color-red .section-label {
          color: #ef4444;
        }

        .color-red .section-label-dot,
        .color-red .section-pulse {
          background: #ef4444;
        }

        .color-blue .section-icon {
          color: #2563eb;
          border-color: #dbeafe;
          background: #f8fbff;
        }

        .color-blue .section-label {
          color: #2563eb;
        }

        .color-blue .section-label-dot,
        .color-blue .section-pulse {
          background: #2563eb;
        }

        .color-teal .section-icon {
          color: #0d9488;
          border-color: #ccfbf1;
          background: #f5fffd;
        }

        .color-teal .section-label {
          color: #0d9488;
        }

        .color-teal .section-label-dot,
        .color-teal .section-pulse {
          background: #0d9488;
        }

        .color-indigo .section-icon {
          color: #6366f1;
          border-color: #e0e7ff;
          background: #fafaff;
        }

        .color-indigo .section-label {
          color: #6366f1;
        }

        .color-indigo .section-label-dot,
        .color-indigo .section-pulse {
          background: #6366f1;
        }

        .color-green .section-icon {
          color: #059669;
          border-color: #d1fae5;
          background: #f7fffb;
        }

        .color-green .section-label {
          color: #059669;
        }

        .color-green .section-label-dot,
        .color-green .section-pulse {
          background: #059669;
        }

        .color-violet .section-icon {
          color: #7c3aed;
          border-color: #ede9fe;
          background: #fbfaff;
        }

        .color-violet .section-label {
          color: #7c3aed;
        }

        .color-violet .section-label-dot,
        .color-violet .section-pulse {
          background: #7c3aed;
        }


        /* ===============================
           ALLERGY MICRO ANIMATION
        =============================== */

        .color-red:hover .section-icon svg {
          animation: heartBeat 1.3s ease-in-out infinite;
        }

        @keyframes heartBeat {
          0%,100% {
            transform: scale(1);
          }

          20% {
            transform: scale(1.12);
          }

          35% {
            transform: scale(.96);
          }

          50% {
            transform: scale(1.07);
          }
        }


        /* ===============================
           LOADING
        =============================== */

        .medical-loading {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f7fbfe;
        }

        .loading-heart {
          display: flex;
          width: 56px;
          height: 56px;
          align-items: center;
          justify-content: center;
          border: 1px solid #fee2e2;
          border-radius: 16px;
          background: #fff;
          color: #ef4444;
          animation: loadingHeartbeat 1.4s infinite;
        }

        .loading-heart svg {
          width: 25px;
          height: 25px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
        }

        @keyframes loadingHeartbeat {
          0%,100% {
            transform: scale(1);
          }

          15% {
            transform: scale(1.08);
          }

          30% {
            transform: scale(1);
          }

          45% {
            transform: scale(1.05);
          }
        }

        .loading-line {
          display: flex;
          gap: 4px;
          margin-top: 16px;
        }

        .loading-line span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2563eb;
          animation: loadingDots 1.2s infinite;
        }

        .loading-line span:nth-child(2) {
          animation-delay: .15s;
        }

        .loading-line span:nth-child(3) {
          animation-delay: .3s;
        }

        @keyframes loadingDots {
          0%,60%,100% {
            opacity: .25;
            transform: translateY(0);
          }

          30% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }

        .medical-loading p {
          margin: 14px 0 0;
          color: #475569;
          font-size: 14px;
          font-weight: 800;
        }

        .medical-loading small {
          margin-top: 5px;
          color: #94a3b8;
          font-size: 11px;
        }


        /* ===============================
           RESPONSIVE
        =============================== */

        @media (max-width: 1280px) {

          .medical-content {
            padding-left: 24px;
            padding-right: 24px;
          }

          .medical-grid {
            gap: 26px 20px;
          }

        }

        @media (max-width: 1050px) {

          .medical-grid {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }

          .record-count {
            display: none;
          }

        }

        @media (max-width: 700px) {

          .medical-content {
            padding: 20px 16px 40px;
          }

          .medical-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .header-top {
            align-items: flex-start;
          }

          .header-icon {
            width: 50px;
            height: 50px;
          }

          .header-copy h1 {
            font-size: 25px;
          }

          .header-copy p {
            font-size: 12px;
            line-height: 1.5;
          }

          .clinical-monitor {
            height: 50px;
          }

          .monitor-label {
            min-width: 48px;
            padding: 0 12px;
          }

          .monitor-label > div {
            display: none;
          }

          .section-description {
            white-space: normal;
          }

          .medical-cross,
          .medical-pill,
          .floating-heart,
          .syringe {
            opacity: .45;
          }

        }

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }

        }

      `}</style>
    </div>
  );
}


/* ================================================================
   MEDICAL SECTION
================================================================ */

function MedicalSection({
  children,
  color,
  icon,
  label,
  title,
  description
}) {

  return (
    <section className={`medical-section color-${color}`}>

      <div className="section-heading">

        <div className="section-icon">

          {icon}

          <span className="section-pulse" />

        </div>

        <div>

          <div className="section-label">

            <span>{label}</span>

            <span className="section-label-dot" />

          </div>

          <div className="section-title">
            {title}
          </div>

          <div className="section-description">
            {description}
          </div>

        </div>

      </div>

      {children}

    </section>
  );
}
