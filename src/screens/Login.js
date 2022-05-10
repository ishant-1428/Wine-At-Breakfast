import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../constants';
import { Button, Input, TextButton, SocialButton } from '../components';
// service
import {Auth} from '../services'

export default Login = ({navigation}) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    return(
        <ScrollView 
            style={styles.scroll}
            contentContainerStyle={styles.container}
        >
            <Text style={styles.heading}>Login</Text>

            <Input 
                placeholder= "Email"
                color= '#841584'
                value={email.toString()}
                onChangeText={e => setEmail(e)}
            />
            <Input
                placeholder= "Password"
                secureTextEntry= {true}
                value={password.toString()}
                onChangeText={e => setPassword(e)}
            />

            <TextButton 
                text="Forget Password"
                onPress={() => navigation.navigate('ForgetPassword')}
            />

            <Button  
                buttonText= "Login"
                backgroundColor = '#841584'
                onPress={() => Auth.signIn(email.toString(),password.toString())}
            />

            <TextButton
                text="Have not an account? SignUp"
                onPress={() => navigation.navigate('SignUp')}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll:{
        flex: 1
    },
    container:{
        flex:1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading:{
        color: '#841584',
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
})