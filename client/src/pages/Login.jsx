import React, { use } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const { setUser, loginUser, user, loading, setLoading, loginWithGoogle } = use(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/dashboard';
    const queryClient = useQueryClient();
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
                navigate(from);
            })
            .catch((error) => {
                console.error("Error logging in:", error);
            });
    };

    const handleGoogleLogin = () => {
        console.log("Logging in with Google...");
        loginWithGoogle()
            .then(async (result) => {
                const userr = result.user;
                setUser(userr);
                setLoading(true);
                const user_registrationData = {
                    fullName: userr.displayName,
                    emailAddress: userr.email,
                    phoneNumber: "",
                    role: "employee",
                    bankAccountNumber: "",
                    monthlySalary: "",
                    designation: "",
                    profilePhoto: "",
                    created_at: new Date().toISOString()
                };

                const isUserExists = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${userr.email}`);
                console.log("User already exists:", isUserExists.data);
                
                if (isUserExists.data.user === false) {
                    const registeredUser = await axios.post(`${import.meta.env.VITE_API_URL}/register`, user_registrationData);
                    console.log("Google User logged in with first time registration successfully:", registeredUser.data);
                    await queryClient.refetchQueries({ queryKey: ['role', userr.email] });
                    setLoading(false);

                } else {
                    console.log("Google User logged in successfully:", userr);
                    setLoading(false);

                }

            })
            .catch((error) => {
                console.error("Error logging in with Google:", error);
            });

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