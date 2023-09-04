import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import config from "../../utils/config";
import IUser from "../Interfaces/IUser";

interface DeleteUserProps {
    setRenderCounter: React.Dispatch<React.SetStateAction<number>>;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
    userId: number;
    currentUser: IUser;
    setDeckId: React.Dispatch<React.SetStateAction<number>>;
}

export default function DeleteUser({
    userId,
    currentUser,
    setUserId,
    setRenderCounter,
    setDeckId,
}: DeleteUserProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const toast = useToast();
    const showUserToast = (
        title: string,
        description: string,
        status:
            | "info"
            | "warning"
            | "success"
            | "error"
            | "loading"
            | undefined,
        duration: number
    ) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: duration,
            isClosable: true,
        });
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`${config.baseURL}/users/${userId}`);
            showUserToast(
                "User deleted.",
                `${currentUser.name} is deleted from the app.`,
                "success",
                2000
            );
            setUserId(0);
            setDeckId(0);
            setRenderCounter((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Button minWidth="120px" m="5" colorScheme="red" onClick={onOpen}>
                Delete User
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Warning</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text>
                            {`This will remove ${currentUser.name} along with all their decks
                            and flashcards inside. Are you sure?`}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleDeleteUser}
                            colorScheme="red"
                            mr={3}
                        >
                            Yes
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
