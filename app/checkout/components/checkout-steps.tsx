import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { id: 1, name: "Shipping", description: "Delivery information" },
  { id: 2, name: "Payment", description: "Payment method" },
  { id: 3, name: "Review", description: "Review & place order" },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className={cn("relative", stepIdx !== steps.length - 1 && "pr-8 sm:pr-20")}>
              <div className="flex items-center">
                <div className="relative flex h-8 w-8 items-center justify-center">
                  {step.id < currentStep ? (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary-foreground" />
                    </div>
                  ) : step.id === currentStep ? (
                    <div className="h-8 w-8 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-medium">{step.id}</span>
                    </div>
                  )}
                </div>
                <div className="ml-4 min-w-0">
                  <p className={cn("text-sm font-medium", step.id <= currentStep ? "text-primary" : "text-gray-500")}>
                    {step.name}
                  </p>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
