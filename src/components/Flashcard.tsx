import { Text, Card, CardBody, CardFooter, Button } from "@chakra-ui/react";
import IFlashcard from "../Interfaces/IFlashcard";
import { useState } from "react";

export default function Flashcard({ front, back }: IFlashcard): JSX.Element {
    const [side, setSide] = useState<"front" | "back">("front");

    function flipCard() {
        setSide((prev) => (prev === "front" ? "back" : "front"));
    }

    return (
        <>
            <Card
                m="5"
                align="center"
                bg={side === "front" ? "#202024" : "#707070"}
            >
                <CardBody>
                    <Text color="white">{side === "front" ? front : back}</Text>
                </CardBody>
                <CardFooter>
                    <Button onClick={flipCard} colorScheme="blue">
                        Flip
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
