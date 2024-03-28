import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  FlatList,
} from 'react-native';
import PostItem from './PostItem';

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSendComment = () => {
    if (comment.trim() === '') {
      Alert.alert('Error', 'Please enter a comment.');
      return;
    }
    setComments([...comments, comment]);
    setComment('');
  };

  const handlePost = () => {
    if (postContent.trim() === '') {
      Alert.alert('Error', 'Please enter some content for the post.');
      return;
    }
    const newPost = { id: posts.length + 1, content: postContent, images: images };
    setPosts([newPost, ...posts]);
    setPostContent('');
    setIsFormVisible(false);
    setImages([]);
  };

  const selectImages = () => {
    // Code to handle image selection
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setIsFormVisible(!isFormVisible)}>
        <Text style={styles.outerText}>What's on your mind?</Text>
        {isFormVisible && (
          <TextInput
            style={[styles.input, styles.expandedInput]}
            placeholder="Write here..."
            onChangeText={(text) => setPostContent(text)}
            value={postContent}
            multiline={true}
            numberOfLines={4}
            editable={true}
          />
        )}
      </TouchableOpacity>
      {isFormVisible && (
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={selectImages}>
            <Text style={styles.imageButtonText}>Select Images</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsFormVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem
            postContent={item.content}
            images={item.images}
            navigation={navigation}
            postId={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  outerText: {
    color: '#aaa',
  },
  input: {
    height: 40,
  },
  expandedInput: {
    height: 150,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  imageButton: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#4267B2',
    padding: 15,
    borderRadius: 10,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
