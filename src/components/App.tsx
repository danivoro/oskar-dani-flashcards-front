import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FlashcardList from "./FlashcardList";

function App() {
    return (
        <ChakraProvider>
            <FlashcardList />
        </ChakraProvider>
    );
}

export default App;
