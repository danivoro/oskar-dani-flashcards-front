import axios from "axios";
import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import IFlashcard from "../Interfaces/IFlashcard";
import config from "../../utils/config";
import { Button, Heading, Center } from "@chakra-ui/react";
import IDeck from "../Interfaces/IDeck";
import AddFlashcard from "./AddFlashcard";

interface FlashcardListProps {
    deckId: number;
    setDeckId: React.Dispatch<React.SetStateAction<number>>;
    deck: IDeck;
}

export default function FlashcardList({
    deckId,
    setDeckId,
    deck,
}: FlashcardListProps): JSX.Element {
    const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
    const baseURL = config.baseURL;
    useEffect(() => {
        const getDeckFlashcards = async () => {
            try {
                const deckFlashcards = await axios.get(
                    `${baseURL}/${deckId}/flashcards`
                );
                setFlashcards(deckFlashcards.data);
            } catch (err) {
                console.error(err);
            }
        };
        getDeckFlashcards();
    }, [baseURL, deckId]);

    return (
        <>
            <Button m="5" onClick={() => setDeckId(0)}>
                ← Back to decks
            </Button>

            <AddFlashcard deckId={deckId} />

            <Center>
                <Heading m="5">{deck.name} Deck</Heading>
            </Center>

            {flashcards.map((card) => (
                <Flashcard key={card.card_id} {...card} />
            ))}
        </>
    );
}
