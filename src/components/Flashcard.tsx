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

export default function Flashcard({
    card_id,
    front,
    back,
    next_review,
    interval,
}: IFlashcard): JSX.Element {
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

    const handleCorrect = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        showToast(
            "Congrats!",
            "You won't see this card again today",
            "success"
        );
        try {
            await axios.patch(`${config.baseURL}/flashcards/${card_id}`, {
                interval: 2,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleIncorrect = () => {
        showToast(
            "Oops!",
            "You will need to go over this again today.",
            "info"
        );
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
                                    onClick={(e) => handleCorrect(e)}
                                >
                                    Correct
                                </Button>
                                <Button
                                    m="2"
                                    colorScheme="red"
                                    onClick={(e) => handleIncorrect()}
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
