"use client";

import { useState } from "react";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { BlurFade } from "../magicui/blur-fade";
import { useNavigate } from "react-router-dom";

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
  const [isLoading] = useState(false);

  const navigate = useNavigate();

  const handleNextStep = () => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setCurrentStep((prev) => prev + 1);
    //   setIsLoading(false);
    // }, 1000);

    setCurrentStep((prev) => prev + 1);
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
              <StepperIndicator color="#f00" />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
      <div className="w-full py-8">{stepContents[currentStep - 1]}</div>
      <div
        className={`w-full flex justify-between items-center space-x-4 ${
          currentStep === 1 ? "justify-end" : ""
        }`}
      >
        {currentStep > 1 && (
          <BlurFade delay={0.2} direction="right" inView>
            <button
              className="flex items-center justify-start w-auto py-3 font-extrabold rounded-lg text-electric border border-electric cursor-pointer btn-neo px-6 gap-2"
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
          </BlurFade>
        )}
        {currentStep < steps.length && (
          <BlurFade delay={0.3} direction="left" inView>
            <button
              className="flex items-center w-auto py-3 font-extrabold rounded-lg text-limeneon border border-limeneon cursor-pointer btn-neo-green px-6 gap-2 justify-end"
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
          </BlurFade>
        )}
        {currentStep === steps.length && (
          <BlurFade delay={0.3} direction="left" inView>
            <button
              className="flex items-center w-auto py-3 font-extrabold rounded-lg text-tealblue border border-tealblue cursor-pointer btn-neo-green px-6 gap-2 justify-end"
              onClick={() => {
                navigate("/my-imports");
              }}
              disabled={currentStep > steps.length}
            >
              Finish uploading
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
