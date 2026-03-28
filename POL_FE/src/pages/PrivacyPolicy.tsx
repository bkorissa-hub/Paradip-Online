// src/pages/PrivacyPolicy.tsx
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-gradient-subtle min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10 lg:py-16">
        {/* Page heading */}
        <header className="mb-8 lg:mb-10">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2 text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: 19 December 2025
          </p>
        </header>

        {/* Card container */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 lg:p-8 space-y-6">
          {/* Intro */}
          <section className="space-y-2">
            <p className="text-slate-700">
              This Privacy Policy explains how{" "}
              <strong>Paradeep Online Computer Service</strong> (&quot;we&quot;,
              &quot;our&quot;, &quot;us&quot;) collects, uses, discloses, and
              protects your information when you use our website{" "}
              <a
                href="https://paradiponline.com"
                className="text-blue-600 underline"
              >
                https://paradiponline.com
              </a>{" "}
              and related services.
            </p>
            <p className="text-slate-700">
              By using our website or providing your information, you agree to
              the practices described in this Privacy Policy.
            </p>
          </section>

          {/* 1. Who we are */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              1. Who we are
            </h2>
            <p className="text-slate-700">
              Paradeep Online Computer Service is an IT solutions provider based
              in Paradip / Jagatsinghpur, Odisha, India. We provide computer
              sales and service, AMC, networking, CCTV installation, and IT
              support for individuals and businesses.
            </p>
            <p className="text-slate-700">
              If you have any questions about this Policy, contact us at:
            </p>
            <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
              <li>Business name: Paradeep Online Computer Service</li>
              <li>Website: https://paradiponline.com</li>
              <li>Email: {/* TODO: add email */}</li>
              <li>Phone: {/* TODO: add phone */}</li>
              <li>Location: Paradip / Jagatsinghpur, Odisha, India</li>
            </ul>
          </section>

          {/* 2. Information we collect */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              2. Information we collect
            </h2>
            <p className="text-slate-700">We may collect:</p>
            <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
              <li>
                <strong>Contact information</strong> – name, email, phone,
                address, company.
              </li>
              <li>
                <strong>Service information</strong> – device details, tickets,
                orders, invoices, AMC details and communication history.
              </li>
              <li>
                <strong>Website usage data</strong> – IP address, browser,
                device data, pages visited, referral URLs, time on site (via
                cookies and analytics).
              </li>
              <li>
                <strong>Marketing and communication data</strong> – your
                marketing preferences and communication history.
              </li>
            </ul>
            <p className="text-slate-700">
              We do not intentionally collect sensitive personal information
              such as financial account numbers or health data via this website.
            </p>
          </section>

          {/* 3. How we collect */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              3. How we collect information
            </h2>
            <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
              <li>
                <strong>Directly from you</strong> – when you fill forms,
                request support or quotes, place orders, or contact us via
                phone, email or WhatsApp.
              </li>
              <li>
                <strong>Automatically</strong> – via cookies, logs and similar
                technologies when you browse our website.
              </li>
              <li>
                <strong>From third parties</strong> – for example when you
                interact with our pages or ads on platforms such as Facebook,
                Instagram or Google.
              </li>
            </ul>
          </section>

          {/* 4. Use */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              4. How we use your information
            </h2>
            <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
              <li>
                Provide and manage our services, including diagnosis, repair,
                installation, AMC, billing and support.
              </li>
              <li>
                Operate, maintain and improve our website, services and user
                experience.
              </li>
              <li>
                Communicate with you about quotes, orders, invoices, technical
                updates and important notices.
              </li>
              <li>
                Run marketing and advertising campaigns and measure their
                effectiveness, where permitted.
              </li>
              <li>
                Comply with legal obligations and protect our rights, security
                and property.
              </li>
            </ul>
          </section>

          {/* 5. Cookies */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              5. Cookies and tracking technologies
            </h2>
            <p className="text-slate-700">
              We use cookies and similar technologies to operate the website,
              remember preferences, analyze traffic and support advertising and
              remarketing.
            </p>
            <p className="text-slate-700">
              You can control cookies via your browser settings. Disabling some
              cookies may affect certain features of the website.
            </p>
          </section>

          {/* 6. Sharing */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              6. How we share your information
            </h2>
            <p className="text-slate-700">
              We do not sell your personal information. We may share it with:
            </p>
            <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
              <li>
                <strong>Service providers</strong> – hosting, analytics,
                payment, communication and IT partners who process data for us
                under contract.
              </li>
              <li>
                <strong>Advertising and social media partners</strong> – such as
                Meta (Facebook/Instagram) or Google when we use their business
                tools and pixels to run and measure campaigns.
              </li>
              <li>
                <strong>Professional advisors and authorities</strong> – when
                required to comply with law or protect our rights.
              </li>
            </ul>
          </section>

          {/* 7. Meta */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              7. Meta / Facebook and other tools
            </h2>
            <p className="text-slate-700">
              When you visit our website or interact with our Facebook or
              Instagram pages and ads, Meta Platforms may receive information
              about you in accordance with the{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Meta Privacy Policy
              </a>
              .
            </p>
            <p className="text-slate-700">
              We use Meta Business Tools (such as the Meta Pixel and
              Conversions API) to measure and improve our campaigns and show
              relevant ads. We do not intentionally send sensitive categories of
              data through these tools.
            </p>
          </section>

          {/* 8–13 condensed */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              8. Data retention
            </h2>
            <p className="text-slate-700">
              We keep personal information only as long as necessary to fulfil
              the purposes described in this Policy and to comply with legal and
              accounting requirements. When no longer needed, we delete or
              anonymize it where reasonably possible.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              9. Your rights and choices
            </h2>
            <p className="text-slate-700">
              Depending on your local laws, you may have rights to access,
              correct, update or delete your personal information, to object to
              or restrict certain processing, and to withdraw consent where
              processing is based on consent. To exercise these rights, please
              contact us using the details in Section 1.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              10. Data security
            </h2>
            <p className="text-slate-700">
              We use reasonable technical and organizational measures to protect
              your personal information from unauthorized access, loss, misuse
              or alteration. However, no method of transmission or storage is
              100% secure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              11. Children&apos;s privacy
            </h2>
            <p className="text-slate-700">
              Our services are not directed to children under 13, and we do not
              knowingly collect personal data from children. If you believe a
              child has provided data to us, please contact us so we can delete
              it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              12. Changes to this Privacy Policy
            </h2>
            <p className="text-slate-700">
              We may update this Privacy Policy from time to time. When we do,
              we will update the &quot;Last updated&quot; date at the top of
              this page. We encourage you to review this Policy periodically.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              13. Contact us
            </h2>
            <p className="text-slate-700">
              If you have any questions, concerns or requests about this Privacy
              Policy or our data practices, please contact us using the
              information in Section 1 above.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
