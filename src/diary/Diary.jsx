import { useSearchParams } from "react-router-dom";
import { useAppointments } from "../hooks/useAppointments.js";
import { getDoctors } from "../api/appointments.js";
import { DiaryFilters } from "./DiaryFilters.jsx";
import { AppointmentList } from "./AppointmentList.jsx";
import { Spinner } from "../ui/Spinner.jsx";

const TODAY = "2026-09-23";

export default function Diary() {
  const [params, setParams] = useSearchParams();
  const date = params.get("date") || TODAY;
  const doctor = params.get("doctor") || "";

  const { data: appointments, status, error } = useAppointments({ date, doctor });

  function updateFilter(next) {
    const merged = { date, doctor, ...next };
    const cleaned = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => v)
    );
    setParams(cleaned);
  }

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem', fontSize: '1.8rem' }}>Daily Schedule</h2>
          <p className="empty-text">Manage and monitor today's clinical operations.</p>
        </div>
      </div>

      <DiaryFilters
        date={date}
        doctor={doctor}
        doctors={getDoctors()}
        onChange={updateFilter}
      />

      <div style={{ marginTop: '2rem' }}>
        {status === "loading" && <Spinner label="Loading schedule data…" />}

        {status === "error" && (
          <div className="error-box" role="alert">
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Connection Error</h3>
            <p style={{ margin: 0 }}>Couldn't load the schedule: {error}</p>
          </div>
        )}

        {status === "success" && appointments.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--surface)', border: '1px dashed var(--line)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>📋</span>
            <p className="empty-text" style={{ fontSize: '1.1rem' }}>No appointments match the current filters.</p>
          </div>
        )}

        {status === "success" && appointments.length > 0 && (
          <AppointmentList appointments={appointments} />
        )}
      </div>
    </section>
  );
}
