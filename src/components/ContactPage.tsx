'use client';

import { useRef, useState } from 'react';
import AnimatedButton from "@/components/AnimatedButton";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      formRef.current?.reset();
      setSuccess(true);
      setSubmitting(false);
      setTimeout(() => setSuccess(false), 5000);
    }, 500);
  };

  return (
    <section id="contact" className="section px-5 max-w-[800px] mx-auto">
 
       <div className="uppercase text-[11px] tracking-[4px] mb-20 text-center">
                   Ready to Connect?
                </div>

      <form onSubmit={handleSubmit} ref={formRef} className="space-y-6 contact-form">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <input
            type="text"
            name="name"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className=""
          />
          <input
            type="number"
            name="number"
            placeholder="Your Phone Number"
            required
           
          />
        </div>
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="w-full"
        ></textarea>

        {success && <div className="text-green-600">Your message has been sent successfully!</div>}
        {submitting && <div className="text-gray-400">Sending...</div>}

       
        <AnimatedButton type="submit"
                            label={submitting ? "Sending..." : "Send Message"}
                            className="md:mt-8 mt-4 mx-auto"
                           
                        />
      </form>
    </section>
  );
}
