// hooks/useDateRange.ts
import { useState } from "react";

export function useDateRange() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  function setRange(newFrom: string, newTo: string) {
    setFrom(newFrom);
    setTo(newTo);
  }

  return { from, to, setRange };
}
