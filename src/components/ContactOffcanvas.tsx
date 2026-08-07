'use client';

import { useEffect, useRef, useState } from 'react';
import { LuX } from 'react-icons/lu';


export default function ContactOffcanvas() {
  const formRef = useRef<HTMLFormElement | null>(null); // ✅ define this
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

useEffect(() => {
  (window as Window & typeof globalThis & { openOffcanvas?: () => void }).openOffcanvas = () => {
    setVisible(true);
  };
}, []);


  const closeOffcanvas = () => {
    setVisible(false);
    document.body.classList.remove('offcanvas-show');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      console.log('📨 API Response:', res.status, data);

      if (res.ok && data.success) {
        formRef.current?.reset(); // ✅ this will now work
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      console.error('❌ Client error:', err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <>
      <div className={`offcanvas fixed inset-0 z-50 transition-all duration-500 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="backdrop fixed inset-0 bg-black/50" onClick={closeOffcanvas} />
        <div className={`contact-form-offcanvas-container transition-transform duration-500 ease-in-out ${visible ? 'scale-100' : 'scale-0'}`}>
          <button onClick={closeOffcanvas} className="absolute top-4 right-4 offcanvas-close">
            <LuX className="w-6 h-6" />
          </button>

          <form id="contactFormsubmit" onSubmit={handleSubmit} ref={formRef}> {/* ✅ assign formRef here */}
            <div className="contact-form">
              <h2 className="">Let’s Talk</h2>

              <div>
                <input type="text" name="name" placeholder="Your Name" required className="" />
                <input type="email" name="email" placeholder="Your Email" required className="" />
                <input type="number" name="number" placeholder="Your Ph no." required className="" />
                <textarea name="message" placeholder="Your Message" required className="" />
              </div>

              {success && <div className="text-green-600 mt-2">✅ Your message has been sent successfully!</div>}
              {error && <div className="text-red-600 mt-2">❌ There was an issue sending your message. Please try again.</div>}
            </div>
            <button type="submit" className="mt-4 cursor-pointer uppercase bg-[var(--background)] text-[11px] tracking-[4px] p-5 absolute-bottom w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
