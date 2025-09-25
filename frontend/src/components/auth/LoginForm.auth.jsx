/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : LoginForm.auth.jsx
 * File description: This file represent the Login Form
 * Date : 22/09/2025
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
import {Link} from 'react-router';

const LoginForm = ({handleFormSubmit}) => {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="w-screen h-screen flex justify-center items-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Link to="/auth/register">
                                <Button variant="link" type="button">
                                    Register
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
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    {...register('password')}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Link className="w-full" to="/">
                            <Button variant="outline" className="w-full">
                                Go back
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </form>
    );
};

export default LoginForm;
