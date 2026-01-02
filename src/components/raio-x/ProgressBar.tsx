"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative h-2 bg-[var(--neutral-200)] dark:bg-[var(--neutral-700)] rounded-full overflow-hidden mb-4">
        <div
          className="absolute h-full bg-gradient-to-r from-[var(--brand-verde)] to-[var(--brand-verde-escuro)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="hidden md:flex justify-between">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              index <= currentStep ? "text-[var(--brand-verde-escuro)]" : "text-[var(--muted)]"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 ${
                index < currentStep
                  ? "bg-[var(--brand-verde)] text-white"
                  : index === currentStep
                  ? "bg-[var(--brand-verde-escuro)] text-white ring-4 ring-[var(--brand-verde-escuro)]/20"
                  : "bg-[var(--neutral-200)] dark:bg-[var(--neutral-700)] text-[var(--muted)]"
              }`}
            >
              {index < currentStep ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="text-xs font-medium hidden lg:block">{label}</span>
          </div>
        ))}
      </div>

      {/* Mobile Step Counter */}
      <div className="md:hidden text-center">
        <span className="text-sm font-medium text-[var(--muted-foreground)]">
          Etapa {currentStep + 1} de {totalSteps}:{" "}
          <span className="text-[var(--brand-verde-escuro)] font-semibold">
            {stepLabels[currentStep]}
          </span>
        </span>
      </div>
    </div>
  );
}

