import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={require('../img/girl.jpg')}  
        />
        <Text style={styles.profileName}>John Doe</Text>  
         
      </View>
      <View style={styles.separator}></View>
      <View style={styles.stats}>
        <TouchableOpacity style={styles.stat}>
        <Text style={styles.statLabel}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stat}>
          <Text style={styles.statLabel}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stat}>
           
          <Text style={styles.statLabel}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#4267B2',
  },
  editButtonText: {
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  stats: {
    flexDirection: 'column',  
    paddingHorizontal: 20,
  },
  stat: {
    alignItems: 'flex-start',  
    marginVertical: 10, 
  },
  statLabel: {
    fontSize: 16,
    color: '#4267B2',  
  },
});

export default ProfileScreen;
