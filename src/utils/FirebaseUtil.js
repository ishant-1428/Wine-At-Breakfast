import auth from '@react-native-firebase/auth'

export default FirebaseUtil = () => {
    const signIn = (email:string, password:string) => {
        return auth().signInWithEmailAndPassword(email,password);
    };
    const signUp = (email:string, password:string) => {
        return auth().createUserWithEmailAndPassword(email,password);
    };
    const signOut = () => {
        return auth().signOut();
    };
}