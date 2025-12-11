"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

import { useRouter } from "next/navigation";

export const VerifyOtpForm = () => {
    const router = useRouter();
    const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(""));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        if (pastedData.every(char => !isNaN(Number(char)))) {
            const newOtp = [...otp];
            pastedData.forEach((val, i) => {
                if (i < 6) newOtp[i] = val;
            });
            setOtp(newOtp);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    return (
        <Card className="w-full max-w-md border-none shadow-none">
            <CardHeader className="flex flex-col items-center justify-center space-y-2 p-0 pb-10">
                <h1 className="text-3xl font-semibold text-black">Verify With OTP</h1>
                <p className="text-sm text-center text-gray-600">
                    Please enter the OTP sent to <span className="text-[#0057E5] underline">abc@xyz.com</span>
                </p>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex w-full flex-col gap-6">
                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={data}
                                ref={(el) => { inputRefs.current[index] = el }}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="h-12 w-12 rounded-lg bg-gray-100 text-center text-xl font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#0057E5]"
                            />
                        ))}
                    </div>

                    <Button
                        className="w-full bg-[#0057E5] text-lg font-medium hover:bg-[#0046b8]"
                        size="lg"
                        onClick={() => router.push("/reset-password")}
                    >
                        Enter OTP
                    </Button>


                    <Button variant="outline" className="w-full border-blue-200 text-[#0057E5] hover:bg-blue-50" size="lg">
                        Resend OTP in 30s
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
