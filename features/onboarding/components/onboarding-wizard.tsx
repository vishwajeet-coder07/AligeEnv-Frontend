"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setWorkspaceName } from "@/lib/features/onboarding/onboarding-Slice"
import { WorkspaceStepName } from "./steps/workspaceName-step"
import { WorkspaceStepWork } from "./steps/work-option"
import { WorkspaceStepFeature } from "./steps/feature-option"
import { cn } from "@/lib/utils"

type OnboardingData = {
    workspaceName: string
}

interface OnboardingWizardProps {
    step: number;
    onStepChange: (step: number) => void;
}

export default function OnboardingWizard({ step, onStepChange }: OnboardingWizardProps) {
    const dispatch = useAppDispatch()
    const { workspaceName } = useAppSelector((state) => state.onboarding)

    const nextStep = () => onStepChange(step + 1)
    const prevStep = () => onStepChange(step - 1)

    const handleWorkspaceSubmit = (workspaceData: { name: string }) => {
        dispatch(setWorkspaceName(workspaceData.name))
        nextStep()
    }

    return (
        <div className={cn(
            "w-full pb-[3rem] pt-[2rem] px-1",
            step === 2 ? "sm:px-[6rem]" : "px-1"
        )}>

            {step === 0 && (
                <WorkspaceStepName
                    onNext={handleWorkspaceSubmit}
                    initialData={{ name: workspaceName }}
                />
            )}
            {step === 1 && (
                <WorkspaceStepWork
                    onNext={handleWorkspaceSubmit}
                    onBack={prevStep}
                    initialData={{ name: workspaceName }}
                />
            )}

            {step === 2 && (
                <WorkspaceStepFeature
                    onNext={handleWorkspaceSubmit}
                    onBack={prevStep}
                    initialData={{ name: workspaceName }}
                />
            )}
        </div>
    )
}
