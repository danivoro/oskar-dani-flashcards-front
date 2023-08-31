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
    const [changeCardWatcher, setChangeCardWatcher] = useState(0);
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
    }, [baseURL, deckId, changeCardWatcher]);

    const today = new Date().toISOString().split("T")[0];

    const flashcardsToReview = flashcards.filter((card) => {
        console.log(card.front);
        console.log(`Next review is ${card.next_review}`);
        console.log(`Today is ${new Date()}`);

        return card.next_review.toString().split("T")[0] <= today;
    });

    return (
        <>
            <Button m="5" onClick={() => setDeckId(0)}>
                ← Back to decks
            </Button>

            <AddFlashcard
                deckId={deckId}
                setChangeCardWatcher={setChangeCardWatcher}
            />

            <Center>
                <Heading m="5" fontSize="36px">
                    Your {deck.name} Deck
                </Heading>
            </Center>

            {flashcardsToReview.map((card) => (
                <Flashcard key={card.card_id} {...card} />
            ))}
        </>
    );
}
