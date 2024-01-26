
export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface User {
    id?: string,
    name?: string,
    isLoggedIn?: boolean,
    email: string,
    password: string
}

export interface Milestone {
    id?: string,
    note?: string,
    type: string,
    date: string,
    userId?: string
}

export interface UserContextType {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    isLoggedIn: boolean
}