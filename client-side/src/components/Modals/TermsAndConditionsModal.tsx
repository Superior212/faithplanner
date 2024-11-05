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
          <p>
            1. Acceptance of Terms By using this website, you agree to these
            terms and conditions, our Privacy Policy, and any other terms that
            may apply to specific sections of the website or to products and
            services available through the website.
          </p>
          <p className="mt-4">
            2. Modification of Terms We reserve the right to change these terms
            at any time. Your continued use of the website following any changes
            constitutes your acceptance of the new terms.
          </p>
          <p className="mt-4">
            3. Use of the Website You agree to use our website only for lawful
            purposes and in a way that does not infringe the rights of,
            restrict, or inhibit anyone else's use and enjoyment of the website.
            Unauthorized use of this website may give rise to a claim for
            damages and/or be a criminal offense.
          </p>
          <p className="mt-4">
            4. Intellectual Property All content on this website, including
            text, graphics, logos, images, and software, is the property of
            faithplanner.org or its content suppliers and is protected by
            international copyright laws. Unauthorized reproduction or
            distribution of the website&rsquo;s content is prohibited.
          </p>
          <p className="mt-4">
            5. Product Information We strive to ensure that the product
            descriptions, prices, and images on our website are accurate.
            However, we do not warrant that product descriptions or other
            content on this website are entirely accurate, complete, reliable,
            or error-free.
          </p>
          <p className="mt-4">
            6. Purchases and Payment By placing an order, you are offering to
            purchase a product subject to these terms and conditions. All orders
            are subject to availability and confirmation of the order price. We
            reserve the right to refuse or cancel any order.
          </p>
          <p className="mt-4">
            7. Refunds and Returns Please refer to our Return and Refund Policy
            for more details regarding returns, refunds, and exchanges. All
            requests are subject to review and approval at our discretion.
          </p>
          <p className="mt-4">
            8. Third-Party Links Our website may contain links to third-party
            websites. These links are provided for your convenience only and do
            not signify our endorsement of such websites. We have no
            responsibility for the content or policies of these websites.
          </p>
          <p className="mt-4">
            9. Disclaimer of Warranties Your use of this website is at your sole
            risk. The website and all information, products, and services are
            provided on an "as is" and "as available" basis without any
            warranties of any kind.
          </p>
          <p className="mt-4">
            10. Limitation of Liability We will not be liable for any direct,
            indirect, incidental, special, consequential, or punitive damages,
            or any damages whatsoever, arising from your use of our website or
            from any information, products, or services provided through the
            website.
          </p>
          <p className="mt-4">
            11. Indemnification You agree to indemnify, defend, and hold
            harmless faithplanner.org, its officers, directors, employees,
            agents, and affiliates from any claims, liabilities, damages, costs,
            or expenses arising from your use of the website.
          </p>
          <p className="mt-4">
            12. Governing Law These terms shall be governed and construed in
            accordance with the laws of [State/Country], without regard to its
            conflict of law provisions.
          </p>
          <p className="mt-4">
            13. Contact Information For any questions or concerns regarding
            these terms, please contact us at: Email: Info@faithplanner.org
            Address: 328 mt holly st Baltimore md 21229 Phone: 7705470494
          </p>
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
