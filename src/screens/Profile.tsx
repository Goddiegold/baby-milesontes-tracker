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
            <Card mode="elevated">
                <Card.Cover source={{ uri: 'https://res.cloudinary.com/dyxk7wdj7/image/upload/v1680467188/christian-buehner-DItYlc26zVI-unsplash_btgj0p.jpg' }} />
                <Card.Content style={tw`mt-2`}>
                    <Text variant="titleLarge">{user?.name}</Text>
                    <Text variant="bodyMedium">{user?.email}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => handleLogout()}>Logout</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}
