import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Share from 'react-native-share';

export default PostCard = ({item}) => {

    const list = (item.postImg);

    const onShare = async () => {
        const shareOptions = {
            message: 'Photo from Ishant: \n',
            url: list 
        };
        try{
            const ShareResponse = await Share.open(shareOptions);
        }catch(error){
            console.log('Error => ',error);
        }
    }

    return (
        <View>
            <Text style={styles.input}>{item.title}</Text>
            <TouchableOpacity 
            onLongPress={onShare}
            >
            <Image 
            style = {styles.imageContainer}
            source = {{uri: list}}
            />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer : {
        width:300,
        height:300,
        marginBottom:20,
        padding:30,
    },
    input: {
        color: '#841584',
        margin:7,
        fontWeight:'bold',
        fontSize:15,
    }
});