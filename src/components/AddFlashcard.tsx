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

interface AddFlashcardProps {
    deckId: number;
    setChangeCardWatcher: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddFlashcard({
    deckId,
    setChangeCardWatcher,
}: AddFlashcardProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const toast = useToast();
    const showCardToast = () => {
        toast({
            title: "Card created.",
            description: "The new card is added to your deck",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    const handleAddCard = async () => {
        try {
            await axios.post(`${config.baseURL}/flashcards`, {
                front,
                back,
                deck_id: deckId,
            });
            setFront("");
            setBack("");
            showCardToast();
            setChangeCardWatcher((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = () => {
        onClose();
        setFront("");
        setBack("");
    };

    return (
        <>
            <Button m="5" bg="green" color="white" onClick={onOpen}>
                + Add card
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new flashcard</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Front</FormLabel>
                            <Input
                                ref={initialRef}
                                value={front}
                                onChange={(e) => setFront(e.target.value)}
                                placeholder="Flashcard front"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Back</FormLabel>
                            <Input
                                value={back}
                                onChange={(e) => setBack(e.target.value)}
                                placeholder="Flashcard back"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleAddCard}
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
