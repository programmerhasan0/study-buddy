/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ForgetPassword.auth.jsx
 * File description: This file shows the form for password reset
 * Date : 26/09/2025
 *
 */

import {Button} from '@/components/ui/button';
import {useForm} from 'react-hook-form';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Link, useNavigate, useSearchParams} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useState} from 'react';
import {ClipLoader} from 'react-spinners';

const ForgetPassword = () => {
    const {
        handleSubmit,
        register,
        watch,
        formState: {errors},
        reset,
    } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleEmailSubmit = (data) => {
        setLoading(true);
        axios
            .post(
                `${import.meta.env.VITE_SERVER_URL}/auth/forget-password`,
                data,
                {withCredentials: true}
            )
            .then((response) => {
                toast.success('Reset link sent! Please check your mail inbox');
                reset();
            })
            .catch((error) => {
                if (error.response.data.status === 404) {
                    toast.error(error.response.data.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleUpdatePassword = (data) => {
        setLoading(true);
        data.token = token;
        axios
            .patch(
                `${import.meta.env.VITE_SERVER_URL}/auth/update-password`,
                data,
                {withCredentials: true}
            )
            .then((response) => {
                navigate('/auth/login', {
                    state: {from: '/auth/forget-password', reset: true},
                });
            })
            .catch((error) => {
                if (error.response.data.status === 400) {
                    const params = new URLSearchParams(searchParams);
                    params.delete('token');
                    setSearchParams(params);
                    toast.error(error.response.data.message);
                    reset();
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="relative">
            <ClipLoader
                className="absolute top-1/2 left-1/2 -translate-1/2"
                loading={loading}
            />
            {token && token.length > 1 ? (
                <div className="update-password-form">
                    {/* Update Password form will be here */}
                    <form onSubmit={handleSubmit(handleUpdatePassword)}>
                        <div className="w-screen h-screen flex justify-center items-center">
                            <Card className="w-full max-w-sm">
                                <CardHeader>
                                    <CardTitle>Enter new Password</CardTitle>
                                    <CardDescription>
                                        Enter same password in these fields
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="****"
                                                required
                                                {...register('password', {
                                                    required: true,
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                                        message:
                                                            'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be 6+ characters long',
                                                    },
                                                })}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6 mt-3">
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirmPassword">
                                                Confirm Password
                                            </Label>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="****"
                                                required
                                                {...register(
                                                    'confirmPassword',
                                                    {
                                                        required: true,
                                                        validate: (value) =>
                                                            value ===
                                                                watch(
                                                                    'password'
                                                                ) ||
                                                            'Password do not match',
                                                    }
                                                )}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex-col gap-2">
                                    <div>
                                        <p className="text-red-400 text-sm">
                                            {errors.confirmPassword?.message}
                                        </p>
                                        {errors.password && (
                                            <p className="text-red-400 text-sm">
                                                {errors.password?.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loading}
                                    >
                                        Reset
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="email-form">
                    <form onSubmit={handleSubmit(handleEmailSubmit)}>
                        <div className="w-screen h-screen flex justify-center items-center">
                            <Card className="w-full max-w-sm">
                                <CardHeader>
                                    <CardTitle>Reset your password</CardTitle>
                                    <CardDescription>
                                        Enter your email below to get
                                        verification link
                                    </CardDescription>
                                    <CardAction>
                                        <Link to="/auth/login">
                                            <Button
                                                variant="link"
                                                type="button"
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                    </CardAction>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                                {...register('email')}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex-col gap-2">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loading}
                                    >
                                        Sent reset link
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
