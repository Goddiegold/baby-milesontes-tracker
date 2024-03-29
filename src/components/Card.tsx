import tw from "@/utils/tailwind";
import { Card, Text, Button } from "react-native-paper"

interface CardProps {
    firstText: string,
    secondText: string,
    thirdText?: string,
    handleBtnPress: () => void,
    btnText: string,
}

const DisplayCard: React.FC<CardProps> = ({ ...props }) => {
    const { firstText, secondText, handleBtnPress: handleBtnPress1, btnText, thirdText } = props
    return (
        <Card mode="elevated" style={tw`my-2`}>
            <Card.Cover
                source={require("../../assets/mombaby.jpg")} />
            <Card.Content style={tw`mt-2`}>
                <Text variant="titleLarge">{firstText}</Text>
                <Text variant="bodyMedium">{secondText}</Text>
                {thirdText && <Text variant="labelLarge">{thirdText}</Text>}
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={handleBtnPress1}>{btnText}</Button>
            </Card.Actions>
        </Card>
    );
}

export default DisplayCard;