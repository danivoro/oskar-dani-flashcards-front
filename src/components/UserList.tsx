import { useEffect, useState } from "react";
import IUser from "../Interfaces/IUser";
import config from "../../utils/config";
import axios from "axios";
import { Select, Image, Stack, Center } from "@chakra-ui/react";

interface UserListProps {
    setUserId: React.Dispatch<React.SetStateAction<number>>;
    setDeckId: React.Dispatch<React.SetStateAction<number>>;
}

export default function UserList({
    setUserId,
    setDeckId,
}: UserListProps): JSX.Element {
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
    }, [baseURL]);

    const handleUserChange = (userId: string) => {
        const userIdNum = parseInt(userId);
        setUserId(userIdNum);
        setDeckId(0);
    };

    return (
        <>
            <Center>
                <Stack direction="row">
                    <Image
                        boxSize="200px"
                        src="../../Images/flashcards-logo-big.png"
                        alt="Flashcards App"
                    />
                </Stack>
            </Center>
            <Center>
                <Select
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
            </Center>
        </>
    );
}
