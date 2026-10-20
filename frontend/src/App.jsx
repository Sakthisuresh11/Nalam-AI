import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [showMedicine, setShowMedicine] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [showCaregiver, setShowCaregiver] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showSymptoms, setShowSymptoms] = useState(false);

  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState("");

  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [medicineTime, setMedicineTime] = useState("");
  const [medicines, setMedicines] = useState([]);

  const [recordTitle, setRecordTitle] = useState("");
  const [recordDetails, setRecordDetails] = useState("");
  const [recordDoctor, setRecordDoctor] = useState("");
  const [records, setRecords] = useState([]);

  const [caregiverName, setCaregiverName] = useState("");
  const [caregiverPhone, setCaregiverPhone] = useState("");
  const [caregiverRelationship, setCaregiverRelationship] = useState("");
  

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines/6aa904ea946758f2c02edac5")
      .then((response) => response.json())
      .then((data) => setMedicines(data))
      .catch((error) =>
        console.log("Error loading medicines:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/medical-records/6aa904ea946758f2c02edac5")
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((error) =>
        console.log("Error loading records:", error)
      );
  }, []);

  const t =
    language === "en"
      ? {
          title: "NalamAI",
          subtitle: "Your AI-Powered Healthcare Assistant",
          welcome: "Welcome to NalamAI",
          description:
            "Manage your health, medicines, medical records and emergency support in one place.",
          symptom: "AI Symptom Checker",
          medicine: "Medicine Reminder",
          records: "Medical Records",
          caregiver: "Caregiver",
          doctor: "Doctor Consultation",
          sos: "Emergency SOS",
        }
      : {
          title: "NalamAI",
          subtitle: "உங்கள் AI சுகாதார உதவியாளர்",
          welcome: "NalamAI-க்கு வரவேற்கிறோம்",
          description:
            "உங்கள் உடல்நலம், மருந்துகள், மருத்துவ பதிவுகள் மற்றும் அவசர உதவியை ஒரே இடத்தில் நிர்வகிக்கவும்.",
          symptom: "AI அறிகுறி பரிசோதனை",
          medicine: "மருந்து நினைவூட்டல்",
          records: "மருத்துவ பதிவுகள்",
          caregiver: "பராமரிப்பாளர்",
          doctor: "மருத்துவர் ஆலோசனை",
          sos: "அவசர SOS",
        };

  async function analyzeSymptoms() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/symptoms/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: symptoms,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setAnalysis(data.analysis);
    } catch (error) {
      setAnalysis("Error: " + error.message);
    }
  }

  async function saveMedicine() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/medicines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "6aa904ea946758f2c02edac5",
            name: medicineName,
            dosage: dosage,
            time: medicineTime,
            frequency: "daily",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save medicine"
        );
      }

      setMedicines([...medicines, data]);

      setMedicineName("");
      setDosage("");
      setMedicineTime("");

      alert("💊 Medicine saved successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  async function saveRecord() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/medical-records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "6aa904ea946758f2c02edac5",
            title: recordTitle,
            details: recordDetails,
            doctor: recordDoctor,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save record"
        );
      }

      setRecords([...records, data]);

      setRecordTitle("");
      setRecordDetails("");
      setRecordDoctor("");

      alert("📋 Medical record saved successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  async function saveCaregiver() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/caregivers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "6aa904ea946758f2c02edac5",
            name: caregiverName,
            phone: caregiverPhone,
            relationship: caregiverRelationship,
            notificationsEnabled: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save caregiver"
        );
      }

      setCaregiverName("");
      setCaregiverPhone("");
      setCaregiverRelationship("");

      alert("👨‍👩‍👦 Caregiver saved successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🩺 {t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <button
          className="language-btn"
          onClick={() =>
            setLanguage(language === "en" ? "ta" : "en")
          }
        >
          {language === "en" ? "தமிழ்" : "English"}
        </button>
      </header>

      <main className="main">
        <section className="welcome">
  <div className="welcome-content">
    <div>
      <span className="welcome-label">YOUR HEALTH DASHBOARD</span>
      <h2>{t.welcome}</h2>
      <p>{t.description}</p>
    </div>

    <div className="health-badge">
      <span>❤️</span>
      <div>
        <strong>Health Support</strong>
        <small>NalamAI is here to help</small>
      </div>
    </div>
  </div>
</section>

<section className="dashboard-stats">
  <div className="stat-card">
    <span className="stat-icon">💊</span>
    <div>
      <strong>{medicines.length}</strong>
      <p>Medicines</p>
    </div>
  </div>

  <div className="stat-card">
    <span className="stat-icon">📋</span>
    <div>
      <strong>{records.length}</strong>
      <p>Medical Records</p>
    </div>
  </div>

  <div className="stat-card">
    <span className="stat-icon">👨‍👩‍👦</span>
    <div>
      <strong>1</strong>
      <p>Caregiver</p>
    </div>
  </div>

  <div className="stat-card">
    <span className="stat-icon">🛡️</span>
    <div>
      <strong>24/7</strong>
      <p>Emergency Support</p>
    </div>
  </div>
</section>
        <section className="features">
          <div className="card">
            <div className="emoji">🎙️</div>
            <h3>{t.symptom}</h3>
            <p>Describe your symptoms and receive health guidance.</p>
            <button onClick={() => setShowSymptoms(true)}>
              Open Symptom Checker
            </button>
          </div>

          <div className="card">
            <div className="emoji">💊</div>
            <h3>{t.medicine}</h3>
            <p>Keep track of your medicines and medication times.</p>
            <button onClick={() => setShowMedicine(true)}>
              Manage Medicines
            </button>
          </div>

          <div className="card">
            <div className="emoji">📋</div>
            <h3>{t.records}</h3>
            <p>Store and view your important medical information.</p>
            <button onClick={() => setShowRecords(true)}>
              View Records
            </button>
          </div>

          <div className="card">
            <div className="emoji">👨‍👩‍👦</div>
            <h3>{t.caregiver}</h3>
            <p>Manage trusted caregiver information.</p>
            <button onClick={() => setShowCaregiver(true)}>
              Manage Caregiver
            </button>
          </div>

          <div className="card">
            <div className="emoji">👨‍⚕️</div>
            <h3>{t.doctor}</h3>
            <p>Access the doctor consultation section.</p>
            <button
              onClick={() => setShowDoctor(true)}
            >
              Consult a Doctor
            </button>
          </div>

          <div className="card emergency">
            <div className="emoji">🆘</div>
            <h3>{t.sos}</h3>
            <p>Get emergency assistance when you need it.</p>
            <button onClick={() => setShowSOS(true)}>
  Activate SOS
</button>
          </div>
        </section>

        {showSymptoms && (
          <section className="symptom-box">
            <h2>🎙️ AI Symptom Checker</h2>

            <p>
              Describe your symptoms below. NalamAI will provide
              general health guidance.
            </p>

            <textarea
              placeholder="Example: I have fever and headache..."
              rows="5"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />

            <button onClick={analyzeSymptoms}>
              Analyze Symptoms
            </button>

            {analysis && (
              <div className="analysis-result">
                <h3>🩺 NalamAI Guidance</h3>
                <p>{analysis}</p>
              </div>
            )}

            <button
              className="close-btn"
              onClick={() => setShowSymptoms(false)}
            >
              Close
            </button>
          </section>
        )}

        {showMedicine && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <h2>💊 Add Medicine</h2>

            <input
              type="text"
              placeholder="Medicine name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />

            <br />
            <br />

            <input
              type="text"
              placeholder="Dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />

            <br />
            <br />

            <input
              type="time"
              value={medicineTime}
              onChange={(e) => setMedicineTime(e.target.value)}
            />

            <br />
            <br />

            <button onClick={saveMedicine}>
              Save Medicine
            </button>

            {medicines.map((medicine) => (
              <div
                key={medicine._id}
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <h3>💊 {medicine.name}</h3>
                <p>Dosage: {medicine.dosage}</p>
                <p>⏰ Time: {medicine.time}</p>
                <p>🔄 Frequency: {medicine.frequency}</p>
              </div>
            ))}

            <button
              onClick={() => setShowMedicine(false)}
              style={{ marginLeft: "10px" }}
            >
              Close
            </button>
          </div>
        )}

        {showRecords && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <h2>📋 Medical Records</h2>

            <input
              type="text"
              placeholder="Record title (e.g. Blood Test)"
              value={recordTitle}
              onChange={(e) => setRecordTitle(e.target.value)}
            />

            <br />
            <br />

            <textarea
              placeholder="Record details"
              rows="4"
              value={recordDetails}
              onChange={(e) => setRecordDetails(e.target.value)}
            />

            <br />
            <br />

            <input
              type="text"
              placeholder="Doctor name"
              value={recordDoctor}
              onChange={(e) => setRecordDoctor(e.target.value)}
            />

            <br />
            <br />

            <button onClick={saveRecord}>
              Save Record
            </button>

            {records.map((record) => (
              <div
                key={record._id}
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <h3>📋 {record.title}</h3>
                <p>Details: {record.details}</p>
                <p>Doctor: {record.doctor}</p>
              </div>
            ))}

            <br />

            <button onClick={() => setShowRecords(false)}>
              Close
            </button>
          </div>
        )}

        {showCaregiver && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <h2>👨‍👩‍👦 Caregiver</h2>

            <p>
              Add a trusted caregiver who can receive notifications.
            </p>

            <input
              type="text"
              placeholder="Caregiver name"
              value={caregiverName}
              onChange={(e) => setCaregiverName(e.target.value)}
            />

            <br />
            <br />

            <input
              type="tel"
              placeholder="Caregiver phone"
              value={caregiverPhone}
              onChange={(e) => setCaregiverPhone(e.target.value)}
            />

            <br />
            <br />

            <input
              type="text"
              placeholder="Relationship (e.g. Mother)"
              value={caregiverRelationship}
              onChange={(e) =>
                setCaregiverRelationship(e.target.value)
              }
            />

            <br />
            <br />

            <button onClick={saveCaregiver}>
              Save Caregiver
            </button>

            <button
              onClick={() => setShowCaregiver(false)}
              style={{ marginLeft: "10px" }}
            >
              Close
            </button>
          </div>
        )}
                {showDoctor && (
          <div
            style={{
              marginTop: "20px",
              padding: "30px",
              background: "white",
              borderRadius: "16px",
              border: "1px solid #e1e8eb",
              boxShadow: "0 5px 18px rgba(38, 50, 56, 0.06)",
            }}
          >
            <h2>👨‍⚕️ Doctor Consultation</h2>

            <p style={{ marginTop: "10px", color: "#78909c" }}>
              Choose a doctor and consultation type.
            </p>

            <div style={{ marginTop: "20px" }}>
              <h3>👨‍⚕️ Dr. Priya Kumar</h3>
              <p>General Physician</p>
              <p>🟢 Available for consultation</p>

              <button
                onClick={() =>
                  alert("📅 Consultation request sent to Dr. Priya Kumar!")
                }
              >
                Book Consultation
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>👨‍⚕️ Dr. Arun Raj</h3>
              <p>Internal Medicine Specialist</p>
              <p>🟢 Available for consultation</p>

              <button
                onClick={() =>
                  alert("📅 Consultation request sent to Dr. Arun Raj!")
                }
              >
                Book Consultation
              </button>
            </div>

            <br />

            <button
              onClick={() => setShowDoctor(false)}
              className="close-btn"
            >
              Close
            </button>
          </div>
        )}
        {showSOS && (
  <div
    style={{
      marginTop: "20px",
      padding: "30px",
      background: "#fff5f5",
      borderRadius: "16px",
      border: "2px solid #f3caca",
      textAlign: "center",
    }}
  >
    <h2 style={{ color: "#c62828" }}>
      🆘 Emergency SOS
    </h2>

    <p>
      Use this feature when you need emergency assistance.
    </p>

    <button
      onClick={async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/sos",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: "6aa904ea946758f2c02edac5",
                message: "Emergency SOS activated",
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to activate SOS");
          }

          alert("🚨 Emergency SOS activated successfully!");
        } catch (error) {
          alert("Error: " + error.message);
        }
      }}
      style={{
        marginTop: "20px",
        background: "#d32f2f",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "140px",
        height: "140px",
        fontSize: "28px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      SOS
    </button>

    <br />

    <button
      onClick={() => setShowSOS(false)}
      className="close-btn"
    >
      Close
    </button>
  </div>
)}
      </main>

      <footer>
        <p>© 2026 NalamAI • Healthcare made simpler</p>
      </footer>
    </div>
  );
}

export default App;
