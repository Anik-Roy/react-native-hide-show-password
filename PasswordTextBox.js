import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const PasswordTextBox = props => {
    const [ visible, setVisible ] = useState(false);

    const iconName = visible ? "eye-outline" : "eye-off-outline"

    return (
        <View style={{...props.style, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <TextInput
                placeholder={props.placeholderValue}
                value={props.value}
                secureTextEntry={!visible}
                textContentType="password"
                onChangeText={value => props.updateInput(props.name, value)} />
            <Ionicons
                onPress={()=>setVisible(!visible)}
                name={iconName}
                size={18} />
        </View>
    )
}

export default PasswordTextBox;