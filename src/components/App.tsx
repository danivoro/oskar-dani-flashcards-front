import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FlashcardList from "./FlashcardList";
import DeckList from "./DeckList";
import { useState } from "react";
import UserList from "./UserList";
import IDeck from "../Interfaces/IDeck";

function App() {
    const [userId, setUserId] = useState(0);
    const [deckId, setDeckId] = useState(0);
    const [decks, setDecks] = useState<IDeck[]>([]);
    console.log(deckId);
    return (
        <ChakraProvider>
            <UserList
                setUserId={setUserId}
                setDeckId={setDeckId}
                userId={userId}
            />
            {userId !== 0 && deckId === 0 && (
                <>
                    <DeckList
                        userId={userId}
                        setDeckId={setDeckId}
                        decks={decks}
                        setDecks={setDecks}
                    />
                </>
            )}
            {deckId !== 0 && (
                <>
                    <FlashcardList
                        deckId={deckId}
                        setDeckId={setDeckId}
                        deck={
                            decks.filter((deck) => deck.deck_id === deckId)[0]
                        }
                    />
                </>
            )}
        </ChakraProvider>
    );
}

export default App;
