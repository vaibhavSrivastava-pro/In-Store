"use client";
import Button from "./Button";
import { CardBody, CardContainer, CardItem } from "./3d-card";

interface ThreeDCardDemoProps {
    title: string;
    brief: string;
    button: string;
    link: string;
}

export const ThreeDCardDemo: React.FC<ThreeDCardDemoProps> = ({ title, brief, button, link }) => {
    return (
        <CardContainer className="inter-var flex justify-center items-center w-full">
            <CardBody className="bg-gray-50 dark:bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-full max-w-md flex flex-col justify-between rounded-xl p-6 sm:p-8 mx-2 border">
                <div>
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        {title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                    >
                        {brief}
                    </CardItem>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <CardItem
                        translateZ="50"
                        as="button"
                    >
                        <Button value={button} link={link} />
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
