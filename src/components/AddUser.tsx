import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import config from "../../utils/config";

interface AddUserProps {
    setRenderCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddUser({
    setRenderCounter,
}: AddUserProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState("");

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const toast = useToast();
    const showUserToast = (
        title: string,
        description: string,
        status: "info" | "warning" | "success" | "error" | "loading" | undefined
    ) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 9000,
            isClosable: true,
        });
    };

    const handleAddUser = async () => {
        if (!user.trim()) {
            showUserToast(
                "User name cannot be empty.",
                "Please, try to enter a valid name for the user",
                "error"
            );
            return;
        }
        if (user.length < 2) {
            showUserToast(
                "User name is too short.",
                "Please, try to enter a name at least two characters long",
                "error"
            );
            return;
        }
        try {
            await axios.post(`${config.baseURL}/users`, {
                user_name: user,
            });
            showUserToast(
                "User created.",
                "The new user is created in the app",
                "success"
            );
            setUser("");
            setRenderCounter((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = () => {
        onClose();
        setUser("");
    };

    return (
        <>
            <Button
                minWidth="110px"
                m="5"
                bg="green"
                color="white"
                onClick={onOpen}
            >
                + Add User
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>User name</FormLabel>
                            <Input
                                ref={initialRef}
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                placeholder="User name"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleAddUser}
                            colorScheme="blue"
                            mr={3}
                        >
                            Save
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
