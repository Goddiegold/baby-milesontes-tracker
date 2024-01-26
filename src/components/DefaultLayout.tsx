import tw from '@/utils/tailwind';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface DefaultLayoutProps {
    children: ReactNode | ReactNode[],
    title: string
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ ...props }) => {
    const { children, title } = props
    return (
        <View style={tw`flex-1 justify-center w-[90%] mx-auto`}>
            <Text style={tw`text-[20px] text-center my-1`}>{title}</Text>
            {children}
        </View>
    );
}

export default DefaultLayout;