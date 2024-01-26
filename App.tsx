import 'react-native-gesture-handler';
import AppRoutes from './AppRoutes';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import UserContextProvider from '@/context/UserContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lexend': require('./assets/fonts/Lexend-VariableFont_wght.ttf'),
    'ABeeZee-Regular': require("./assets/fonts/ABeeZee-Regular.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserContextProvider>
      <PaperProvider>
        <AppRoutes />
        <Toast
        />
      </PaperProvider>
    </UserContextProvider>
  );
}


