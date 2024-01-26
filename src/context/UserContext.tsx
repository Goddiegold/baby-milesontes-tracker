import { retrieveCurrentUser } from "@/utils/helper";
import { User, UserContextType } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
    user: null,
    setUser: () => { },
    isLoggedIn: false
};

const UserContext = createContext<UserContextType>(initialState)

function UserContextProvider({ children }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const getCurrentUser = async () => {
        try {
           const user = await retrieveCurrentUser()
           if(user){
            setUser(user)
           }
        } catch (error) {

        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])
    
    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
