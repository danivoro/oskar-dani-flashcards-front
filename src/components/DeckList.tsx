import axios from "axios";
import { useEffect, useState } from "react";
import IDeck from "../Interfaces/IDeck";
import config from "../../utils/config";
import { DeleteIcon } from "@chakra-ui/icons";
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Container,
    Heading,
    IconButton,
    SimpleGrid,
    useToast,
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

    const toast = useToast();
    const showDeckToast = (
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

    async function handleDelete(deck_id: number) {
        try {
            await axios.delete(`${config.baseURL}/decks/${deck_id}`);
            setChangeDeckWatcher((prev) => prev + 1);
            showDeckToast(
                "Done!",
                "Flashcard sucessfully deleted.",
                "info",
                2000
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container maxWidth="300">
                <AddDeck
                    userId={userId}
                    setChangeDeckWatcher={setChangeDeckWatcher}
                />
            </Container>

            <SimpleGrid
                m="5"
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                {decks.map((deck) => (
                    <Card bg="#3f6ea8" key={deck.deck_id}>
                        <CardHeader
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Heading color="white" size="md">
                                {deck.name}
                            </Heading>
                            <IconButton
                                colorScheme="red"
                                aria-label="Call Segun"
                                size="md"
                                icon={<DeleteIcon />}
                                onClick={() => handleDelete(deck.deck_id)}
                            />
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
