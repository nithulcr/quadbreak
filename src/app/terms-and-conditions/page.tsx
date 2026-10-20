"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-[900px] mx-auto px-5 lg:px-10 pt-40 pb-20">
          <h1 className="uppercase text-white  text-5xl lg:text-[6rem] leading-none font-light mb-14">
            Terms and Conditions
          </h1>

          <div className="space-y-10 text-white/70 font-[200] text-[15px] leading-relaxed">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
              Last updated: September 15, 2026
            </p>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website and services of Quadbreak Studios Pvt Ltd
                (&quot;Quadbreak&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms
                and Conditions. If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                2. Services
              </h2>
              <p>
                Quadbreak Studios provides game art outsourcing services including, but not
                limited to, 3D modeling, environment art, character design, vehicle and props
                creation, animation, VFX, concept art, VR/simulator development, and real-time
                optimized asset production for studios, businesses, and individuals.
              </p>
              <p>
                Service scope, deliverables, timelines, and pricing are defined in individual
                project agreements or statements of work (SOW) agreed upon between Quadbreak and
                the client.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                3. Intellectual Property
              </h2>
              <p>
                Unless otherwise agreed in writing, all intellectual property rights in final
                deliverables produced under a project agreement are transferred to the client
                upon full payment. Quadbreak retains the right to display completed work in
                its portfolio and marketing materials unless a separate non-disclosure or
                confidentiality agreement restricts this.
              </p>
              <p>
                Pre-existing tools, workflows, proprietary libraries, templates, and code
                used in the production process remain the property of Quadbreak Studios and
                are licensed to the client as needed for the project deliverables.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                4. Client Responsibilities
              </h2>
              <p>The client agrees to:</p>
              <ul className="list-none space-y-2 pl-5">
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Provide clear, timely briefs, reference materials, and feedback required for
                  project delivery.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Respond to revision requests and approval checkpoints within an agreed
                  timeframe.
                </li>
                <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-2.5 before:h-px before:bg-[var(--green)]">
                  Ensure that materials provided do not infringe on third-party intellectual
                  property rights.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                5. Pricing and Payment
              </h2>
              <p>
                All pricing is provided in project-specific proposals or statements of work.
                Standard payment terms are 50% upfront upon project commencement and 50%
                upon delivery, unless otherwise agreed in writing. Invoices are due within
                14 days of issue.
              </p>
              <p>
                Late payments may incur interest at the rate of 1.5% per month on the
                outstanding balance. Quadbreak reserves the right to pause or withhold
                deliverables until payment is received.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                6. Revisions
              </h2>
              <p>
                Each project includes a defined number of revision rounds as specified in
                the project agreement. Additional revisions beyond the agreed scope will be
                billed separately at a mutually agreed rate. Revision requests must be
                provided in written form (email or project management tool).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                7. Project Timelines
              </h2>
              <p>
                Delivery timelines are estimated based on current workload and the
                information provided at project kickoff. Delays caused by late client
                feedback, incomplete briefs, or scope changes may result in adjusted
                delivery dates. Quadbreak will communicate any timeline changes promptly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                8. Confidentiality
              </h2>
              <p>
                Both parties agree to keep confidential all proprietary information shared
                during the course of a project, including unreleased game details, client
                business strategies, trade secrets, and project-specific technical
                information. This obligation survives the termination of the project
                agreement for a period of two (2) years.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                9. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Quadbreak Studios shall not be liable
                for any indirect, incidental, special, or consequential damages arising out
                of the use of or inability to use our services or deliverables. Our total
                liability shall not exceed the total fees paid by the client for the specific
                project giving rise to the claim.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                10. Termination
              </h2>
              <p>
                Either party may terminate a project agreement with 14 days&apos; written notice.
                In the event of termination, the client shall pay for all work completed up to
                the date of termination. Completed deliverables that have been paid for will
                be transferred to the client. Quadbreak retains the right to use completed
                work for portfolio purposes unless restricted by a prior written agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                11. Warranty
              </h2>
              <p>
                Quadbreak warrants that all deliverables will conform to the specifications
                agreed upon in the project statement of work. If deliverables materially fail
                to meet specifications, Quadbreak will, at its discretion, rework the
                deliverables at no additional cost or provide a proportional refund.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                12. Governing Law
              </h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with
                the laws of India. Any disputes arising from these terms shall be subject to
                the exclusive jurisdiction of the courts in Kannur, Kerala, India.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                13. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time.
                Changes will be posted on this page with an updated effective date. Your
                continued use of our website or services after changes are posted constitutes
                acceptance of the revised terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white text-xl font-light uppercase tracking-wider mb-3">
                14. Contact
              </h2>
              <p>
                For questions about these Terms and Conditions, contact us at:
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