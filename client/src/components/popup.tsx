import React, { useEffect } from "react";
import { AiFillCheckCircle, AiFillWarning, AiFillCloseCircle } from "react-icons/ai"; // Import icons

interface PopupProps {
    message: string;
    duration: number;
    setIsVisible: (bool: boolean) => void;
    type: 'error' | 'warning' | 'success';
}

const Popup: React.FC<PopupProps> = ({ message, duration, setIsVisible, type }) => {

    // Hide popup after specified duration
    useEffect(() => {
        console.log(type)
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, setIsVisible]);

    // Dynamic styles and icon based on the type
    const getPopupStyles = () => {
        switch (type) {
            case 'success':
                return 'border-green-700';
            case 'error':
                return 'border-red-400';
            case 'warning':
                return 'border-yellow-300';
            default:
                return '';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <AiFillCheckCircle className="mr-2 text-xl" />;
            case 'error':
                return <AiFillCloseCircle className="mr-2 text-xl text-red-700" />;
            case 'warning':
                return <AiFillWarning className="mr-2 text-xl text-yellow-400" />;
            default:
                return null;
        }
    };

    return (
        <div className={`absolute bottom-5 right-2 flex items-center text-white px-5 py-2 rounded-md shadow-lg border-2 ${getPopupStyles()}`}>
            {getIcon()} {/* Display the appropriate icon */}
            <span>{message}</span>
        </div>
    );
};

export default Popup;
