import {
    Text,
    Card,
    CardBody,
    CardFooter,
    Button,
    Center,
    useToast,
    IconButton,
    CardHeader,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import IFlashcard from "../Interfaces/IFlashcard";
import { useState } from "react";
import axios from "axios";
import config from "../../utils/config";

interface FlashcardProps extends IFlashcard {
    setChangeCardWatcher: React.Dispatch<React.SetStateAction<number>>;
}

export default function Flashcard({
    card_id,
    front,
    back,
    streak,
    setChangeCardWatcher,
}: FlashcardProps): JSX.Element {
    const [side, setSide] = useState<"front" | "back">("front");

    const toast = useToast();
    const showToast = (
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

    function flipCard() {
        setSide((prev) => (prev === "front" ? "back" : "front"));
    }

    const handleCorrect = async () => {
        try {
            console.log("Doing this");
            await axios.patch(`${config.baseURL}/flashcards/${card_id}`, {
                streak: streak + 1,
            });
            setChangeCardWatcher((prev) => prev + 1);
            setSide("front");
            showToast(
                "Congrats!",
                "You won't see this card again today",
                "success",
                2000
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleIncorrect = async () => {
        try {
            console.log("Doing this");
            await axios.patch(`${config.baseURL}/flashcards/${card_id}`, {
                streak: 0,
            });
            setChangeCardWatcher((prev) => prev + 1);
            setSide("front");
            showToast(
                "Oops!",
                "You will need to go over this again today.",
                "info",
                2000
            );
        } catch (err) {
            console.error(err);
        }
    };

    async function handleDelete() {
        try {
            await axios.delete(`${config.baseURL}/flashcards/${card_id}`);
            setChangeCardWatcher((prev) => prev + 1);
            setSide("front");
            showToast("Done!", "Flashcard sucessfully deleted.", "info", 2000);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Center>
                <Card
                    display="flex"
                    alignItems="center"
                    width="400px"
                    height="400px"
                    m="5"
                    bg={side === "front" ? "#090856" : "#42425F"}
                >
                    <CardHeader alignSelf="flex-end">
                        <IconButton
                            colorScheme="red"
                            aria-label="Call Segun"
                            size="md"
                            icon={<DeleteIcon />}
                            onClick={handleDelete}
                        />
                    </CardHeader>
                    <CardBody display="flex" alignItems="center">
                        <Text color="white" fontSize="64px">
                            {side === "front" ? front : back}
                        </Text>
                    </CardBody>
                    <CardFooter>
                        {side === "front" ? (
                            <>
                                <Button
                                    m="2"
                                    onClick={flipCard}
                                    colorScheme="blue"
                                >
                                    Flip
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    m="2"
                                    colorScheme="green"
                                    onClick={() => handleCorrect()}
                                >
                                    Correct
                                </Button>
                                <Button
                                    m="2"
                                    colorScheme="red"
                                    onClick={() => handleIncorrect()}
                                >
                                    Incorrect
                                </Button>
                                <Button
                                    m="2"
                                    onClick={flipCard}
                                    colorScheme="blue"
                                >
                                    Flip Back
                                </Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            </Center>
        </>
    );
}
