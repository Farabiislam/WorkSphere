import React, { use } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const { setUser, loginUser, user, loading, loginWithGoogle } = use(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    if (loading) {
        console.log("from login page")
        return <div className="min-h-screen flex justify-center items-center flex-col">
            Loading...
            <progress className="progress w-56"></progress>
        </div>;
    }
    if (user) {
        return <Navigate to={"/dashboard"} replace />
    }

    const onSubmit = (data) => {
        console.log(data);
        loginUser(data.email, data.password)
            .then((result) => {
                const userr = result.user;
                console.log("firebase User logged in successfully:", userr);
                setUser(userr);
            })
            .catch((error) => {
                console.error("Error logging in:", error);
            });
    };

    const handleGoogleLogin = () => {
        // Use Firebase Auth
        console.log("Logging in with Google...");
    };

    return (
        <div className=" flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className='space-y-4'>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className='space-y-4'>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center justify-between gap-2">
                        <Separator className="flex-1" />
                        <span className="text-xs text-gray-500">OR</span>
                        <Separator className="flex-1" />
                    </div>

                    {/* Google Login */}
                    <Button
                        variant="outline"
                        className="w-full flex items-center gap-2"
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </Button>

                    {/* Extra Links */}
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;