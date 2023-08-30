import axios from "axios";
import { useState, useEffect } from "react";
import IDeck from "../Interfaces/IDeck";
import config from "../../utils/config";

export default function DeckList(): JSX.Element {
    const [decks, setDecks] = useState<IDeck[]>([]);
    const baseURL = config.baseURL;
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
    return <></>;
}
