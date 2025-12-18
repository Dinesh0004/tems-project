export default function Header({ employeeId }) {
  return (
    <header className="sticky top-0 bg-white shadow z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">
          TEMS Dashboard
        </h1>
        <span className="text-sm text-gray-600">
          Employee ID: {employeeId}
        </span>
      </div>
    </header>
  );
}
