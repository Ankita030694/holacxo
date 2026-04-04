"use client";
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      console.log("Performance monitoring active");
      // Optional: Logic to send performance data
    }
  }, []);

  return null;
}
