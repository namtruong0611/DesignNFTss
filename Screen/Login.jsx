import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Input } from 'react-native-elements';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
       
      </View>
      <TouchableOpacity onPress={toggleShowPassword}>
          <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
        <View style={styles.boxforgot}>
        <TouchableOpacity style={styles.regis} onPress={()=>navigation.navigate('Register')}>
           <Text style={styles.text}>register</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={()=>navigation.navigate('ForgotPassword')} >
           <Text  style={styles.text} >ForgotPasword</Text>
           </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.log} onPress={()=>navigation.navigate('Main')}>
        <Text style={styles.textlog}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#ffffff',
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
    paddingHorizontal:10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex:1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  boxforgot :{
    flexDirection : "row",
  
    },
    regis:{
 marginRight:10,
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
    left:120,
  }
});

export default Login;
