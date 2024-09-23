"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormSubmitVariants =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: FormSubmitVariants;
}

export const FormSubmit = ({
    variant = "primary",
    className,
    disabled,
    children,
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            size="sm"
            className={cn(className)}
        >
            {children}
        </Button>
    );
};
