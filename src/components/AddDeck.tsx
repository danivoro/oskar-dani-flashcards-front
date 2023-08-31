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
    const showDeckToast = () => {
        toast({
            title: "Deck created.",
            description: "The new deck has been added for your user",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    const handleAddDeck = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            await axios.post(`${config.baseURL}/decks`, {
                name: title,
                user_id: userId,
            });
            setTitle("");
            showDeckToast();
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
