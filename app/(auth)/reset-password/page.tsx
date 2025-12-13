
import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password-form";

const ResetPasswordPage = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <NewPasswordForm />
            </Suspense>
        </div>
    );
}

export default ResetPasswordPage;
