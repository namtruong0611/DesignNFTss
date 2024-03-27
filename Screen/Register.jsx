
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
const Register = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    // Kiểm tra tính hợp lệ của thông tin đăng ký
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
          <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
        <View style={styles.boxforgot}>
        <TouchableOpacity style={styles.regis} onPress={()=>navigation.navigate('Login')}>
           <Text style={styles.text}>You have account</Text>
           </TouchableOpacity>
          
      </View>
      <TouchableOpacity style={styles.log}>
        <Text style={styles.textlog}>Register</Text>

      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  boxforgot :{
    flexDirection : "row",
    
    
    },
    regis:{
     left:110,
    },
    text:{
      color:"blue"
    },
  log:{
    marginTop:20,
    width:150,
    height:50,
    borderRadius:20,
    backgroundColor:"blue"
  },
  textlog:{
    color:"white",
    fontWeight:"600",
    textAlign:"center",
    lineHeight:50

  },
  showPasswordText:{
    textAlign:"right",
    left:145,
  }
});

export default Register;
