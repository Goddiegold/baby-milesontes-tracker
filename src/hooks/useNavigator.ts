import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

export interface RootStackParamList {
    [screenName: string]: undefined | object
}
export const useNavigator = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    const go = (to: string, options?: { screen?: string, data?: object,  }) => {
        console.log('screen', options?.screen)
        return navigation.navigate(to, {
            ...options?.data,
            // params: options?.data,
            screen: options?.screen,
            // initial:true
        })
    }
    const goBack = () => navigation.goBack()
    const pop = (howManyTimesBack: number) => navigation.pop(howManyTimesBack)
    const popToTop = () => navigation.popToTop()

    return { go, goBack, pop, popToTop }
}
