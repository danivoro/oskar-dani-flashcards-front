import {
    Button,
    Card,
    CardFooter,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import config from "../../utils/config";

interface AddDeckProps {
    userId: number;
    setChangeDeckWatcher: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddDeck({
    userId,
    setChangeDeckWatcher,
}: AddDeckProps): JSX.Element {
    const [title, setTitle] = useState("");

    const toast = useToast();
    const showDeckToast = (
        title: string,
        description: string,
        status: "info" | "warning" | "success" | "error" | "loading" | undefined
    ) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 9000,
            isClosable: true,
        });
    };

    const handleAddDeck = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (!title.trim()) {
            showDeckToast(
                "Deck title cannot be empty.",
                "Please, try to enter a valid name for the deck",
                "error"
            );
            return;
        }

        try {
            await axios.post(`${config.baseURL}/decks`, {
                name: title,
                user_id: userId,
            });
            setTitle("");
            showDeckToast(
                "Sucessfully created!",
                "The deck is added to your user.",
                "success"
            );
            setChangeDeckWatcher((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card p="5" border="2px dashed #3f6ea8">
            <FormControl>
                <FormLabel>Add a new deck</FormLabel>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Deck title"
                />
            </FormControl>
            <CardFooter p="0">
                <Button
                    colorScheme="blue"
                    mt="5"
                    onClick={(e) => handleAddDeck(e)}
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
}
