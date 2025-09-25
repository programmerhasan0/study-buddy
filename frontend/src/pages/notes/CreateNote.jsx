/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : CreateNote.jsx
 * File description: This page will let you create notes by entering the prompt
 * Date : 25/09/2025
 *
 */

import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {ClipLoader} from 'react-spinners';

const CreateNote = () => {
    const {register, handleSubmit} = useForm();
    const [generateLoading, setGenerateLoading] = useState(false);
    const navigate = useNavigate();
    const handleNoteGenerateSubmit = (data) => {
        setGenerateLoading(true);
        axios
            .post(`${import.meta.env.VITE_SERVER_URL}/ai/make-note`, data, {
                withCredentials: true,
            })
            .then((response) => {
                setGenerateLoading(false);
                navigate(`/user/notes/view/${response.data.data}`);
            })
            .catch((error) => {
                console.log('Error happend : ', error);
                setGenerateLoading(false);
            })
            .finally(() => {
                setGenerateLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit(handleNoteGenerateSubmit)}>
            <div className="">
                <Label htmlFor="message" className="mb-3">
                    Enter Prompt for your note
                </Label>
                <div className="relative">
                    <ClipLoader
                        loading={generateLoading}
                        className="absolute top-[50%] left-[50%] -translate-1/2"
                    />
                    <Textarea
                        disabled={generateLoading}
                        placeholder="Type your message here."
                        id="message"
                        {...register('text')}
                    />
                </div>
                <Button
                    type="submit"
                    className="mt-3"
                    disabled={generateLoading}
                >
                    Generate Note
                </Button>
            </div>
        </form>
    );
};

export default CreateNote;
