import { useState, useContext } from 'react';
import React from 'react';
import { Text, View, StyleSheet, Button, Image, Alert, ActivityIndicator, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Auth} from '../services';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const ImageButton = ({navigation}) => {

  // const {user, logout} = useContext(AuthContext);
  const [image,newImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [text, onChangeText] = useState("");

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.6,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      newImage(imageUri);
    }).catch(error =>{
      Alert.alert('Error:', error.message);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.4,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      newImage(imageUri);
    }).catch(error =>{
      Alert.alert('Error:', error.message);
    });
  }
  const cancelButton = () => {
    console.warn('Cancel Button Pressed')
  }

  const submitPost = async () =>{

     const imageUrl = await uploadImage();
     if(imageUrl == null) return null;
     if(text == ''){
      Alert.alert('Error Occured!','You have not written anything about the post!');
      return null;
     }
     firestore()
     .collection('posts')
     .add({
       title:text,
       postImg: imageUrl,
       postTime: firestore.Timestamp.fromDate(new Date()),
     })
     .then(() => {
       console.log('Post Added!');
       Alert.alert(
         'Post published!',
         'Your post has been published Successfully!',
       );
       setPost(null);
     })
     .catch((error) => {
       console.log('Something went wrong with added post to firestore.', error);
     });
     onChangeText('');
  }


  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await storage().ref(filename).putFile(uploadUri);

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      // newImage(null);

      // Alert.alert('Photo Updated!','Your photo has been uploaded to Firebase Cloud Storage System!');
      return url;


    } catch (e) {
      console.log(e);
      return null;
    }
  };


  return (
    <View style={styles.body}>
      {
        image?(
          <Image
          style={
            {width: 275, height: 275, marginBottom:10,}
          }
          source={{uri: image}}
          />
        ): <Image source={require('../assets/post.jpg')} 
            style={
              {
                width: 275, height: 275, marginBottom:10,
              }
            }
        />
      }
      
      
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        maxLength = {25}
        textAlign = {'center'}
        clearTextOnFocus = {true}
        placeholder ={'Write about the Post'}
        contextMenuHidden= {true}
      />
      <Button
        onPress={takePhotoFromCamera}
        title="Take Photo from Camera"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {uploading ? (
        <React.Fragment>
        <Text>{transferred} % Completed!</Text>
        <ActivityIndicator size= 'large' color='#841584'/>
        </React.Fragment>
      ): (
        <Button
          onPress={choosePhotoFromLibrary}
          title="Choose from Library"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
      />
      )}
      <Button
        onPress={submitPost}
        title="Save Post"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={()=> Auth.signOut()}
        title="Sign Out"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex:1,
    justifyContent: 'space-between',
    alignItems : 'center',
    margin:17,
    color: '#000000'
  },
  
  tinyLogo: {
    marginBottom:10,
    width: 80,
    height: 80,
  },
  input: {
    height: 40,
    width:150,
    margin: 12,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default ImageButton;
