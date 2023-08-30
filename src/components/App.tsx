import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FlashcardList from "./FlashcardList";
import DeckList from "./DeckList";
import { useState } from "react";
import UserList from "./UserList";

function App() {
    const [userId, setUserId] = useState(0);
    console.log(userId);
    return (
        <ChakraProvider>
            <UserList setUserId={setUserId} />
            {userId !== 0 && (
                <>
                    <DeckList userId={userId} />
                    <FlashcardList />
                </>
            )}
        </ChakraProvider>
    );
}

export default App;
