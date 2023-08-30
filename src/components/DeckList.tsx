import axios from "axios";
import { useState, useEffect } from "react";
import IDeck from "../Interfaces/IDeck";
import config from "../../utils/config";

interface DeckListProps {
    userId: number;
}

export default function DeckList({ userId }: DeckListProps): JSX.Element {
    const [decks, setDecks] = useState<IDeck[]>([]);
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
    }, [baseURL, userId]);

    return <></>;
}
