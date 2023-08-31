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

export default function Flashcard({ front, back }: IFlashcard): JSX.Element {
    const [side, setSide] = useState<"front" | "back">("front");

    function flipCard() {
        setSide((prev) => (prev === "front" ? "back" : "front"));
    }

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
        </>
    );
}
