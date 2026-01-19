import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => window.open("https://wa.me/919876543210", "_blank")}
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Chat on WhatsApp</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => window.location.href = "tel:+919876543210"}
          >
            <Phone className="w-7 h-7 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Call Us Now</TooltipContent>
      </Tooltip>
    </div>
  );
}
