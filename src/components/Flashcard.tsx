import {
    Text,
    Card,
    CardBody,
    CardFooter,
    Button,
    Center,
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

    function flipCard() {
        setSide((prev) => (prev === "front" ? "back" : "front"));
    }

    const handleCorrect = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            await axios.patch(`${config.baseURL}/flashcards/${card_id}`, {
                interval: 2,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Center>
                <Card
                    width="500px"
                    height="500px"
                    m="5"
                    align="center"
                    bg={side === "front" ? "#202024" : "#707070"}
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
                        <Button onClick={flipCard} colorScheme="blue">
                            Flip
                        </Button>
                    </CardFooter>
                </Card>
            </Center>
            <Button onClick={(e) => handleCorrect(e)}>Correct</Button>
            <Button>Incorrect</Button>
        </>
    );
}
