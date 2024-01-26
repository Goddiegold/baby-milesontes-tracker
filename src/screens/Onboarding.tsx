import tw from '@/utils/tailwind';
import { View, Image} from 'react-native';
import { Button, Text } from 'react-native-paper';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 items-center justify-center py-[20]`}>
      <Image
        source={require('../../assets/mombaby.jpg')}
        style={tw`w-[80%] h-[200px] mb-[20px]`}
      />
      <Text style={tw`text-[24px] font-bold mb-[10px]`}>Welcome to BabyTracker!</Text>
      <Text style={tw`text-[16px] text-center mb-[30px]`}>Track your baby's activities and milestones effortlessly.</Text>


      <Button 
      mode='contained'
      onPress={() => navigation.navigate('Login')}>
        Get Started
      </Button>
    </View>
  );
};


export default OnboardingScreen;
