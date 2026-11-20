
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Load saved profile data
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedProfile =
        await AsyncStorage.getItem('studentProfile');

      if (storedProfile) {
        const parsedData = JSON.parse(storedProfile);

        setStudentName(parsedData.name || '');
        setStudentId(parsedData.id || '');
        setProfileImage(parsedData.imageUri || null);
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
    }
  };

  // Pick an image from gallery
  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          "You've refused to allow this app to access your photos!"
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (!result.canceled && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }

    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Unable to select image.');
    }
  };

  // Save profile details
  const saveProfileData = async () => {
    if (!studentName.trim() || !studentId.trim()) {
      Alert.alert(
        'Error',
        'Please enter both Name and Student ID.'
      );
      return;
    }

    try {
      const profileData = {
        name: studentName.trim(),
        id: studentId.trim(),
        imageUri: profileImage,
      };

      await AsyncStorage.setItem(
        'studentProfile',
        JSON.stringify(profileData)
      );

      Alert.alert(
        'Success',
        'Profile details saved successfully!'
      );

    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  // Clear all locally stored data
  const clearAllData = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear all saved data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();

              setStudentName('');
              setStudentId('');
              setProfileImage(null);

              Alert.alert(
                'Success',
                'All local data has been wiped.'
              );

            } catch (error) {
              console.error('Failed to clear storage:', error);
              Alert.alert('Error', 'Failed to clear storage.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        onPress={pickImage}
        style={styles.imageContainer}
      >
        <Image
          source={{
            uri:
              profileImage ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.avatar}
        />

        <View style={styles.editBadge}>
          <Text style={styles.editText}>✎</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.heading}>
        Student Profile
      </Text>

      <View style={styles.form}>

        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={studentName}
          onChangeText={setStudentName}
        />

        <Text style={styles.label}>Student ID</Text>

        <TextInput
          style={styles.input}
          placeholder="PS/20XX/XXX"
          value={studentId}
          onChangeText={setStudentId}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveProfileData}
        >
          <Text style={styles.buttonText}>
            Save Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearAllData}
        >
          <Text style={styles.buttonText}>
            Clear All Tasks
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginTop: 25,
    marginBottom: 10,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: 'white',
    fontSize: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});