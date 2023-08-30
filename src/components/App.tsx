import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FlashcardList from "./FlashcardList";
import DeckList from "./DeckList";
import { useState } from "react";
import UserList from "./UserList";

function App() {
    const [userId, setUserId] = useState(0);
    const [deckId, setDeckId] = useState(0);
    console.log(deckId);
    return (
        <ChakraProvider>
            <UserList setUserId={setUserId} setDeckId={setDeckId} />
            {userId !== 0 && (
                <>
                    <DeckList userId={userId} setDeckId={setDeckId} />
                </>
            )}
            {deckId !== 0 && (
                <>
                    <FlashcardList deckId={deckId} />
                </>
            )}
        </ChakraProvider>
    );
}

export default App;
