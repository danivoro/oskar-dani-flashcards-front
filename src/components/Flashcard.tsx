import {
    Text,
    Card,
    CardBody,
    CardFooter,
    Button,
    Center,
    useToast,
} from "@chakra-ui/react";
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
                "success"
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
                "info"
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Center>
                <Card
                    width="400px"
                    height="400px"
                    m="5"
                    align="center"
                    bg={side === "front" ? "#090856" : "#42425F"}
                >
                    <CardBody
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color="white" fontSize="64px">
                            {side === "front" ? front : back}
                        </Text>
                    </CardBody>
                    <CardFooter>
                        {side === "front" ? (
                            <Button m="2" onClick={flipCard} colorScheme="blue">
                                Flip
                            </Button>
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
