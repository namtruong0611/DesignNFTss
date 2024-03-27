

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';



import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';




const Home = ({ navigation }) => {
    const [postContent, setPostContent] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handlePost = () => {
        if (postContent.trim() === '') {
            Alert.alert('Error', 'Please enter some content for the post.');
            return;
        }
        console.log('Posted:', postContent);
        setPostContent('');
        setIsFormVisible(false) 
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <TouchableOpacity style={styles.waillet}>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setIsFormVisible(!isFormVisible)}>
                <Text
                    style={[styles.input, isFormVisible && styles.expandedInput]}
                    placeholder="What's on your mind?"
                    onChangeText={text => setPostContent(text)}
                    value={postContent}
                    multiline={true}
                    numberOfLines={4}
                    editable={!isFormVisible}  
                />
                {!isFormVisible && (
                    <TextInput style={styles.placeholderText}>.</TextInput>
                )}
            </TouchableOpacity>
            {isFormVisible && (
                <View style={styles.formContainer}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    waillet:{
     justifyContent:"center",   
     width:100,
     height:100,
     backgroundColor:"red"
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    input: {
        height: 40,
    },
    expandedInput: {
        height: 150,
    },
    placeholderText: {
        position: 'absolute',
        left: 14,
        top: 19,
        color: '#aaa',
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
