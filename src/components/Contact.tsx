
'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactSection: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSending(true);
    setStatus({ type: null, message: '' });

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      });
      form.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-8">
          <h3 className="text-6xl font-black tracking-tighter text-washi leading-none">
            LET&#39;S <br /><span className="text-cinnabar underline">TALK</span>
          </h3>
          <p className="text-2xl text-washi/70 leading-relaxed">
            If you&#39;re interested in thoughtful system design, practical software for real constraints, or collaborating on something that needs careful thinking, I&#39;d love to hear from you.
          </p>
          
          <div className="space-y-6 pt-12">
            <a href="mailto:methuselahnwodobeh@gmail.com" className="group block space-y-2">
              <span className="text-xs uppercase tracking-generous text-cinnabar font-bold">Email</span>
              <span className="text-3xl font-light text-washi group-hover:text-cinnabar transition-colors border-b border-woodblock block pb-2">
                methuselahnwodobeh@gmail.com
              </span>
            </a>
            <div className="group block space-y-2">
              <span className="text-xs uppercase tracking-generous text-cinnabar font-bold">Location</span>
              <span className="text-3xl font-light text-washi border-b border-woodblock block pb-2">
                Takoradi, Ghana
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-woodblock/20 p-8 md:p-16 border-r-8 border-cinnabar">
          <form ref={form} className="space-y-10" onSubmit={sendEmail}>
            <div className="space-y-12">
              <div className="relative">
                <input 
                  type="text" 
                  name="user_name"
                  id="name"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-woodblock py-4 text-2xl focus:border-cinnabar outline-none transition-all"
                />
                <label htmlFor="name" className="absolute left-0 top-4 text-washi/20 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-cinnabar peer-focus:text-sm peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">YOUR NAME</label>
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  name="user_email"
                  id="email"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-woodblock py-4 text-2xl focus:border-cinnabar outline-none transition-all"
                />
                <label htmlFor="email" className="absolute left-0 top-4 text-washi/20 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-cinnabar peer-focus:text-sm peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">YOUR EMAIL</label>
              </div>

              <div className="relative">
                <textarea 
                  name="message"
                  id="message"
                  required
                  placeholder=" "
                  rows={3}
                  className="peer w-full bg-transparent border-b-2 border-woodblock py-4 text-2xl focus:border-cinnabar outline-none transition-all resize-none"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-4 text-washi/20 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-cinnabar peer-focus:text-sm peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">YOUR MESSAGE</label>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                type="submit"
                disabled={isSending}
                className="group flex items-center gap-8 text-cinnabar font-bold uppercase tracking-generous text-xl hover:gap-12 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? 'SENDING...' : 'SEND MESSAGE'} <span className="text-4xl">→</span>
              </button>

              {status.type && (
                <p className={`text-sm font-bold uppercase tracking-wider ${status.type === 'success' ? 'text-green-500' : 'text-cinnabar'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
