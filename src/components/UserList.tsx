import { useEffect, useState } from "react";
import IUser from "../Interfaces/IUser";
import config from "../../utils/config";
import axios from "axios";

interface UserListProps {
    setUserId: React.Dispatch<React.SetStateAction<number>>;
}

export default function UserList({ setUserId }: UserListProps): JSX.Element {
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
    return <></>;
}
