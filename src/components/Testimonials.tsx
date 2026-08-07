'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import AnimatedButton from "@/components/AnimatedButton";
import { makeMediaUrl } from '@/utlis/media';
import type { Swiper as SwiperClass } from 'swiper';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  message: string;
  rating: number;
  publishedDate: string | null;
  createdAt: string;
  photoUrl: string | null;
}

interface StrapiPhotoFormatsSize {
  url?: string;
}
interface StrapiPhotoFormats {
  small?: StrapiPhotoFormatsSize;
  thumbnail?: StrapiPhotoFormatsSize;
  [key: string]: StrapiPhotoFormatsSize | undefined;
}
interface StrapiPhotoAttr {
  url?: string;
  formats?: StrapiPhotoFormats;
}
interface StrapiPhotoData {
  attributes?: StrapiPhotoAttr;
}

interface StrapiPhoto {
  url?: string;              // flat form
  formats?: StrapiPhotoFormats;
  data?: StrapiPhotoData;    // nested form
}

interface RawStrapiItem {
  id: number;
  name?: string;
  designation?: string;
  message?: string;
  rating?: number;
  publishedDate?: string | null;
  createdAt?: string;
  photo?: StrapiPhoto | null;
}

export default function Testimonials() {
  const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    rating: 5,
    message: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);


  /**
   * Extract best available image URL from the many shapes Strapi can return.
   * Priority: small -> top-level -> nested attributes.
   */
  const extractPhotoPath = useCallback((p?: StrapiPhoto | null): string | null => {
    if (!p) return null;

    // flat w/ formats
    if (p.formats?.small?.url) return p.formats.small.url;
    if (p.url) return p.url;

    // nested data.attributes
    const nested = p.data?.attributes;
    if (nested?.formats?.small?.url) return nested.formats.small.url;
    if (nested?.url) return nested.url;

    return null;
  }, []);

  const unwrap = useCallback((t: RawStrapiItem): Testimonial => {
    const rawPath = extractPhotoPath(t.photo);
    const fullPhotoUrl = makeMediaUrl(rawPath);

    return {
      id: t.id,
      name: t.name ?? 'Anonymous',
      designation: t.designation ?? 'Client',
      message: t.message ?? '',
      rating: t.rating ?? 0,
      publishedDate: t.publishedDate ?? null,
      createdAt: t.createdAt ?? new Date().toISOString(),
      photoUrl: fullPhotoUrl,
    };
  }, [extractPhotoPath]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/testimonials?populate=photo`
        );
        if (!res.ok) {
          console.error('Fetch testimonials failed:', res.status, res.statusText);
          return;
        }
        const json = await res.json();
        const raw: RawStrapiItem[] = json.data ?? [];
        setTestimonials(raw.map(unwrap));
      } catch (err) {
        console.error('Testimonials fetch error:', err);
      }
    };
    load();
  }, [unwrap]);

  // Form handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'rating' ? +value : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let uploadedPhotoId: number | null = null;

      if (photo) {
        const formData = new FormData();
        formData.append('files', photo);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const uploadJson = await uploadRes.json();
        if (uploadRes.ok && Array.isArray(uploadJson) && uploadJson[0]?.id) {
          uploadedPhotoId = uploadJson[0].id;
        } else {
          console.error('Upload failed:', uploadJson);
          throw new Error('Image upload failed');
        }
      }

      const submitRes = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/testimonials`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              ...form,
              photo: uploadedPhotoId, // may be null
            },
          }),
        }
      );

      const submitJson = await submitRes.json();
      if (!submitRes.ok || !submitJson.data) {
        console.error('Create testimonial failed:', submitJson);
        throw new Error(submitJson.error?.message || 'Submit failed');
      }

      const newItem = unwrap(submitJson.data);
      setTestimonials((prev) => [newItem, ...prev]);
      setForm({ name: '', designation: '', rating: 5, message: '' });
      setPhoto(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count = 0) => (
    <div className="flex gap-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-500'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.637a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.18 3.637c.3.921-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.539-1.118l1.18-3.637a1 1 0 00-.364-1.118l-3.084-2.24c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.951-.69l1.18-3.637z" />
        </svg>
      ))}
    </div>
  );

  const formatDate = (raw: string | null, alt: string) =>
    new Date(raw || alt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Wait for multiple animation frames to ensure DOM is fully laid out
    const initAnimations = () => {
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        gsap.to(section.querySelectorAll(".filling-text .fill"), {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: section.querySelector(".filling-text"),
            start: "top 80%",
            end: "bottom 0%",
            scrub: true,
          },
        });
      }, section);

      cleanup = () => ctx.revert();
    };

    // Use multiple requestAnimationFrames to ensure DOM is fully laid out
    let rafId2: number | undefined;
    const rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        initAnimations();
      });
    });

    return () => {
      cancelAnimationFrame(rafId1);
      if (rafId2) {
        cancelAnimationFrame(rafId2);
      }
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className=" testimonials relative" id="testimonials">
      <div className="py-20 md:py-24 max-w-[1360px] mx-auto px-5 relative">

        <div className="flex flex-col  justify-between items-center  mb-6 md:mb-14 gap-3">
          <div className="sm:flex  gap-8 justify-between w-full items-center">
            
              <div className="flex flex-col mb-8 text-center mx-auto">
                <h2 className="uppercase slide-right  text-white heading filling-text text-5xl lg:text-[7rem]  leading-none font-medium font-monument relative">
                  <span className="fill" aria-hidden="true">
                    What Our
                  </span>
                  <span>
                    What Our
                  </span>
                </h2>
                <h2 className="uppercase slide-right delay-200 text-white heading filling-text text-5xl lg:text-[7rem]  leading-none font-medium font-monument relative">
                  <span className="fill" aria-hidden="true">
                    Clients Say
                  </span>
                  <span>
                    Clients Say
                  </span>
                </h2>

              </div>
            

          </div>

          <div className="flex gap-2 hidden md:flex">
            <button
              ref={prevRef}
              className="px-3 py-1 text-[30px] text-[var(--white)] cursor-pointer"
            >
              ←
            </button>
            <button
              ref={nextRef}
              className="px-3 py-1 text-[30px] text-[var(--white)] cursor-pointer"
            >
              →
            </button>
          </div>
        </div>



        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2 } }}
          autoplay={{ delay: 4000 }}
          speed={1500}
          loop
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
            // @ts-expect-error assigning navigation refs
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error assigning navigation refs
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          onSwiper={(swiper) => {
            const el = swiper.el;
            el.addEventListener("mouseenter", () => swiper.autoplay?.stop());
            el.addEventListener("mouseleave", () => swiper.autoplay?.start());
          }}
        >

          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-[#ffffff0d] p-6 text-white shadow-md h-full flex flex-col">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 relative rounded-full overflow-hidden flex-none">
                    <Image
                      src={t.photoUrl || '/images/user.png'}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.designation}</p>
                    </div>
                    <p className="text-xs text-gray-500 ">
                      {formatDate(t.publishedDate, t.createdAt)}
                    </p>
                  </div>
                </div>
                <hr className="border-gray-600 my-2" />
                {renderStars(t.rating)}
                <div className="mt-3 text-sm flex-1 min-h-[100px]">
                  <div
                    className={`whitespace-pre-line overflow-hidden transition-all duration-300 ${expanded[t.id] ? '' : 'line-clamp-4'
                      }`}
                  >
                    {t.message}
                  </div>
                  {t.message.length > 200 && (
                    <button
                      onClick={() => toggleExpand(t.id)}
                      className="mt-2 text-[var(--white)] text-xs cursor-pointer"
                    >
                      {expanded[t.id] ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8">
          {/* <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 border border-[var(--white)] text-white hover:opacity-90 cursor-pointer"
        >
          Write a Review
        </button> */}
          <AnimatedButton
            label=" Write a Review"
            className="md:mt-8 mt-4 mx-auto w-fit"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-3">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 p-8 max-w-lg w-full space-y-4"
            >
              <h3 className="md:text-xl text-lg font-semibold pb-3">Submit Your Review</h3>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border px-3 py-2"
              />
              <input
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Your Role / Company"
                required
                className="w-full border px-3 py-2"
              />
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full border px-3 py-2 bg-gray-800"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} star{n > 1 && 's'}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your feedback..."
                required
                className="w-full border px-3 py-2 rounded"
              />
              <div className="w-full">
                <label className="block mb-1 text-sm text-white">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  className="w-full border px-3 py-2 bg-gray-800 text-white rounded"
                />
                <p className="text-sm text-gray-400 mt-1">
                  {photo ? `Selected: ${photo.name}` : 'Choose an image (optional)'}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[var(--white)] text-white disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}