import { useEffect, useState } from "react";
import IUser from "../Interfaces/IUser";
import config from "../../utils/config";
import axios from "axios";
import { Select } from "@chakra-ui/react";

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
            <Select
                onChange={(e) => handleUserChange(e.target.value)}
                placeholder="Select option"
            >
                {users.map((user) => (
                    <option value={user.id} key={user.id}>
                        {user.name}
                    </option>
                ))}
            </Select>
        </>
    );
}
