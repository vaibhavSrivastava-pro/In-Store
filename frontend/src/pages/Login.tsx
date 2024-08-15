"use client";
import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type Props = {}

const Login = (props: Props) => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");

        navigate("/");
    };
    return (
        <div className="flex justify-center items-center flex-col h-screen max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-8 md:p-16 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-5xl text-neutral-800 dark:text-neutral-200 mb-8">
                Welcome Back
            </h2>

            <form className="w-full flex-initial space-y-6" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-6">
                    <Label htmlFor="email" className="text-3xl">Email Address</Label>
                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" className="h-14 text-lg" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-6">
                    <Label htmlFor="password" className="text-3xl">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" className="h-14 text-lg" />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-12 text-lg font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Login &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-10 h-[1px] w-full" />

                <div className="flex flex-col space-y-6">

                    <button
                        className="relative group/btn flex space-x-4 items-center justify-start px-6 w-full text-black rounded-md h-12 text-lg font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="button"
                    >
                        <IconBrandGoogle className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-lg">
                            Login with Google
                        </span>
                        <BottomGradient />
                    </button>

                </div>
            </form>

            <p className="mt-10 text-center text-md text-gray-500">
                Not a member?
                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign up</a>
            </p>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};


export default Login