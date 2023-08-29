import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FlashcardList from "./FlashcardList";
import DeckList from "./DeckList";

function App() {
    return (
        <ChakraProvider>
            <DeckList />
            <FlashcardList />
        </ChakraProvider>
    );
}

export default App;
