import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { decryptPayload } from '../utils/decryptPayload';
import { encryptPayload } from '../utils/encryptPayload';
import { buildUrl } from '../utils/buildUrl';

const onConnectRedirectLink = Linking.createURL('onConnect');
const connectionUrl = 'https://deeplink-movie-tutorial-dummy-site.vercel.app/'; 

const ProfileScreen = () => {
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const handleUrl = async (url: string) => {
      const parsedUrl = new URL(url);
      const params = parsedUrl.searchParams;

      if (parsedUrl.pathname === '/onConnect') {
        const sharedSecret = nacl.box.before(
          bs58.decode(params.get('phantom_encryption_public_key')!),
          nacl.box.keyPair().secretKey
        );
        const data = decryptPayload(params.get('data')!, params.get('nonce')!, sharedSecret);
        setPhantomWalletPublicKey(data.public_key);
      }
    };

    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await handleUrl(initialUrl);
      }
    };

    const urlListener = Linking.addEventListener('url', (event) => {
      handleUrl(event.url);
    });

    getUrlAsync();

    return () => {
      urlListener.remove();
    };
  }, []);

  const connectWallet = async () => {
    const appPublicKey = nacl.box.keyPair().publicKey;
    const redirectUrl = `${connectionUrl}/onConnect`;

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(appPublicKey),
      redirect_link: onConnectRedirectLink,
    });

    const url = buildUrl('connect', params);
    Linking.openURL(url);
  };

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
        <TouchableOpacity style={styles.stat} onPress={connectWallet}>
          <Text style={styles.statLabel}>Connect Wallet</Text>
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
