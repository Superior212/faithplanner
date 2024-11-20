import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DonationPreferenceModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function DonationPreferenceModal({
  isOpen,
  onAccept,
  onDecline,
}: DonationPreferenceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onDecline()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Donation Preference</DialogTitle>
          <DialogDescription>
            Would you like to receive donations for your organization?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onDecline}>
            No, thanks
          </Button>
          <Button onClick={onAccept}>Yes, I&apos;d like to</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
