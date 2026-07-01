"use client";
import { useState, useEffect } from "react";

export function usePendingCopies() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/copies?status=pending")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCount(data.length);
      })
      .catch(() => {});
  }, []);

  return count;
}
