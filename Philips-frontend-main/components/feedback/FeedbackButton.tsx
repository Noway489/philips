"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeedbackButtonProps {
  onClick: () => void;
  className?: string;
}

export function FeedbackButton({ onClick, className }: FeedbackButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "fixed bottom-6 right-6 shadow-lg rounded-full p-4 bg-[#0b5ed7] hover:bg-[#0b5ed7]/90 transition-all duration-200 hover:scale-105 text-white",
        className
      )}
    >
      <MessageSquarePlus className="w-6 h-6" />
      <span className="ml-2">Feedback</span>
    </Button>
  );
}