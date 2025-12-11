"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";

import { useRouter } from "next/navigation";

export const ForgotPasswordForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        console.log(values);
        router.push("/verify-otp");
    };

    return (
        <CardWrapper
            headerLabel="Forgot Password"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="mb-4 text-center text-sm text-gray-600">
                Please enter your registered email to receive a verification code.
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900">Email Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
                                            type="email"
                                            className="h-12 border-0 bg-gray-100"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium">
                        Send
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
