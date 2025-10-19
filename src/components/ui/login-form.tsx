"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"; // 🔑 Import SubmitHandler
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
    const redirectTo = searchParams.get('redirect') || '/dashboard';

    const isModalOpen = window.location.pathname === '/login' || window.location.pathname.includes('/login');

    const {
        register,
        handleSubmit,
        setError, // 🔑 1. Expose setError function
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        // RHF automatically clears previously set server errors at the start of submission, 
        // but it's good practice to clear the 'root' error explicitly if necessary.
        setError("root", { type: 'manual', message: '' });

        const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!apiUrl) {
            console.error("BASE_URL environment variable is not set.");
            // 🔑 Set configuration error on the 'root'
            setError("root", { type: "manual", message: "Configuration Error: API base URL not set." });
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

                // 🔑 2. Handle API Errors
                const errorMessage = errorData.message || `Login failed with status: ${response.status}`;

                if (response.status === 401 || response.status === 403) {
                    // For credential errors, target the specific field (password)
                    setError('password', {
                        type: 'server',
                        message: errorMessage,
                    });
                } else {
                    // For other errors (e.g., 500, other bad requests), target the 'root'
                    setError("root", {
                        type: 'server',
                        message: `Server Error: ${errorMessage}`
                    });
                }
                return;
            }

            const result = await response.json();
            console.log("Login successful! Token/User data:", result);

            // 🚀 SUCCESS LOGIC
            if (isModalOpen) {
                router.back();
            }

            setTimeout(() => {
                router.push(redirectTo);
            }, 100);

        } catch (error) {
            // 🔑 3. Handle Network/Fetch Errors on the 'root'
            console.error("Network or Fetch Error:", error);
            setError("root", {
                type: 'server',
                message: "A network error occurred. Check your connection or server status."
            });
        }
    };

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

                    {/* 🔑 4. Display the RHF Root Error */}
                   

                    {/* Email Field (remains the same) */}
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

                    {/* Password Field (remains the same) */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 5,
                                    message: "Password must be at least 5 characters",
                                },
                            })}
                        />
                        {/* This single line now handles RHF validation errors AND server-side credential errors (401/403) */}
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