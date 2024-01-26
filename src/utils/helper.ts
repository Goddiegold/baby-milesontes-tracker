import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastType, User } from './types';
import Toast from 'react-native-toast-message';

const prefix = "BabyMilestonesTracker";

export const toast = (
    text1: string,
    type: ToastType = ToastType.SUCCESS
) => (
    Toast.show({
        text1: text1 ? text1 : "Something went wrong!",
        text2: !text1 ? 'Pls try again later' : "",
        type
    })
)

export async function storeItems<T>(key: string, data: T[]) {
    try {
        await AsyncStorage.setItem(`${prefix}_${key}`, JSON.stringify(data))
        // toast("Registered Successfully 👍")
    } catch (error) {
        console.log(error);
        toast("Something Went Wrong", ToastType.ERROR)
    }
}

export async function retrieveItems<T>(key: string): Promise<T[] | null> {
    try {
        const value = await AsyncStorage.getItem(`${prefix}_${key}`)
        if (!value) {
            // toast("Something Went Wrong", ToastType.ERROR)
            return null;
        }
        return JSON.parse(value) as T[];
    } catch (error) {
        console.log(error);
        toast("Something Went Wrong", ToastType.ERROR)
        return null
    }
}

export async function retrieveUser(email: string | null, userId?: string): Promise<User | null | undefined> {
    try {
        const users = await retrieveItems<User>("users")
        if (!users) return null;
        if (email) {
            return users.find((user: User) => user?.email === email)
        }
        if (userId) {
            return users.find((user: User) => user?.id === userId)
        }
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong!")
    }
}

export async function storeCurrentUser(currentUser: User) {
    try {
        await AsyncStorage.setItem(`${prefix}_currentuser`, JSON.stringify(currentUser))
        // toast("Registered Successfully 👍")
    } catch (error) {
        console.log(error);
        toast("Something Went Wrong", ToastType.ERROR)
    }
}

export async function retrieveCurrentUser() {
    try {
        const value = await AsyncStorage.getItem(`${prefix}_currentuser`)
        if (!value) {
            return null;
        }
        return JSON.parse(value) as User;
    } catch (error) {
        throw error;
    }
}


export async function removeItem(key: string) {
    try {
        await AsyncStorage.removeItem(`${prefix}_${key}`)
    } catch (error) {
        throw error;
    }
}

export function formatDate(date: Date) {
    const formattedDate = new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    return formattedDate;
}