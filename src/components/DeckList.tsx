import axios from "axios";
import { useState, useEffect } from "react";
import IDeck from "../Interfaces/IDeck";

export default function DeckList(): JSX.Element {
    const [decks, setDecks] = useState<IDeck[]>([]);
    const baseURL =
        process.env.NODE_ENV === "production"
            ? "https://oskar-dani-flashcard-server.onrender.com"
            : "http://localhost:4000";

    useEffect(() => {
        const getAllDecks = async () => {
            try {
                const allDecks = await axios.get(`${baseURL}/decks`);
                setDecks(allDecks.data);
            } catch (err) {
                console.error(err);
            }
        };
        getAllDecks();
    }, [baseURL]);
    console.table(decks);
    return <></>;
}
