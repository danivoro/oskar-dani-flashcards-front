import axios from "axios";
import { useEffect, useState } from "react";
import IDeck from "../Interfaces/IDeck";
import config from "../../utils/config";
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import AddDeck from "./AddDeck";

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
    const [changeDeckWatcher, setChangeDeckWatcher] = useState(0);

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
    }, [baseURL, userId, setDecks, changeDeckWatcher]);

    return (
        <>
            <SimpleGrid
                m="5"
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                <AddDeck
                    userId={userId}
                    setChangeDeckWatcher={setChangeDeckWatcher}
                />
                {decks.map((deck) => (
                    <Card bg="#3f6ea8" key={deck.deck_id}>
                        <CardHeader>
                            <Heading color="white" size="md">
                                {deck.name}
                            </Heading>
                        </CardHeader>
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
