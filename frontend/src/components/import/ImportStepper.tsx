"use client";

import { useState } from "react";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";

interface ImportStepperProps {
  steps: number[];
  stepContents: React.ReactNode[];
  initialStep?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function ImportStepper(props: ImportStepperProps) {

  const { steps, stepContents, initialStep = 1 } = props;

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full px-20 space-y-8 text-center">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map((step) => (
          <StepperItem
            key={step}
            step={step}
            className="not-last:flex-1"
            loading={isLoading}
          >
            <StepperTrigger asChild>
              <StepperIndicator />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
      <div className="w-full py-8">{stepContents[currentStep - 1]}</div>
      <div className="w-full flex justify-between items-center space-x-4">
        <button
          className="flex items-center justify-start w-80 py-3 font-extrabold rounded-lg text-electric border border-electric cursor-pointer btn-neo px-6 gap-2"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          Prev step
        </button>
        <button
          className="flex items-center w-80 py-3 font-extrabold rounded-lg text-limeneon border border-limeneon cursor-pointer btn-neo-green px-6 gap-2 justify-end"
          onClick={handleNextStep}
          disabled={currentStep > steps.length}
        >
          Next step
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
