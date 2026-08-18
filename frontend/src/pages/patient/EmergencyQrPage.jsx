import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  ShieldCheck,
  QrCode,
  Lock,
  Zap,
  UserRound,
  Download,
  Printer,
  RefreshCcw,
  Ban,
  HeartPulse,
  CheckCircle2
} from "lucide-react";

import { qrCodeService } from "../../services/qrCodeService";

export default function EmergencyQrPage() {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQrStatus = async () => {
    try {
      const res = await qrCodeService.getQrStatus();

      if (res.success) {
        setQrData(res.data);
      }
    } catch (error) {
      setQrData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQrStatus();
  }, []);

  const handleAction = async (actionFn) => {
    setLoading(true);

    try {
      const res = await actionFn();

      if (res?.success) {
        if (actionFn === qrCodeService.revokeQr) {
          setQrData(null);
        } else {
          setQrData(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fetchQrStatus();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("");

    printWindow.document.write(`
      <html>
        <body style="
          text-align:center;
          font-family:sans-serif;
          padding:40px;
        ">
          <h2>MedVault Emergency QR</h2>

          <img
            src="${qrData.qrCodeImageBase64}"
            width="300"
          />

          <p>
            Scan during emergency to access medical profile
          </p>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-slate-800">

      {/* =========================================================
          MEDICAL BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Medical grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "34px 34px"
          }}
        />

        {/* Blue medical glow */}

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200 opacity-30 blur-3xl" />

        {/* Cyan medical glow */}

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-200 opacity-30 blur-3xl" />

        {/* Soft red emergency glow */}

        <div className="absolute bottom-16 right-16 h-72 w-72 rounded-full bg-red-100 opacity-30 blur-3xl" />


        {/* Floating ECG */}

        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.06, 0.16, 0.06],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-12 top-20 text-blue-300"
        >
          <HeartPulse
            size={220}
            strokeWidth={1}
          />
        </motion.div>


        {/* Floating medical cross */}

        <motion.div
          animate={{
            y: [0, -18, 0],
            opacity: [0.04, 0.14, 0.04]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-12 top-1/3 text-cyan-300"
        >
          <span className="text-8xl font-light">
            +
          </span>
        </motion.div>


        {/* Floating red cross */}

        <motion.div
          animate={{
            y: [0, 18, 0],
            opacity: [0.03, 0.12, 0.03]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-24 right-16 text-red-300"
        >
          <span className="text-7xl font-light">
            +
          </span>
        </motion.div>


        {/* Small medical pulse */}

        <motion.div
          animate={{
            x: [0, 20, 0],
            opacity: [0.03, 0.1, 0.03]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 left-1/3 text-blue-200"
        >
          <HeartPulse
            size={110}
            strokeWidth={1}
          />
        </motion.div>

      </div>


      {/* =========================================================
          FULL PAGE CONTENT
      ========================================================== */}

      <div className="relative z-10 min-h-screen w-full px-5 py-7 sm:px-7 lg:px-10 xl:px-12">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -25
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5
          }}
        >

          <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">

            {/* Header text */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">

                <ShieldCheck size={17} />

                Emergency Protection

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

              </div>


              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">

                Your Medical Identity

                <br />

                <span className="text-blue-600">
                  Always Ready
                </span>

                <span className="ml-2 text-blue-400">
                  ♥
                </span>

              </h1>


              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500 sm:text-lg">

                Your emergency QR provides instant and secure access
                to critical medical information when every second matters.

              </p>

            </div>


            {/* Security mini cards */}

            <div className="flex flex-wrap gap-3 xl:pt-2">

              {[
                {
                  icon: <Lock size={18} />,
                  title: "Secure & Private",
                  text: "Encrypted medical data"
                },
                {
                  icon: <Zap size={18} />,
                  title: "Instant Access",
                  text: "Emergency ready"
                },
                {
                  icon: <UserRound size={18} />,
                  title: "Always Available",
                  text: "Accessible anytime"
                }
              ].map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -3
                  }}
                  transition={{
                    duration: 0.2
                  }}
                  className="flex min-w-48 items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-sm"
                >

                  <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                    {item.icon}
                  </div>

                  <div>

                    <h3 className="text-sm font-bold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.text}
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </motion.div>


        {/* =====================================================
            ECG STATUS BAR
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0.96
          }}
          animate={{
            opacity: 1,
            scaleX: 1
          }}
          transition={{
            duration: 0.6,
            delay: 0.15
          }}
          className="mt-8 h-12 w-full overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
        >

          <div className="flex h-full items-center">

            <div className="flex h-full shrink-0 items-center gap-2.5 border-r border-blue-100 bg-blue-50 px-5">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />

              </span>

              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Emergency Network
              </span>

            </div>


            <div className="relative h-full flex-1 overflow-hidden">

              <motion.div
                animate={{
                  x: ["-5%", "5%", "-5%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              >

                <svg
                  className="h-full w-full text-blue-300"
                  viewBox="0 0 1000 50"
                  preserveAspectRatio="none"
                >

                  <path
                    d="
                      M0 25
                      H120
                      L135 25
                      L150 10
                      L165 40
                      L180 25
                      H300
                      L320 25
                      L335 17
                      L350 25
                      H440
                      L460 25
                      L475 6
                      L490 44
                      L505 25
                      H620
                      L640 25
                      L655 15
                      L670 25
                      H770
                      L790 25
                      L805 8
                      L820 42
                      L835 25
                      H1000
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                </svg>

              </motion.div>

            </div>


            <div className="hidden px-5 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:block">
              SECURE CONNECTION
            </div>

          </div>

        </motion.div>


        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading ? (

          <div className="flex min-h-screen items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

              <p className="mt-5 text-sm font-semibold text-slate-600">
                Loading security status...
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Verifying your emergency identity
              </p>

            </div>

          </div>

        ) : !qrData || qrData.status === "REVOKED" ? (

          /* =====================================================
              NO ACTIVE QR
          ====================================================== */

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="mt-8 flex min-h-[500px] w-full items-center justify-center rounded-3xl border border-white bg-white p-8 shadow-xl"
          >

            <div className="text-center">

              <motion.div
                animate={{
                  scale: [1, 1.04, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-50 text-blue-600"
              >
                <QrCode size={55} />
              </motion.div>


              <h2 className="mt-8 text-3xl font-bold text-slate-900 sm:text-4xl">
                No Active QR
              </h2>


              <p className="mx-auto mt-3 max-w-lg text-slate-500">
                Generate your emergency identity QR now.
              </p>


              <motion.button
                whileHover={{
                  scale: 1.04,
                  y: -2
                }}
                whileTap={{
                  scale: 0.97
                }}
                onClick={() =>
                  handleAction(qrCodeService.generateQr)
                }
                className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 font-semibold text-white shadow-lg"
              >
                Generate Secure QR →
              </motion.button>

            </div>

          </motion.div>

        ) : (

          /* =====================================================
              ACTIVE QR
          ====================================================== */

          <div className="mt-8 grid w-full grid-cols-1 gap-7 xl:grid-cols-3">

            {/* =================================================
                QR CARD
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -25
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white bg-white p-8 shadow-xl sm:p-10 xl:col-span-2"
            >

              {/* QR glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-100 opacity-40 blur-3xl" />


              {/* Active badge */}

              <div className="relative inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2 font-semibold text-emerald-700">

                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                <CheckCircle2 size={17} />

                ACTIVE

              </div>


              {/* QR */}

              <div className="relative mt-8 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">

                <img
                  src={qrData.qrCodeImageBase64}
                  alt="Emergency QR"
                  className="h-72 w-72 rounded-2xl object-contain sm:h-80 sm:w-80"
                />

              </div>


              <div className="mt-7 text-center">

                <h2 className="text-xl font-bold text-slate-900">
                  Emergency Medical QR
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Ready for emergency medical access
                </p>

              </div>


              {/* Existing actions */}

              <div className="mt-7 flex w-full max-w-xl gap-4">

                <button
                  onClick={handlePrint}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
                >
                  <Printer size={18} />
                  Print
                </button>


                <a
                  href={qrData.qrCodeImageBase64}
                  download="MedVault_QR.png"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700"
                >
                  <Download size={18} />
                  Download
                </a>

              </div>

            </motion.div>


            {/* =================================================
                RIGHT SIDE
            ================================================== */}

            <div className="flex flex-col gap-7">

              {/* Security */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 25
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.1
                }}
                className="flex-1 rounded-3xl border border-white bg-white p-8 shadow-xl sm:p-10"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                      Medical Security
                    </span>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      Security Status
                    </h2>

                  </div>


                  <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                    <ShieldCheck size={25} />
                  </div>

                </div>


                <div className="mt-8 space-y-4">

                  {/* Security 1 */}

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:bg-blue-50">

                    <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
                      <ShieldCheck size={20} />
                    </div>

                    <div>

                      <p className="text-sm font-bold text-slate-800">
                        Encrypted medical token
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Your medical identity is protected
                      </p>

                    </div>

                  </div>


                  {/* Security 2 */}

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:bg-blue-50">

                    <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600">
                      <Zap size={20} />
                    </div>

                    <div>

                      <p className="text-sm font-bold text-slate-800">
                        Emergency access enabled
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Information is ready when needed
                      </p>

                    </div>

                  </div>


                  {/* Security 3 */}

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:bg-blue-50">

                    <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600">
                      <Lock size={20} />
                    </div>

                    <div>

                      <p className="text-sm font-bold text-slate-800">
                        Protected medical identity
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Secure emergency profile access
                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>


              {/* Danger Zone */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.2
                }}
                className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-7 shadow-lg sm:p-8"
              >

                <div className="flex items-start gap-3">

                  <div className="rounded-xl bg-red-100 p-2.5 text-red-600">
                    <Ban size={20} />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-red-700">
                      Danger Zone
                    </h2>

                    <p className="mt-1 text-xs text-red-500">
                      Manage your emergency QR security
                    </p>

                  </div>

                </div>


                <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                  <button
                    onClick={() =>
                      handleAction(qrCodeService.regenerateQr)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 bg-white py-3.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
                  >

                    <RefreshCcw size={16} />

                    Regenerate

                  </button>


                  <button
                    onClick={() =>
                      handleAction(qrCodeService.revokeQr)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700"
                  >

                    <Ban size={16} />

                    Revoke

                  </button>

                </div>

              </motion.div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
