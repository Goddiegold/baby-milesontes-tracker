import { NavigationContainer } from "@react-navigation/native";
import { useUserContext } from "@/context/UserContext";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "@/screens/Login";
import Register from "@/screens/Register";
import Dashboard from "@/screens/Dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import AddMilestone from "@/screens/AddMilestone";
import Profile from "@/screens/Profile";
import EditMilestone from "@/screens/EditMilestone";
import OnboardingScreen from "@/screens/Onboarding";

const PreAuth = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

const DashboardTab = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Dashboard} options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home"
                    color={color} size={size} />,
            }} />
            <Tab.Screen name="AddMilestone" component={AddMilestone} 
            options={{
                title:"Add Milestone",
                tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline"
                    color={color} size={size} />,
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account"
                    color={color} size={size} />,
            }} />
            <Tab.Screen name="EditMilestone" component={EditMilestone}  options={{
                title:"Edit MileStone",
                tabBarButton: () => null,
            }}
            />
        </Tab.Navigator>
    )
}
const AppRoutes = () => {
    const { user } = useUserContext()

    return (
        <NavigationContainer onReady={() => {
            console.log("NavigationContainer");
        }}>
            {!user?.id ? <PreAuth /> : <DashboardTab />}
        </NavigationContainer>
    );
}

export default AppRoutes;