import { useState } from "react";
import API from "../api/api";
import AnimatedCard from "./AnimatedCard";

export default function ExpenseCard() {
  const [reqId, setReqId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async () => {
    await API.post("/expenses", {
      reqId,
      type,
      amount,
    });
    setAmount("");
  };

  return (
    <AnimatedCard title="Expense">
      <input className="input" placeholder="Request ID" onChange={e => setReqId(e.target.value)} />
      <input className="input mt-2" placeholder="Type (HOTEL/FOOD)" onChange={e => setType(e.target.value)} />
      <input className="input mt-2" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
      <button className="btn-success mt-4" onClick={submit}>
        Submit
      </button>
    </AnimatedCard>
  );
}
