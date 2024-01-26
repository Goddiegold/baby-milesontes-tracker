import 'react-native-get-random-values';
import { Button, TextInput, HelperText } from 'react-native-paper'
import tw from '@/utils/tailwind';
import { useNavigator } from '@/hooks/useNavigator';
import { v4 as uuidv4 } from 'uuid';
import { Formik, useFormik, useFormikContext } from 'formik';
import * as Yup from "yup";
import { retrieveItems, storeItems, toast, formatDate } from '@/utils/helper';
import { Milestone, ToastType } from '@/utils/types';
import { useUserContext } from '@/context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function EditMilestone({ route }) {
    const navigator = useNavigator()
    const { user } = useUserContext()

    const fetchCurretMileStone = async () => {
        const milestoneId = route?.params?.milestoneId
        const milestones = await retrieveItems<Milestone>("milestones") || []

        const currentMilestone = milestones.find(item => item.id === milestoneId && item.userId === user?.id)
        if (!currentMilestone) {
            toast("Milestone not found!", ToastType.ERROR)
            navigator.go("Home")
            return;
        }
        setValues(currentMilestone)
    }

    useEffect(() => {
        console.log(route?.params)
        if (route?.params?.milestoneId) {
            fetchCurretMileStone()
        }
    }, [route?.params?.milestoneId])

    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleFormSubmit = async (values: Milestone) => {
        try {
            const milestoneId = route?.params?.milestoneId
            const milestones = await retrieveItems<Milestone>("milestones") || []

            const currentMilestone = milestones.find(item => item.id === milestoneId && item.userId === user?.id)
            if (!currentMilestone) {
                toast("Milestone not found!", ToastType.ERROR)
                navigator.go("Home")
                return;
            }

            
            const allMilestonesExcludingCurrent = milestones.filter(item => item.id !== milestoneId)

            //check if the new milestone already exists
            if (allMilestonesExcludingCurrent.find(item => item.id === milestoneId && item.type === values.type)) {
                return toast("You've added this milestone already!", ToastType.ERROR)
            }

            const allMilestones = [...allMilestonesExcludingCurrent, { id: milestoneId, ...values, userId: user?.id }]

            await storeItems("milestones", allMilestones)
            toast("Milestone Updated Successfully 👍");
            navigator.go("Home", { data: { refresh: true } })
        } catch (error) {
            toast("Something went wrong!", ToastType.ERROR)
        }

    };

    const { errors, values, handleChange, handleBlur, touched, handleSubmit, setFieldValue, setValues } = useFormik({
        validationSchema:
            Yup.object().shape({
                type: Yup.string().required('Milestone Type is required').label('Milestone Type'),
                date: Yup.string()
                    .required('Date is required'),
                note: Yup.string()
                    .optional()
                    .label('Note'),
            })
        ,
        initialValues: {
            type: "",
            date: "",
            note: ""
        },
        onSubmit: handleFormSubmit
    })

    return (
        <View style={tw`mt-[20px] px-3`}>
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
        </View>
    )
}


