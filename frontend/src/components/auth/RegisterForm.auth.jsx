/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : RegisterForm.auth.jsx
 * File description: This file represents the register form
 * Date : 25/09/2025
 *
 */

import {Button} from '@/components/ui/button';
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
import {Link} from 'react-router';
import {useForm} from 'react-hook-form';
import {ClipLoader} from 'react-spinners';

const RegisterForm = ({handleRegisterFormSubmit, regLoading}) => {
    const {
        handleSubmit,
        register,
        watch,
        formState: {errors},
    } = useForm();

    return (
        <div className="relative">
            <ClipLoader
                className="absolute top-[50%] left-[50%] -translate-1/2 z-30"
                loading={regLoading}
            />
            <form
                className="md:flex items-center justify-center h-screen"
                onSubmit={handleSubmit(handleRegisterFormSubmit)}
            >
                <fieldset disabled={regLoading}>
                    <Card className="md:min-w-xl md:max-w-xl">
                        <CardHeader>
                            <CardTitle>Register Yourself</CardTitle>
                            <CardDescription>
                                Enter your details below to register
                            </CardDescription>
                            <CardAction>
                                <Link to="/auth/login">
                                    <Button variant="link" type="button">
                                        Login
                                    </Button>
                                </Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                {/* first name and last name */}
                                <div className="sm:grid grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="firstName">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="John"
                                            required
                                            {...register('firstName')}
                                        />
                                    </div>
                                    <div className="grid gap-2 mt-5 sm:mt-auto">
                                        <Label htmlFor="lastName">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            required
                                            {...register('lastName')}
                                        />
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        {...register('email')}
                                    />
                                </div>
                                {/* Phone number */}
                                <div className="grid gap-2">
                                    <Label htmlFor="phoneNumber">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        type="number"
                                        placeholder="01XXXXXXXXX"
                                        required
                                        {...register('phoneNumber')}
                                    />
                                </div>
                                {/* Password and confirm password */}
                                <div className="sm:grid grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            {...register('password', {
                                                required: true,
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                                    message:
                                                        'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be 6+ characters long',
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className="grid gap-2 mt-2 sm:mt-auto">
                                        <div className="flex items-center">
                                            <Label htmlFor="confirmPassword">
                                                Confirm Password
                                            </Label>
                                        </div>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            required
                                            {...register('confirmPassword', {
                                                required: true,
                                                validate: (value) =>
                                                    value ===
                                                        watch('password') ||
                                                    'Password do not match',
                                            })}
                                        />
                                    </div>
                                </div>
                                <p className="text-red-500 text-sm">
                                    {errors.confirmPassword?.message}
                                </p>
                                {errors.password && (
                                    <p className="text-red-400 text-sm">
                                        {errors.password?.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                disabled={regLoading}
                            >
                                <Link className="w-full" to="/">
                                    Go back
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </fieldset>
            </form>
        </div>
    );
};

export default RegisterForm;
