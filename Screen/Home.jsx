

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

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import * as web3 from '@solana/web3.js';

const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

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
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletProvider } from 'solana-wallet-provider';
import { WalletModalProvider, WalletConnectButton, WalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { useWallet } from "@solana/wallet-adapter-react";

import PostItem from './PostItem';

const Home = ({ navigation }) => {
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  
  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new GlowWalletAdapter(),
          new SlopeWalletAdapter(),
          new SolflareWalletAdapter({ solNetwork }),
          new TorusWalletAdapter(),
          new LedgerWalletAdapter(),
          new SolletExtensionWalletAdapter(),
          new SolletWalletAdapter(),
      ],
      [solNetwork]
  );


  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const { publicKey, signMessage, connected } = useWallet();

  const handleButtonPress = async () => {
    try {
      
        const publicKey = '8sJuXYjfrVpsJkFSMAuo6FwL54eSYegmv9rYC2pQUzWw';
      
    } catch (error) {
        console.error('Error:', error);
    }
};

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
  
  };

  return (
    <View style={styles.container}>
       <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                <WalletMultiButton />

                {publicKey && (
          <HStack justifyContent="flex-start" alignItems="flex-start">
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="10px"
            >
              <VStack>
                <Button onClick={_signMessage} isDisabled={!message}>
                  Sign Message
                </Button>
                <Input
                  placeholder="Set Message"
                  maxLength={20}
                  onChange={handleInput}
                  w="140px"
                />
                {signature ? <Text>Message signed</Text> : null}
              </VStack>
            </Box>
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="10px"
            >
              <VStack>
                <Button onClick={verifyMessage} isDisabled={!signature}>
                  Verify Message
                </Button>
                {verified !== undefined ? (
                  verified === true ? (
                    <VStack>
                      <CheckCircleIcon color="green" />
                      <Text>Signature Verified!</Text>
                    </VStack>
                  ) : (
                    <VStack>
                      <WarningIcon color="red" />
                      <Text>Signature Denied!</Text>
                    </VStack>
                  )
                ) : null}
              </VStack>
            </Box>
          </HStack>
        )}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider> 
      <View>
      <View>
            <TouchableOpacity title="Check Solana Balance" onPress={handleButtonPress} />
        </View>
        
        </View>

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
  btnwallet:{
width:150,
height:150,
backgroundColor:'red'
  }
});

 
export default Home;
