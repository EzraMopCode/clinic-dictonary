import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment, getDoctors } from "../api/appointments.js";
import { validate } from "./validate.js";
import { Button } from "../ui/Button.jsx";

const EMPTY = { patient: "", doctor: "", date: "", time: "", reason: "" };

export default function Booking() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const errors = validate(values);

  function handleChange(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleBlur(field) {
    return () => setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ patient: true, doctor: true, date: true, time: true, reason: true });
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createAppointment(values);
      setDone(true);
      setTimeout(() => navigate(`/appointments/${created.id}`), 800);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <p role="status" style={{ fontSize: '1.2rem', color: 'var(--brand)', fontWeight: '500' }}>
        Appointment secured. Redirecting to patient file...
      </p>
    </div>
  );

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '450px' }}>
        <h2>Schedule New Appointment</h2>
        <p className="empty-text">Fill out the patient details below to secure a clinical time slot.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
        <label>
          Patient Full Name
          <input
            value={values.patient}
            onChange={handleChange("patient")}
            onBlur={handleBlur("patient")}
            placeholder="e.g., Jane Doe"
          />
          {touched.patient && errors.patient && (
            <span className="field-error">{errors.patient}</span>
          )}
        </label>

        <label>
          Attending Physician
          <select
            value={values.doctor}
            onChange={handleChange("doctor")}
            onBlur={handleBlur("doctor")}
          >
            <option value="">Select a physician...</option>
            {getDoctors().map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {touched.doctor && errors.doctor && (
            <span className="field-error">{errors.doctor}</span>
          )}
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <label>
            Date
            <input
              type="date"
              value={values.date}
              onChange={handleChange("date")}
              onBlur={handleBlur("date")}
            />
            {touched.date && errors.date && <span className="field-error">{errors.date}</span>}
          </label>

          <label>
            Time
            <input
              type="time"
              value={values.time}
              onChange={handleChange("time")}
              onBlur={handleBlur("time")}
            />
            {touched.time && errors.time && <span className="field-error">{errors.time}</span>}
          </label>
        </div>

        <label>
          Reason for Visit
          <textarea
            value={values.reason}
            onChange={handleChange("reason")}
            onBlur={handleBlur("reason")}
            rows="2"
            placeholder="Briefly describe the symptoms or reason..."
          />
          {touched.reason && errors.reason && (
            <span className="field-error">{errors.reason}</span>
          )}
        </label>

        {submitError && (
          <p className="error-box" role="alert" style={{ margin: '0' }}>
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={submitting} style={{ marginTop: '0.5rem', width: '100%' }}>
          {submitting ? "Transmitting..." : "Confirm Booking"}
        </Button>
      </form>
    </section>
  );
}
