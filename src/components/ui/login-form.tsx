"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
// Assuming these are your shadcn/ui components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/dashboard'; // Default redirect is /dashboard
    
    // Check if the current route is a modal route (e.g., checking for the login path in the URL)
    // We assume the modal is opened via a parallel route.
    const isModalOpen = window.location.pathname === '/login' || window.location.pathname.includes('/login');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!apiUrl) {
            console.error("BASE_URL environment variable is not set.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Login failed with status:", response.status, errorData);
                // Optionally show an error message on the form here
                return;
            }
            
            const result = await response.json();
            console.log("Login successful! Token/User data:", result);
            
            // 🚀 SUCCESS LOGIC: CLOSE MODAL AND REDIRECT
            if (isModalOpen) {
                // 1. Close the modal (removes the parallel route from the URL)
                router.back(); 
            }
            
            // Wait briefly for the modal state to clear before navigating
            // This small delay can help ensure the routing transition is clean.
            setTimeout(() => {
                // 2. Redirect to the intended page (dashboard or specified path)
                router.push(redirectTo);
            }, 100); 

        } catch (error) {
            console.error("Network or Fetch Error:", error);
        }
    };

    // ... (Form JSX remains the same)
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@domain.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 5, // Changed from 5 to 6 to match message
                                    message: "Password must be at least 5 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default LoginForm;