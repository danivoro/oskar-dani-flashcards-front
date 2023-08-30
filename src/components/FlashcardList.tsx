import axios from "axios";
import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import IFlashcard from "../Interfaces/IFlashcard";
import config from "../../utils/config";

interface FlashcardListProps {
    deckId: number;
}

export default function FlashcardList({
    deckId,
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
            {flashcards.map((card) => (
                <Flashcard key={card.card_id} {...card} />
            ))}
        </>
    );
}
