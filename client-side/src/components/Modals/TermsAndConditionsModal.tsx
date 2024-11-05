import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export default function TermsAndConditionsModal({
  isOpen,
  onAccept,
  onClose,
}: TermsAndConditionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-2xl">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Welcome to FaithPlanners. By accessing or using our website,{" "}
            <a
              href="https://faithplanner.org"
              className="text-blue-700 underline">
              faithplanner.org
            </a>
            , you agree to comply with and be bound by the following terms and
            conditions. Please read them carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto my-4">
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By using this website, you agree to these terms and conditions, our
            Privacy Policy, and any other terms that may apply to specific
            sections of the website or to products and services available
            through the website.
          </p>

          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            2. Modification of Terms
          </h2>
          <p className="mt-4">
            We reserve the right to change these terms at any time. Your
            continued use of the website following any changes constitutes your
            acceptance of the new terms.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            3. Use of the Website
          </h2>
          <p className="mt-4">
            You agree to use our website only for lawful purposes and in a way
            that does not infringe the rights of, restrict, or inhibit anyone
            else&apos;s use and enjoyment of the website. Unauthorized use of
            this website may give rise to a claim for damages and/or be a
            criminal offense.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            4. Intellectual Property
          </h2>
          <p className="mt-4">
            All content on this website, including text, graphics, logos,
            images, and software, is the property of faithplanner.org or its
            content suppliers and is protected by international copyright laws.
            Unauthorized reproduction or distribution of the website&apos;s
            content is prohibited.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            5. Product Information
          </h2>
          <p className="mt-4">
            We strive to ensure that the product descriptions, prices, and
            images on our website are accurate. However, we do not warrant that
            product descriptions or other content on this website are entirely
            accurate, complete, reliable, or error-free.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            6. Purchases and Payment
          </h2>
          <p className="mt-4">
            By placing an order, you are offering to purchase a product subject
            to these terms and conditions. All orders are subject to
            availability and confirmation of the order price. We reserve the
            right to refuse or cancel any order.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            7. Refunds and Returns
          </h2>
          <p className="mt-4">
            Please refer to our Return and Refund Policy for more details
            regarding returns, refunds, and exchanges. All requests are subject
            to review and approval at our discretion.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            8. Third-Party Links
          </h2>
          <p className="mt-4">
            Our website may contain links to third-party websites. These links
            are provided for your convenience only and do not signify our
            endorsement of such websites. We have no responsibility for the
            content or policies of these websites.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            9. Disclaimer of Warranties
          </h2>
          <p className="mt-4">
            Your use of this website is at your sole risk. The website and all
            information, products, and services are provided on an &quot;as
            is&quot; and &quot;as available&quot; basis without any warranties
            of any kind.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            10. Limitation of Liability
          </h2>
          <p className="mt-4">
            We will not be liable for any direct, indirect, incidental, special,
            consequential, or punitive damages, or any damages whatsoever,
            arising from your use of our website or from any information,
            products, or services provided through the website.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            11. Indemnification
          </h2>
          <p className="mt-4">
            You agree to indemnify, defend, and hold harmless faithplanner.org,
            its officers, directors, employees, agents, and affiliates from any
            claims, liabilities, damages, costs, or expenses arising from your
            use of the website.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            12. Governing Law
          </h2>
          <p className="mt-4">
            These terms shall be governed and construed in accordance with the
            laws of [State/Country], without regard to its conflict of law
            provisions.
          </p>
          <h2 className="sm:text-lg font-semibold mt-4 mb-4">
            13. Contact Information
          </h2>
          <p className="mt-4">
            For any questions or concerns regarding these terms, please contact
            us at:
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Decline
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
