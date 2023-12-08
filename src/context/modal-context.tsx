import React, { createContext, useContext, useState, ReactNode } from 'react';

import CustomModal from '../components/ui/CustomModal';

import { useAppContext } from './context';

interface ModalContextProps {
    showModal: boolean;
    openModal: (title: string, content: string) => void;
    closeModal: () => void;
    acceptModal: () => void;
    modalContent: {
        title: string;
        content: string;
    };
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const { clearLocalStorage } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        content: ''
    });

    const openModal = (title: string, content: string) => {
        setModalContent({
            title,
            content
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const acceptModal = () => {
        clearLocalStorage();
        closeModal();
    };

    const modalContextValue: ModalContextProps = {
        showModal,
        openModal,
        closeModal,
        acceptModal,
        modalContent
    };

    return (
        <ModalContext.Provider value={modalContextValue}>
            {children}
            <CustomModal />
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
