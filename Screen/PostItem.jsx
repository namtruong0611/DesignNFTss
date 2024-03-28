import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from 'react-native';

const PostItem = ({ postContent }) => {
  const [liked, setLiked] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);  
  const handleLike = () => {
    setLiked(!liked);
  };

  const handleToggleMessageInput = () => {
    setShowMessageInput(!showMessageInput);
    setComment('');  
  };

  const handleSendComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
      setShowMessageInput(true);  
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const postImage = require('../img/girl.jpg');

  return (
    <View style={styles.postContainer}>
      <Text style={styles.postContent}>{postContent}</Text>
      <Image source={postImage} style={styles.selectedImage} />
      <View style={styles.interactionContainer}>
        <TouchableOpacity onPress={handleLike} style={[styles.interactionButton, liked && styles.likedButton]}>
          <Text style={[styles.interactionButtonText, liked && styles.likedButtonText]}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleMessageInput} style={styles.interactionButton}>
          <Text style={styles.interactionButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>
      {showMessageInput && (
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={comment}
            onChangeText={text => setComment(text)}
          />
          <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={handleToggleComments}>
        <Text style={styles.toggleText}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Text>
      </TouchableOpacity>
      {showComments && (
        <View style={styles.commentListContainer}>
          <FlatList
            style={styles.commentList} 
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.commentText}>{item}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  postContent: {
    marginBottom: 10,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  interactionButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  likedButton: {
    backgroundColor: '#3b5998',
  },
  interactionButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  likedButtonText: {
    color: '#fff',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3b5998',
  },
  sendButtonText: {
    color: '#fff',
  },
  toggleText: {
    color: '#3b5998',
    marginTop: 5,
  },
  commentListContainer: {
    flex: 1,
    width: '100%',
  },
  commentList: {
    width: '100%',
  },
  commentText: {
    marginBottom: 5,
  },
});

export default PostItem;
