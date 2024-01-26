import 'react-native-get-random-values';
import { Button, TextInput, HelperText } from 'react-native-paper'
import tw from '@/utils/tailwind';
import { useNavigator } from '@/hooks/useNavigator';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import * as Yup from "yup";
import { retrieveItems, storeItems, toast, formatDate } from '@/utils/helper';
import { Milestone, ToastType } from '@/utils/types';
import { useUserContext } from '@/context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function AddMilestone() {
    const navigator = useNavigator()
    const { user } = useUserContext()
    const [formKey, setFormKey] = useState(0)

    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleSubmit = async (values: Milestone) => {
        try {
            const milestones = await retrieveItems<Milestone>("milestones") || []

            //checks if user has added milestone before
            const milestoneExists = milestones.find(milestone => milestone.type.toLowerCase() === values.type.toLowerCase() && milestone.userId === user?.id)

            //if milestone exists return error notification
            if (milestoneExists) {
                return toast("You've added this milestone already!", ToastType.ERROR)
            }

            const milestoneId = uuidv4();
            //if milestone doesn't exist add the milestone
            await storeItems("milestones", [{ ...values, userId: user?.id, id: milestoneId }, ...milestones])
            toast("Milestone Added Successfully 👍");
            setFormKey(key => key + 1)
            navigator.go("Home", { data: { refresh: true } })
        } catch (error) {
            toast("Something went wrong!", ToastType.ERROR)
        }

    };

    return (
        <View style={tw`mt-[20px] px-3`}>
            <Formik
            key={formKey}
                validationSchema={
                    Yup.object().shape({
                        type: Yup.string().required('Milestone Type is required').label('Milestone Type'),
                        date: Yup.string()
                            .required('Date is required'),
                        note: Yup.string()
                            .optional()
                            .label('Note'),
                    })}
                initialValues={{ type: "", date: "", note: "" }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleSubmit, errors, touched, values, setFieldValue, resetForm }) => (
                    <>
                        <TextInput
                            multiline
                            mode='outlined'
                            value={values.type}
                            label="Milestone Type"
                            onChangeText={handleChange("type")}
                            left={<TextInput.Icon icon="text-long" />}
                            style={tw`my-2`} />
                        {errors.type && touched.type && <HelperText type='error' visible>
                            {errors.type}
                        </HelperText>}
                        <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                            <TextInput
                                mode='outlined'
                                value={values.date}
                                editable={false}
                                label="Date"
                                left={<TextInput.Icon icon="calendar-outline"
                                />}
                                style={tw`my-2`} />
                            {errors.date && touched.date && <HelperText type='error' visible>
                                {errors.date}
                            </HelperText>}
                        </TouchableOpacity>
                        <TextInput
                            mode='outlined'
                            multiline
                            value={values.note}
                            onChangeText={handleChange("note")}
                            left={<TextInput.Icon icon="pen" />}
                            label="Additional Note"
                            secureTextEntry
                            style={tw`my-2`} />
                        {errors.note && touched.note && <HelperText type='error' visible>
                            {errors.note}
                        </HelperText>}
                        <Button mode='contained' style={tw`my-2`} onPress={() => handleSubmit()}>Proceed</Button>
                        {showDatePicker && (
                            <DateTimePicker
                                mode="date" onChange={({ nativeEvent }) => {
                                    setShowDatePicker(!showDatePicker)
                                    setFieldValue("date", formatDate(new Date(nativeEvent.timestamp)))
                                }} value={new Date()} />
                        )}
                    </>
                )}
            </Formik>
        </View>
    )
}


