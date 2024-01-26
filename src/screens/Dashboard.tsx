
import DisplayCard from '@/components/Card';
import { useUserContext } from '@/context/UserContext';
import { useNavigator } from '@/hooks/useNavigator';
import { removeItem, retrieveItems, retrieveUser, toast } from '@/utils/helper';
import tw from '@/utils/tailwind';
import { Milestone, ToastType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function Dashboard({ route }) {
    const { user } = useUserContext()
    const [userMilestones, setUserMilestones] = useState<Milestone[]>([])
    const navigator = useNavigator()

    const retrieveUsersMilestones = async () => {
        // await removeItem("milestones")
        try {
            const allMilestones = await retrieveItems<Milestone>("milestones") || []
            if (allMilestones) {
                console.log(JSON.stringify(allMilestones, null, 2))
                setUserMilestones(allMilestones.filter(milestone => milestone.userId === user?.id))
            }
        } catch (error) {
            toast("Couldn't fetch milestones!", ToastType.ERROR)
        }
    }

    useEffect(() => {
        retrieveUsersMilestones()
    }, [])

    useEffect(() => {
        if (route?.params?.refresh) {
            retrieveUsersMilestones()
        }
    }, [route?.params?.refresh])

    return (
        <ScrollView style={tw`flex-1 mt-3 px-5`}>
            <Text style={tw`font-AbeeZee text-[20px]`}>Hello {user?.name} 👋</Text>
            {userMilestones.length > 0 && <>
                <Text style={tw`my-2`}>Your Baby's Milestones</Text>
                {userMilestones.map(milestone => (
                    <DisplayCard
                        handleBtnPress={() => navigator.go("EditMilestone", { data: { milestoneId: milestone.id } })}
                        btnText='Edit'
                        firstText={milestone.type}
                        secondText={milestone.date}
                        thirdText={milestone.note ?? ""}
                    />
                ))}
            </>}
            {userMilestones.length === 0 &&
                <View style={tw`my-[50px]`}>
                    <Text style={tw`text-center my-2`}>No Milestone</Text>
                    <Button mode='contained' onPress={() => navigator.go("AddMilestone")}>Add Milestone</Button>
                </View>
            }
        </ScrollView>
    )
}
