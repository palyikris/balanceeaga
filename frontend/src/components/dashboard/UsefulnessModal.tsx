import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface UsefulnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function UsefulnessModal(props: UsefulnessModalProps) {


  const { isOpen, onClose } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-[425px] bg-graphite/90 border border-coolgray">
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription className=" mt-6 text-offwhite/70">
              {props.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-tealblue/10 text-tealblue border border-tealblue/30 hover:bg-tealblue/20 hover:text-tealblue cursor-pointer mt-6"
              >
                Bezárás
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
