import 'react-native-get-random-values';
import { Button, TextInput, HelperText } from 'react-native-paper'
import tw from '@/utils/tailwind';
import DefaultLayout from '@/components/DefaultLayout';
import { useNavigator } from '@/hooks/useNavigator';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import * as Yup from "yup";
import { retrieveItems, retrieveUser, storeItems, storeCurrentUser, toast } from '@/utils/helper';
import { ToastType, User } from '@/utils/types';
import { useUserContext } from '@/context/UserContext';

export default function Register() {
    const navigator = useNavigator()
    const { setUser } = useUserContext()

    const handleSubmit = async (values: User) => {
        try {
            const userId = uuidv4();
            if (await retrieveUser(values.email)) {
                return toast("Email Already Registered!", ToastType.ERROR);
            }
            const allUsers = await retrieveItems<User>("users") || [];
            const user = { ...values, id: userId }
            await storeItems("users", [{ ...user }, ...allUsers]);
            await storeCurrentUser(user)
            setUser(user)
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <DefaultLayout title="Create an account">
            <Formik
                validationSchema={
                    Yup.object().shape({
                        name: Yup.string().required('Name is required').label('Name'),
                        email: Yup.string()
                            .email('Please enter valid email')
                            .required('Email is required')
                            .label('Email'),
                        password: Yup.string()
                            .min(8, ({ min }) => `Password must be at least ${min} characters`)
                            .required('Password is required')
                            .label('Password'),
                    })}
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <>
                        <TextInput
                          mode='outlined'
                            value={values.name}
                            label="Name"
                            onChangeText={handleChange("name")}
                            left={<TextInput.Icon icon="account" />}
                            style={tw`my-2`} />
                        {errors.name && touched.name && <HelperText type='error' visible>
                            {errors.name}
                        </HelperText>}
                        <TextInput
                          mode='outlined'
                            value={values.email}
                            onChangeText={handleChange("email")}
                            label="Email"
                            left={<TextInput.Icon icon="email"
                            />}
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
                        {errors.password && touched.password && <HelperText type='error' visible={!!errors.password && !!touched.password}>
                            {errors.password}
                        </HelperText>}
                        <Button mode='contained' style={tw`my-2`} onPress={() => handleSubmit()}>Proceed</Button>
                    </>
                )}
            </Formik>
            <Button onPress={() => navigator.go("Login")}>Already have an account, Login</Button>
        </DefaultLayout>
    )
}
