'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

type Status = { type: 'success' | 'error'; message: string } | null;

const fieldClass =
  'w-full bg-surface border border-subtle px-4 py-3 text-[15px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors';
const labelClass = 'block mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted';

export const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setStatus(null);

    try {
      // Field names (user_name, user_email, message) must match the EmailJS template.
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setStatus({ type: 'success', message: 'Message sent. I’ll get back to you soon.' });
      form.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error', message: 'That didn’t go through. Please try again, or email me directly.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="user_name" className={labelClass}>Your name</label>
          <input id="user_name" type="text" name="user_name" autoComplete="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="user_email" className={labelClass}>Your email</label>
          <input id="user_email" type="email" name="user_email" autoComplete="email" required className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>The problem</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you building, and where are you stuck?"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={isSending}
          className="px-6 py-3 bg-ink text-paper text-sm font-medium hover:bg-ink/85 disabled:opacity-50 disabled:cursor-wait transition-colors"
        >
          {isSending ? 'Sending…' : 'Send message'}
        </button>
        <p
          role="status"
          className={`text-[15px] ${status?.type === 'error' ? 'text-ink' : 'text-signal-ink'}`}
        >
          {status?.message}
        </p>
      </div>
    </form>
  );
};
