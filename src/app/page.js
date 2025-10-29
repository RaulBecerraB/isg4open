"use client";

import { useEffect, useState, useRef } from "react";

function formatTime(d) {
  return d.toLocaleTimeString();
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(null);
  const prev = useRef(isOpen);

  async function fetchStatus() {
    try {
      const res = await fetch('/api/status');
      const json = await res.json();
      if (json && typeof json.isOpen === 'boolean') {
        if (prev.current !== json.isOpen) {
          setVisible(false);
          setTimeout(() => {
            setIsOpen(json.isOpen);
            setVisible(true);
            prev.current = json.isOpen;
            setUpdatedAt(new Date());
          }, 220);
        } else {
          setIsOpen(json.isOpen);
          setUpdatedAt(new Date());
        }
      }
    } catch (e) {
      console.error('failed to fetch status', e);
    }
  }

  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col app-bg">
  <div className="grow flex items-center justify-center px-6 py-12">
        <div className="status-card max-w-xl w-full sm:w-11/12 md:w-3/4 p-10 rounded-3xl flex flex-col items-center gap-6 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className={`indicator ${isOpen ? 'indicator-open' : 'indicator-closed'} ${visible ? 'pulse' : ''}`}>
            <div className="icon-bg">
              {isOpen ? (
                <svg className="icon-svg icon-open" viewBox="0 0 64 64" aria-hidden>
                  <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.06)" />
                  <path className="icon-path check" d="M20 34 L28 42 L44 26" stroke="#064e3b" />
                </svg>
              ) : (
                <svg className="icon-svg icon-closed" viewBox="0 0 64 64" aria-hidden>
                  <circle cx="32" cy="36" r="20" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
                  <rect x="20" y="34" width="24" height="18" rx="2" fill="#3f1f2a" />
                  <path className="icon-path lock-shackle" d="M26 34a6 6 0 0112 0" stroke="#27071a" />
                </svg>
              )}
            </div>
          </div>
          <div className={`status-text text-white ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {isOpen ? 'G4 is OPEN' : 'G4 is CLOSED'}
          </div>
        </div>
        </div>
      </div>

      <footer className="w-full flex items-center justify-center px-6 pb-6">
        <div className="w-full max-w-xl flex items-center justify-between text-xs text-gray-300 border-t border-white/6 pt-3 px-4 bg-transparent">
          <div>Powered by AAAIMX</div>
          <div className="subtle">{updatedAt ? `Updated ${formatTime(updatedAt)}` : ''}</div>
        </div>
      </footer>
    </div>
  );
}
