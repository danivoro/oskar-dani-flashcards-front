import { Text, Card, CardBody, CardFooter, Button } from "@chakra-ui/react";
import IFlashcard from "../Interfaces/IFlashcard";

export default function Flashcard({ front, back }: IFlashcard): JSX.Element {
    return (
        <>
            <Card align="center" bg="#202024">
                <CardBody>
                    <Text color="white">{front}</Text>
                </CardBody>
                <CardFooter>
                    <Button colorScheme="blue">View here</Button>
                </CardFooter>
            </Card>
            <Card align="center" bg="#202024">
                <CardBody>
                    <Text color="white">{back}</Text>
                </CardBody>
                <CardFooter>
                    <Button colorScheme="blue">View here</Button>
                </CardFooter>
            </Card>
        </>
    );
}
