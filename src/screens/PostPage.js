import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList, Button, ScrollView, RefreshControl} from 'react-native';
import ImageButton from './ImageButton';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../components/PostCard';
import { TouchableHighlight } from 'react-native-gesture-handler';

const PostPage = ({navigation}) => {
    
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        try {
          const list = [];
    
          await firestore()
            .collection('posts')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const {
                  title,
                  postImg,
                  postTime,
                } = doc.data();
                list.push({
                  id: doc.id,
                  title,
                  postImg,
                });
              });
            });
    
          setPosts(list);
    
          if (loading) {
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);
      useEffect(() => {
        fetchPosts();
        setDeleted(false);
      }, [deleted]);

      const refreshScreen = () => {
          fetchPosts();
      }

    return ( 
        <View style= {styles.container}>
            <FlatList
            data = {posts}
            extraData = {posts}
            renderItem = {({item}) => <PostCard item = {item}/>}
            keyExtractor = {item=>item.id}
            showsVerticalScrollIndicator = {false}
            />
            <TouchableHighlight
            color = '#841584'
            onPress={refreshScreen}
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            >
              <View style={styles.countContainer}>
              <Text style={styles.countText}>Click here to Refresh</Text>
              </View>
              </TouchableHighlight>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor: colors.white
    },
    
    countContainer: {
      alignItems: "center",
      justifyContent:'center',
      padding: 10,
      backgroundColor:'#841584',
    },
    countText: {
      color: "#fff"
    },
});
 
export default PostPage;