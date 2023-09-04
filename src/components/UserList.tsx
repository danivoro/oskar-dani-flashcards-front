import { useEffect, useState } from "react";
import IUser from "../Interfaces/IUser";
import config from "../../utils/config";
import axios from "axios";
import { Select, Image, Stack, Center, Container } from "@chakra-ui/react";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";

interface UserListProps {
    setUserId: React.Dispatch<React.SetStateAction<number>>;
    setDeckId: React.Dispatch<React.SetStateAction<number>>;
    userId: number;
}

export default function UserList({
    setUserId,
    setDeckId,
    userId,
}: UserListProps): JSX.Element {
    const [renderCounter, setRenderCounter] = useState(0);
    const [users, setUsers] = useState<IUser[]>([]);
    const baseURL = config.baseURL;
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const allUsers = await axios.get(`${baseURL}/users`);
                setUsers(allUsers.data);
            } catch (err) {
                console.error(err);
            }
        };
        getAllUsers();
    }, [baseURL, renderCounter]);

    const handleUserChange = (userId: string) => {
        const userIdNum = parseInt(userId);
        setUserId(userIdNum);
        setDeckId(0);
    };

    const handleLogoClick = () => {
        // Update the current page state to navigate to the main page
        window.location.reload();
    };

    return (
        <>
            <Center>
                <Stack direction="row">
                    <Image
                        boxSize="200px"
                        src="/flashcards-logo-big.png"
                        alt="Flashcards App"
                        onClick={handleLogoClick}
                        style={{ cursor: "pointer" }}
                    />
                </Stack>
            </Center>
            <Container display="flex" alignItems="center">
                <Select
                    minWidth="250px"
                    flexGrow="5"
                    m="5"
                    onChange={(e) => handleUserChange(e.target.value)}
                    placeholder="Select User"
                >
                    {users.map((user) => (
                        <option value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Select>
                <AddUser setRenderCounter={setRenderCounter} />
                {userId > 0 && (
                    <DeleteUser
                        userId={userId}
                        currentUser={
                            users.find((user) => user.id === userId) as IUser
                        }
                        setUserId={setUserId}
                        setRenderCounter={setRenderCounter}
                        setDeckId={setDeckId}
                    />
                )}
            </Container>
        </>
    );
}
