"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-[900px] mx-auto px-5 lg:px-10 pt-40 pb-20">
          <h1 className="uppercase text-white  text-4xl lg:text-6xl leading-none font-light mb-14">
            Privacy Policy
          </h1>

          <div className="space-y-10 text-white/70 font-[200] text-[15px] leading-relaxed">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
              Last updated: September 15, 2026
            </p>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                1. Introduction
              </h2>
              <p>
                Quadbreak Studios Pvt Ltd (&quot;Quadbreak&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                is committed to protecting your privacy. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website
                (quadbreak.com) and use our services, including 3D game art production, environment
                design, character modeling, VR/simulator development, and related outsourcing
                services.
              </p>
              <p>
                By accessing or using our website and services, you agree to the terms of this
                Privacy Policy. If you do not agree, please discontinue use of our website and
                services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                2. Information We Collect
              </h2>
              <p>We may collect the following categories of information:</p>
              <ul className="list-none space-y-2 pl-5">
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  <span className="text-[var(--green)] mr-2">Personal Data</span>
                  Name, email address, phone number, company name, and any information you provide
                  via contact forms, project inquiries, or direct communication.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  <span className="text-[var(--green)] mr-2">Project Data</span>
                  Briefs, reference files, feedback, and any materials you share in connection with
                  a commissioned project.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  <span className="text-[var(--green)] mr-2">Usage Data</span>
                  Pages visited, time spent, browser type, device information, referral source, and
                  IP address collected automatically through standard server logs and analytics
                  tools.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  <span className="text-[var(--green)] mr-2">Cookies</span>
                  Essential cookies required for site functionality and, where applicable,
                  analytics cookies to understand visitor behavior.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                3. How We Use Your Information
              </h2>
              <p>We use collected information to:</p>
              <ul className="list-none space-y-2 pl-5">
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Respond to inquiries and provide project quotes.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Deliver, manage, and communicate about contracted services.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Improve our website, services, and user experience.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Send administrative messages such as project updates, invoices, or
                  schedule changes.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Comply with legal obligations and enforce our agreements.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                4. Information Sharing
              </h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share
                data with:
              </p>
              <ul className="list-none space-y-2 pl-5">
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Service providers who assist in hosting, analytics, payment processing, or
                  project delivery, under appropriate confidentiality obligations.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Legal authorities when required by law, regulation, or valid legal process.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Successors in the event of a merger, acquisition, or sale of assets, with
                  reasonable notice.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                5. Data Security
              </h2>
              <p>
                We implement commercially reasonable technical and organizational measures to
                protect your personal data, including encrypted connections (HTTPS), restricted
                access to sensitive systems, and regular security reviews. No method of
                transmission over the Internet is completely secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain personal information only for as long as necessary to fulfill the
                purposes outlined in this policy, unless a longer retention period is required
                or permitted by law. Project-related data is retained for the duration of the
                engagement and for a reasonable period thereafter for reference and legal
                purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                7. Your Rights
              </h2>
              <p>
                Depending on your jurisdiction, you may have the right to access, correct, update,
                or delete your personal information. To exercise these rights, please contact us
                at the details provided below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                8. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for
                the privacy practices of those sites. We encourage you to review the privacy
                policies of any third-party site you visit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on
                this page with an updated effective date. Continued use of our website after
                changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                10. Contact Us
              </h2>
              <p>
                For questions about this Privacy Policy, contact us at:
              </p>
              <p className="text-white">
                Quadbreak Studios Pvt Ltd<br />
                2nd Floor, City Center, Iritty, Kannur, Kerala - 670703<br />
                Email: business@quadbreak.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}