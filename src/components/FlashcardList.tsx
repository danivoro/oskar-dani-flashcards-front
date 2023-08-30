import axios from "axios";
import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import IFlashcard from "../Interfaces/IFlashcard";
import config from "../../utils/config";

export default function FlashcardList(): JSX.Element {
    const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
    const baseURL = config.baseURL;
    useEffect(() => {
        const getAllFlashcards = async () => {
            try {
                const allFlashcards = await axios.get(`${baseURL}/flashcards`);
                setFlashcards(allFlashcards.data);
            } catch (err) {
                console.error(err);
            }
        };
        getAllFlashcards();
    }, [baseURL]);
    return (
        <>
            {flashcards.map((card) => (
                <Flashcard key={card.card_id} {...card} />
            ))}
        </>
    );
}
