/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : Register.auth.jsx
 * File description: This file contains the Registration form for the app
 * Date : 22/09/2025
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

const Register = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Register Yourself</CardTitle>
                    <CardDescription>
                        Enter your details below to register
                    </CardDescription>
                    <CardAction>
                        <Link to="/auth/login">
                            <Button variant="link">Login</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
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
                                    />
                                </div>
                                <div className="grid gap-2 mt-5 sm:mt-auto">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        required
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
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                    <Link className="w-full" to="/">
                        <Button variant="outline" className="w-full">
                            Go back
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
