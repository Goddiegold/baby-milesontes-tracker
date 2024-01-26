import DisplayCard from "@/components/Card";
import { useUserContext } from "@/context/UserContext"
import { removeItem, toast } from "@/utils/helper";
import tw from "@/utils/tailwind";
import { ToastType } from "@/utils/types";
import { View } from "react-native";
import { Button, Card, Text } from 'react-native-paper';

export default function Profile() {
    const { user, setUser } = useUserContext()

    const handleLogout = async () => {
        try {
            await removeItem("currentuser")
            setUser(null)
        } catch (error) {
            toast("Somethig went wrong!", ToastType.ERROR)
        }
    }
    return (
        <View style={tw`px-4 mt-[30px]`}>
            <DisplayCard btnText="Logout" handleBtnPress={handleLogout}
             firstText={`${user?.name}`} secondText={`${user?.email}`} />
        </View>
    )
}
