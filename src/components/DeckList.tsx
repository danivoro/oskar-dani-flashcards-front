import axios from "axios";
import { useEffect } from "react";
import IDeck from "../Interfaces/IDeck";
import config from "../../utils/config";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";

interface DeckListProps {
    userId: number;
    setDeckId: React.Dispatch<React.SetStateAction<number>>;
    decks: IDeck[];
    setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>;
}

export default function DeckList({
    userId,
    setDeckId,
    decks,
    setDecks,
}: DeckListProps): JSX.Element {
    const baseURL = config.baseURL;
    useEffect(() => {
        const getUserDecks = async () => {
            try {
                const userDecks = await axios.get(`${baseURL}/decks/${userId}`);
                console.table(userDecks.data);
                setDecks(userDecks.data);
            } catch (err) {
                console.error(err);
            }
        };
        getUserDecks();
    }, [baseURL, userId, setDecks]);

    return (
        <>
            <SimpleGrid
                m="5"
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                {decks.map((deck) => (
                    <Card key={deck.deck_id}>
                        <CardHeader>
                            <Heading size="md">{deck.name}</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>Deck description here.</Text>
                        </CardBody>
                        <CardFooter>
                            <Button
                                value={deck.deck_id}
                                onClick={(e) =>
                                    setDeckId(parseInt(e.currentTarget.value))
                                }
                            >
                                Study now
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </SimpleGrid>
        </>
    );
}
