import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import backgroundImage from '../images/background.png';
import PasswordTextBox from '../components/PasswordTextBox';

const LoginScreen = props => {
    
    const [authState, setAuthState] = useState({
        mode: "Login",
        inputs: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handleAuth = () => {
        const email = authState.inputs.email;
        const password = authState.inputs.password;
        const confirmPassword = authState.inputs.confirmPassword;

        if(email !== "" && password !== "" && confirmPassword !== "") {
            if(re.test(email)) {
                if(authState.mode === "Login") {
                    props.navigation.navigate("Dashboard");
                } else {
                    if(password === confirmPassword) {
                        props.navigation.navigate("Dashboard");
                    } else {
                        alert("Password doesn't matched!"+authState.inputs.password+" > " +authState.inputs.confirmPassword);
                    }
                }
            } else {
                alert("Invalid email!");
            }
        } else {
            alert("Input all the fields!");
        }
    }
    const switchViews = () => {
        setAuthState({
            ...authState,
            mode: authState.mode === "Login" ? "Signup" : "Login"
        })
    }

    const updateInput = (name, value) => {
        setAuthState({
            ...authState,
            inputs: {
                ...authState.inputs,
                [name]: value
            }
        })
    }

    let confirmPasswordField = null;

    if(authState.mode === "Signup") {
        confirmPasswordField = <PasswordTextBox
                                    style={styles.input} 
                                    placeholderValue="Confirm password"
                                    value={authState.inputs.confirmPassword}
                                    name="confirmPassword"
                                    updateInput={updateInput} />
    }

    return (
        <ImageBackground
            source={backgroundImage}
            style={{width: "100%", flex: 1}}
            blurRadius={5}>
            <View style={styles.loginView}>
                <TouchableOpacity
                    onPress={switchViews}
                    style={{...styles.btnContainer, backgroundColor: "#1167b1", width: "85%"}}>
                    <Text style={styles.btnStyle}>{authState.mode === "Login" ? "Switch to signup" : "Switch to login"}</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Your email address"
                    value={authState.inputs.email}
                    textContentType="emailAddress"
                    onChangeText={value => updateInput("email", value)} />
                
                <PasswordTextBox
                    style={styles.input} 
                    placeholderValue="Password"
                    value={authState.inputs.password}
                    name="password"
                    updateInput={updateInput} />
                
                {confirmPasswordField}

                <TouchableOpacity style={styles.btnContainer} onPress={handleAuth}>
                    <Text style={styles.btnStyle}>{authState.mode === "Login" ? "Login" : "Signup"}</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: "85%",
        padding: 5,
        marginTop: 10,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#009688",
        borderRadius: 4
    },
    btnStyle: {
        fontSize: 15,
        color: "#fff",
        alignSelf: "center"
    },
    btnContainer: {
        flexDirection: "row",
        width: 150,
        paddingVertical: 10,
        backgroundColor: "#009688",
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default LoginScreen;