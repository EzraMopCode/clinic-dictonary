export function DiaryFilters({ date, doctor, doctors, onChange }) {
  return (
    <form className="filters" onSubmit={(e) => e.preventDefault()}>
      <label>
        Filter by Date
        <input
          type="date"
          value={date}
          onChange={(e) => onChange({ date: e.target.value })}
        />
      </label>

      <label>
        Attending Physician
        <select
          value={doctor}
          onChange={(e) => onChange({ doctor: e.target.value })}
        >
          <option value="">All Physicians</option>
          {doctors.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
