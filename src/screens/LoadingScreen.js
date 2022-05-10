import React from "react";
import { ActivityIndicator, View,StyleSheet } from "react-native";

const LoadingScreen = () => {
    return ( 
        <View style = {styles.container}>
            <ActivityIndicator color="#000" size = "large"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        alignItems:'center'
    }
});
 
export default LoadingScreen;