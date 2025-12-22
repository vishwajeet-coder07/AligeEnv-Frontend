"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { removeAuthCookie } from "@/features/auth/actions/auth";
const DashboardPage = () => {
    const router = useRouter();
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600">Welcome to your dashboard!</p>
                <Button className="mt-4" onClick={() => {
                    removeAuthCookie("access_token", "refresh_token", "user");
                    router.push("/login")
                }}>Logout</Button>
            </div>
        </div>
    );
}

export default DashboardPage;
