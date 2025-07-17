import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AWSService from '../services/AWSService';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await AWSService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log('User not authenticated');
    }
  };

  const handleSignIn = () => {
    // Navigate to sign in screen or show modal
    Alert.alert('Sign In', 'Sign in functionality to be implemented');
  };

  const handleSignOut = async () => {
    try {
      await AWSService.signOut();
      setUser(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toast Orders App</Text>
      
      {user ? (
        <View style={styles.userSection}>
          <Text style={styles.welcomeText}>Welcome, {user.username}!</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.buttonText}>Browse Menu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Text style={styles.buttonText}>Order History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.signOutButton]} 
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authSection}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.buttonText}>Browse Menu (Guest)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  userSection: {
    alignItems: 'center',
    width: '100%',
  },
  authSection: {
    alignItems: 'center',
    width: '100%',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;