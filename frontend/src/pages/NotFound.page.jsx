/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : NotFound.page.jsx
 * File description: This file represents the 404 page
 * Date : 22/09/2025
 *
 */

import {Link} from 'react-router';
import {Button} from '@/components/ui/button';

const NotFound = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <img
                src="/page-not-found.svg"
                className="w-3xs sm:w-3md"
                alt="page not found"
            />
            <h2 className="text-xl sm:text-2xl md:text-4xl">
                404! Page Not Found 😪
            </h2>
            <Link className="mt-5" to="/">
                <Button className="w-28">Go to Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
