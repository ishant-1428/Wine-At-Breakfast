import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { Login, SignUp, ForgetPassword, Home,MainScreen} from "../screens";
import React from 'react';
import navigation from '../navigation';

// signup handling
const signUp = (fullName, email, password) => {
    if(!fullName || !email || !password){
        Alert.alert('Error', 'Please enter all fields')
        return <SignUp/>
    }

    return auth().createUserWithEmailAndPassword(email, password)
    .then( cred => {
        const {uid} = cred.user;

        auth().currentUser.updateProfile({
            displayName: fullName
        })

        return uid
    })
    .catch(
        err => Alert.alert(err.code, err.message)
    )
}

const signIn = (email, password) => {
    if(!email || !password){
        
        Alert.alert('Error', 'Please enter all fields');
        return <Login/>
    }

    return auth().signInWithEmailAndPassword(email, password)
    .then(() => {})
    .catch(
        err => Alert.alert('Wrong Password or E-Mail id', 'The password is invalid or wrong e-mail id has been put.')
    )
}

const forgetPassword = (email) => {
    if(!email){
        Alert.alert('Error', 'Please enter email');
        return <ForgetPassword/>
    }

    return auth().sendPasswordResetEmail(email)
}

const signOut = () => {
    return auth().signOut()
}


const Auth = {
    signUp,
    signIn,
    forgetPassword,
    signOut,
}

export default Auth