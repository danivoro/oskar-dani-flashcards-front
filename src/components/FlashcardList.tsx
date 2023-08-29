import axios from "axios";
import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import IFlashcard from "../Interfaces/IFlashcard";

export default function FlashcardList(): JSX.Element {
    const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
    const baseURL =
        process.env.NODE_ENV === "production"
            ? "https://oskar-dani-flashcard-server.onrender.com"
            : "http://localhost:4000";
    console.log(baseURL);
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
    console.table(flashcards);
    return (
        <>
            {flashcards.map((card) => (
                <Flashcard key={card.card_id} {...card} />
            ))}
        </>
    );
}
