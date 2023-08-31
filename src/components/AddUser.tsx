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

export default function AddUser(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState("");

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const toast = useToast();
    const showUserToast = () => {
        toast({
            title: "User created.",
            description: "The new user is created in the app",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    const handleAddUser = async () => {
        try {
            await axios.post(`${config.baseURL}/users`, {
                user_name: user,
            });
            showUserToast();
            setUser("");
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
            <Button m="5" bg="green" color="white" onClick={onOpen}>
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
