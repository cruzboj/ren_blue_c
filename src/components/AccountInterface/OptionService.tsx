import type { UserData } from "./types";
import { getUrl } from "../../urlGetter";

export async function UpdateInfo(User: UserData, token: string) {
    const url = getUrl();
    
    const response = await fetch(`${url}/users`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(User)
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }

    return response.json();
}