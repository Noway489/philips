"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { VoiceInput } from "./VoiceInput";
import { useToast } from "@/hooks/use-toast";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageContext: string;
}

type Question = {
  id: number;
  text: string;
  type: "text" | "textarea";
};

export function FeedbackDialog({
  open,
  onOpenChange,
  pageContext,
}: FeedbackDialogProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchQuestions = async () => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageContext }),
    });
    const data = await res.json();
    if (data.questions) {
      setQuestions(
        data.questions.map((q: string, i: number) => ({
          id: i + 1,
          text: q,
          type: "textarea",
        }))
      );
      setCurrentStep(0);
      setAnswers({});
    }
  };

  useEffect(() => {
    if (open) {
      fetchQuestions();
    } else {
      setQuestions([]);
      setCurrentStep(0);
      setAnswers({});
    }
  }, [open]);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Build an array of responses ordered by the questions array
    const userResponses = questions.map(q => answers[q.id] || "");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the responses as a JSON array along with the questions
        body: JSON.stringify({ pageContext, userResponse: userResponses, questions: questions.map(q => q.text) }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }
      const { sentiment, score } = await res.json();
      toast({
        title: `Sentiment: ${sentiment}`,
        description: `Confidence: ${(score * 100).toFixed(1)}%`,
      });
      onOpenChange(false);
      setAnswers({});
    } catch (err: any) {
      console.error("Feedback submit failed:", err);
      toast({
        title: "Submission failed",
        description: err.message || "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].id]: text,
    }));
  };

  const progress = questions.length
    ? ((currentStep + 1) / questions.length) * 100
    : 0;
  const currentQuestion = questions[currentStep];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogTitle>Feedback</DialogTitle>
        <DialogDescription>
          Answer the following questions to help us improve your experience.
        </DialogDescription>

        {questions.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            intializing Form...
          </p>
        ) : (
          <div className="space-y-6">
            <div>
              <Progress value={progress} className="h-2 bg-gray-100" />
              <p className="text-sm text-muted-foreground mt-2">
                Step {currentStep + 1} of {questions.length}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {currentQuestion.text}
              </h3>

              {currentQuestion.type === "text" ? (
                <Input
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  placeholder="Type your answer here..."
                />
              ) : (
                <Textarea
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  placeholder="Type your detailed feedback here..."
                  className="min-h-[100px]"
                />
              )}

              <VoiceInput
                onTranscript={handleVoiceTranscript}
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={submitting}
                className="min-w-[100px] bg-[#0b5ed7] hover:bg-[#0b5ed7]/90 text-white"
              >
                {submitting
                  ? "Submitting..."
                  : currentStep < questions.length - 1
                  ? "Next"
                  : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
