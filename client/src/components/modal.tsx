import React from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    {title && <h2 className="text-xl font-bold">{title}</h2>}
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                <div className="mb-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
