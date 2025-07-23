import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Navigate } from 'react-router';



const registerSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    emailAddress: z.string().email("Invalid email address").min(1, "Email Address is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    role: z.string().min(1, "Role is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    bankAccountNumber: z.string().min(1, "Bank Account Number is required"),
    monthlySalary: z.number().min(0, "Salary must be non-negative"),
    designation: z.string().min(1, "Designation is required"),
    profilePhoto: z.string().min(1, "Profile Photo is required"),
});

const Register = () => {
    const { createUser, setUser, user, loading, updateUser } = use(AuthContext)
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            emailAddress: "",
            phoneNumber: "",
            role: "",
            password: "",
            bankAccountNumber: "",
            monthlySalary: 0,
            designation: "",
            profilePhoto: imageUrl,
            created_at: new Date().toISOString()
        },
    });
    if (loading) {
        return <div className="min-h-screen flex justify-center items-center flex-col">Loading... <progress className="progress w-56"></progress></div>;
    }
    if (user) {
        return <Navigate to={"/dashboard"} replace />
    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            if (url) {
                setImageUrl(url);
                form.setValue("profilePhoto", url);
                console.log("Image uploaded successfully!");
            }

        } catch (err) {
            console.log("Upload failed");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (data) => {

        data.profilePhoto = imageUrl;
        console.log("Form data:", data);

        createUser(data.emailAddress, data.password)
            .then(async (result) => {
                const userr = result.user;
                console.log("firebase User created successfully:", userr);
                const user_registrationData = {
                    fullName: data.fullName,
                    emailAddress: userr.email,
                    phoneNumber: data.phoneNumber,
                    role: data.role,
                    bankAccountNumber: data.bankAccountNumber,
                    monthlySalary: data.monthlySalary,
                    designation: data.designation,
                    profilePhoto: data.profilePhoto,
                    created_at: new Date().toISOString()
                };
                const registeredUser = await axios.post(`${import.meta.env.VITE_API_URL}/register`, user_registrationData);
                console.log("User registered on mongodb successfully:", registeredUser);
                updateUser(data.fullName, data.profilePhoto).then(() => {
                    // Reload user to get updated data
                    auth.currentUser.reload();
                }).then(() => {
                    console.log(userr)
                    //toast.success("sucessfully Registered! ")
                    setUser({ ...auth.currentUser });

                    // toast.success("sucessfully Registered! ")

                }).catch((error) => {
                    // toast.error(error)
                })

                // console.log(user)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode,errorMessage)
                // ..
                //toast.error(errorMessage)
            });
    };
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg rounded-lg">
                <CardHeader className="text-center pb-6">
                    <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                        Join WorkSphere and start managing your workforce efficiently. Register as an Employee or HR to access role-specific features.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your full name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Address */}
                                <FormField
                                    control={form.control}
                                    name="emailAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address *</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter your email address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone Number */}
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+1 (555) 123-4567" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password *</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Role */}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {/* <SelectItem value="admin">Admin</SelectItem> */}
                                                    <SelectItem value="employee">Employee</SelectItem>
                                                    <SelectItem value="hr">HR</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Bank Account Number */}
                                <FormField
                                    control={form.control}
                                    name="bankAccountNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bank Account Number *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter bank account number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Monthly Salary */}
                                <FormField
                                    control={form.control}
                                    name="monthlySalary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Monthly Salary *</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="50,000" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Designation */}
                                <FormField
                                    control={form.control}
                                    name="designation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Designation *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Select or type your designation" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Profile Photo */}
                                <FormField
                                    control={form.control}
                                    name="profilePhoto"
                                    render={({ field: { value, onChange, ...fieldProps } }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Profile Photo *</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                                    <input
                                                        type="file"
                                                        id="profilePhoto"
                                                        className="hidden"
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        onChange={handleImageChange}
                                                        {...fieldProps}
                                                    />
                                                    <Label htmlFor="profilePhoto" className="flex flex-col items-center cursor-pointer">
                                                        {!imageUrl ?
                                                            (<>
                                                                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </>) :
                                                            (<>
                                                                <img
                                                                    src={imageUrl}
                                                                    alt="Uploaded profile"
                                                                    className="mt-3 w-20 h-20  object-cover border shadow"
                                                                />
                                                            </>)
                                                        }
                                                        <span className="mt-2 text-sm font-medium text-gray-600">{imageUrl ? "Profile Photo uploaded" : "Upload Profile Photo"}</span>
                                                        <p className="mt-4 border px-8 py-2">{isUploading ? "Uploading..." : "Choose File"}</p>
                                                        <span className="text-xs text-gray-500">PNG, JPG or JPEG up to 5MB</span>
                                                    </Label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <Button type="button" variant="outline" onClick={() => { form.reset(); setImageUrl(""); }}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Create Account
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;