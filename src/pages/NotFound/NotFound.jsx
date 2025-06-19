import { useState } from "react";
import { Home, RefreshCcw } from "lucide-react";

export default function NotFound() {
  // Custom color styles matching the requested palette
  const styles = {
    cream: "#fdf8f5",
    teal: "#18403c",
    sage: "#576c5e",
  };

  const goToHomepage = () => {
    window.location.href = "/";
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: styles.cream }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              backgroundColor: i % 2 === 0 ? styles.teal : styles.sage,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* 404 Text */}
        <div className="text-center mb-8">
          <h1
            className="text-9xl font-bold tracking-tighter"
            style={{ color: styles.teal }}
          >
            4<span style={{ color: styles.sage }}>0</span>4
          </h1>
          <div
            className="absolute top-16 right-16 md:right-24 transform rotate-12 px-3 py-1 rounded-md text-sm font-medium"
            style={{ backgroundColor: styles.teal, color: styles.cream }}
          >
            Page Not Found
          </div>
        </div>

        {/* Card Content */}
        <div
          className="rounded-xl p-8 shadow-xl border relative overflow-hidden"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(24, 64, 60, 0.15)",
          }}
        >
          {/* Accent Border */}
          <div
            className="absolute left-0 top-0 h-full w-2"
            style={{ backgroundColor: styles.teal }}
          ></div>

          <div className="text-center space-y-6 pl-4">
            <h2 className="text-3xl font-bold" style={{ color: styles.teal }}>
              Page Not Found
            </h2>

            <p className="text-lg" style={{ color: styles.sage }}>
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div
              className="h-px w-full opacity-30"
              style={{ backgroundColor: styles.sage }}
            ></div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={goToHomepage}
                className="flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: styles.teal,
                  color: styles.cream,
                }}
              >
                <Home size={18} />
                Home
              </button>

              <button
                onClick={refresh}
                className="flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: styles.sage,
                  color: styles.cream,
                }}
              >
                <RefreshCcw size={18} />
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Small footer text */}
      <p className="mt-8 text-xs opacity-50" style={{ color: styles.teal }}>
        © {new Date().getFullYear()} • Return to safely mapped territory
      </p>
    </div>
  );
}
