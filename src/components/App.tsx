import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FlashcardList from "./FlashcardList";
import DeckList from "./DeckList";
import { useState } from "react";
import UserList from "./UserList";

function App() {
    const [userId, setUserId] = useState(0);

    return (
        <ChakraProvider>
            {userId ? (
                <>
                    <DeckList />
                    <FlashcardList />
                </>
            ) : (
                <UserList setUserId={setUserId} />
            )}
        </ChakraProvider>
    );
}

export default App;
