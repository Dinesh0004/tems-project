const updateStatus = async (id, status) => {
  await API.put(`/travel/approve/${id}/${status}`);

  // 🔥 Remove from UI with animation
  setRequests((prev) =>
    prev.filter((req) => req.reqId !== id)
  );
};