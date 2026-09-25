function EmptyState() {
  return (
    <section className="pb-20">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10 text-center">

        <h3 className="text-2xl font-bold">
          Welcome 👋
        </h3>

        <p className="text-gray-500 mt-3">
          You haven't created any schedules yet.
        </p>

        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Create First Schedule
        </button>

      </div>
    </section>
  );
}

export default EmptyState;