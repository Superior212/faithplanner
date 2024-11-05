import Link from "next/link";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our commitment to protecting your privacy",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            {/* Last updated: {new Date().toLocaleDateString()} */}
            Effective Date: 11/01/2024
          </p>

          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            1. Introduction
          </h2>
          <p>
            Welcome to FaithPlanner. Your privacy is important to us. This
            Privacy Policy outlines how we collect, use, protect, and disclose
            information that you provide when you use our website
            https://faithplanner.org
          </p>

          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            2. Information We Collect
          </h2>
          <p>
            We collect various types of information to provide and improve our
            service to you.
          </p>
          <ul className="list-[lower-alpha] pl-6 mb-4">
            <li className="font-[600] mt-3">Personal Information</li>
            <p>
              We may collect personally identifiable information such as your
              name, email address, phone number, and billing information when
              you register on our site, place an order, subscribe to a
              newsletter, or contact us.
            </p>
            <li className="font-[600] mt-3">Non-Personal Information</li>
            <p>
              We may also collect non-personally identifiable information, such
              as your IP address, browser type, operating system, and browsing
              behavior on our site.
            </p>
          </ul>
          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            3. How We Use Your Information
          </h2>
          <p>
            We use the information collected for various purposes, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Processing and fulfilling your orders</li>
            <li>Communicating with you about your orders or inquiries</li>
            <li>Improving our website, products, and services</li>
            <li>Personalizing your experience on our website</li>
            <li>Sending promotional communications (if you’ve opted in)</li>
          </ul>

          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            4. Cookies and Tracking Technologies
          </h2>
          <p>
            We may use cookies, web beacons, and other tracking technologies to
            improve your experience on our site. Cookies are small files stored
            on your device to help us understand how you use our site and to
            remember your preferences.
          </p>
          <p className="mt-3">
            <span className="font-[600]">
              {" "}
              You can control cookie settings in your browser.{" "}
            </span>
            However, disabling cookies may limit your ability to use some
            features of our website.
          </p>

          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            5. How We Share Your Information
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties except:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <span className="font-[700]">Service Providers: </span>We may
              share information with third-party service providers who help us
              operate our website and fulfill your orders.
            </li>
            <li>
              <span className="font-[700]"> Legal Compliance:</span> We may
              disclose your information when required by law or to protect our
              rights, safety, or property.
            </li>
            <li>
              <span className="font-[700]"> Business Transfers:</span> In the
              event of a merger, acquisition, or asset sale, your information
              may be transferred to the new owner.
            </li>
          </ul>

          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            6. Security of Your Information
          </h2>
          <p>
            We implement security measures to protect your personal information.
            However, please remember that no method of transmission over the
            internet or method of electronic storage is 100% secure.
          </p>
          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            7. Your Rights and Choices
          </h2>
          <p>
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <span className="font-[700]">Access:</span> Request access to the
              personal information we hold about you.
            </li>
            <li>
              <span className="font-[700]"> Correction:</span> Request
              corrections to your personal information.
            </li>
            <li>
              {" "}
              <span className="font-[700]">Deletion:</span> Request deletion of
              your personal information.
            </li>
            <li>
              {" "}
              <span className="font-[700]">Opt-Out:</span> Opt-out of marketing
              communications.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at{" "}
            <a href="mailto:info@faithplanner.org" className="text-blue-600 ">
              info@faithplanner.org
            </a>
            .
          </p>
          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            8. Third-Party Links
          </h2>
          <p>
            Our website may contain links to other websites. This Privacy Policy
            does not apply to those third-party sites. We are not responsible
            for the privacy practices of these websites.
          </p>
          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            9. Children’s Privacy
          </h2>
          <p>
            Our website is not intended for children under the age of 13, and we
            do not knowingly collect information from children under 13.
          </p>
          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            10. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy periodically. Any changes will be
            posted on this page, and we encourage you to review it regularly.
          </p>
          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            11. Contact Us
          </h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Email:{" "}
              <a href="mailto:info@faithplanner.org" className="text-blue-600 ">
                info@faithplanner.org
              </a>
            </li>
            <li>Phone: 7705470494</li>
            <li>Address: 328 mt holly st Baltimore md 21229</li>
          </ul>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-600 hover:underline">
              Return to Home Page
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
