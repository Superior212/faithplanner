import Link from "next/link";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important legal information and disclaimers for our website",
};

export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <Alert variant="destructive" className="mb-6">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription className="text-[10px] sm:text-base">
                This disclaimer is important. Please read it carefully.
              </AlertDescription>
            </div>
          </Alert>

          <p className="text-lg mb-4">Last Updated: 11/01/2024</p>

          <p>
            Welcome to Faithplanner. By using our website{" "}
            <a
              className="text-blue-600 hover:underline"
              href="https://faithplanner.org">
              faithplanner.org,
            </a>{" "}
            you agree to the terms and conditions stated in this Disclaimer. If
            you do not agree with these terms, please do not use our website.
          </p>

          <h2 className="sm:text-2xl text-lg  font-semibold mt-6 mb-4">
            1. General Information
          </h2>
          <p>
            The information provided on this website is for general
            informational purposes only. All content is provided in good faith,
            and while we strive for accuracy, we make no representations or
            warranties, express or implied, about the completeness, accuracy,
            reliability, suitability, or availability of any information,
            products, services, or related graphics on the website.
          </p>

          <h2 className="sm:text-2xl text-lg  font-semibold mt-6 mb-4">
            2. No Professional Advice
          </h2>
          <p>
            The content on our website should not be construed as professional
            advice. For specific advice or guidance, you should consult a
            qualified professional. faithplanner.org is not responsible for any
            actions taken based on the information provided on this website.
          </p>

          <h2 className="sm:text-2xl text-lg  font-semibold mt-6 mb-4">
            3.No Responsibility for External Links
          </h2>
          <p>
            Our website may contain links to third-party websites. These links
            are provided for your convenience, and we do not endorse or assume
            responsibility for the content, products, services, or practices of
            any third-party websites. Accessing these external sites is at your
            own risk, and we recommend reviewing their terms and privacy
            policies.
          </p>

          <h2 className="sm:text-2xl text-lg  font-semibold mt-6 mb-4">
            4. . Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, [Website Name] disclaims any
            liability for any direct, indirect, incidental, or consequential
            loss or damage that may occur from using our website or relying on
            any information provided on our website. This includes but is not
            limited to damages for loss of profits, data, or other intangible
            losses.
          </p>

          <h2 className="sm:text-2xl text-lg font-semibold mt-6 mb-4">
            5. &quot;As Is&quot; and &quot;As Available&quot; Basis
          </h2>
          <p>
            All information on this website is provided &quot;as is&quot; and
            &quot;as available&quot; without any warranties of any kind, either
            express or implied. We do not warrant that the website will be
            uninterrupted, secure, or free from errors or viruses.
          </p>

          <h2 className="sm:text-2xl text-lg  font-semibold mt-6 mb-4">
            6. Changes to This Disclaimer
          </h2>
          <p>
            We reserve the right to update or change this Disclaimer at any time
            without notice. Any changes will be posted on this page, and we
            encourage you to review this Disclaimer periodically.
          </p>
          <h2 className="sm:text-2xl text-lg  font-semibold mt-6 mb-4">
            10. Contact Us
          </h2>
          <p>
            If you have any questions or concerns regarding this Disclaimer,
            please contact us at:
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
