import { Link } from "react-router-dom";

export function AppointmentCard({ appointment }) {
  const { id, time, patient, doctor, reason, status } = appointment;

  return (
    <li className={`appointment-card status-${status.toLowerCase()}`}>
      <Link to={`/appointments/${id}`}>
        <span className="time">{time}</span>
        <span style={{ fontWeight: '600', fontSize: '1.05rem' }}>{patient}</span>
        <span className="doctor" style={{ color: 'var(--muted)', fontWeight: '500' }}>{doctor}</span>
        <span className="reason" style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{reason}</span>
        <span className="status">{status}</span>
      </Link>
    </li>
  );
}
