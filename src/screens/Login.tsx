import { Button, TextInput, HelperText } from 'react-native-paper'
import tw from '@/utils/tailwind';
import DefaultLayout from '@/components/DefaultLayout';
import { useNavigator } from '@/hooks/useNavigator';
import { ToastType, User } from '@/utils/types';
import { retrieveUser, storeCurrentUser, toast } from '@/utils/helper';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useUserContext } from '@/context/UserContext';

export default function Login() {
    const navigator = useNavigator()
    const { user, setUser } = useUserContext()

    const handleSubmit = async (values: User) => {
        try {
            const user = await retrieveUser(values.email)
            if (!user) {
                return toast("User not registered!", ToastType.ERROR)
            } else {
                if (user.password !== values.password) {
                    return toast("Invalid Credentials!", ToastType.ERROR)
                }
                await storeCurrentUser(user)
                setUser(user)
                // navigator.go("Dashboard", { data: { userId: user.id } })
            }

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <DefaultLayout title="Login to your account">
            <Formik
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string()
                            .email('Please enter valid email')
                            .required('Email is required')
                            .label('Email'),
                        password: Yup.string()
                            .min(8, ({ min }) => `Password must be at least ${min} characters`)
                            .required('Password is required')
                            .label('Password'),
                    })}
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            left={<TextInput.Icon icon="email" />}
                            style={tw`my-2`} />
                        {errors.email && touched.email && <HelperText type='error' visible>
                            {errors.email}
                        </HelperText>}
                        <TextInput
                            mode='outlined'
                            value={values.password}
                            onChangeText={handleChange("password")}
                            left={<TextInput.Icon icon="lock" />}
                            label="Password"
                            secureTextEntry
                            right={<TextInput.Icon icon="eye" />} style={tw`my-2`} />
                        <Button mode='contained' style={tw`my-2`} onPress={() => handleSubmit()}>Login</Button>
                    </>
                )}
            </Formik>
            <Button onPress={() => navigator.go("Register")}>Don't have an accout, Register</Button>
        </DefaultLayout>
    )
}
