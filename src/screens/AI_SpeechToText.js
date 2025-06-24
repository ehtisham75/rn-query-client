import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid } from 'react-native';
import Voice from '@react-native-community/voice';
import axios from 'axios';

const AI_SpeechToText = () => {
  
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        setError('Microphone permission denied');
        return;
      }

      setIsRecording(true);
      setText('');
      await Voice.start('en-US'); // You can change the language code
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Stop recording
  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Send audio to OpenAI
  const sendToOpenAI = async (audioUri) => {
    try {
      // Note: You'll need to handle the audio file properly for OpenAI
      // This is a simplified example
      const response = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        {
          file: audioUri,
          model: 'whisper-1',
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setText(response.data.text);
    } catch (error) {
      console.error('OpenAI Error:', error);
      setError('Failed to process audio');
    }
  };

  // Voice handler events
  useEffect(() => {
    Voice.onSpeechStart = () => console.log('Speech started');
    Voice.onSpeechEnd = () => console.log('Speech ended');
    Voice.onSpeechResults = (e) => {
      // For local speech recognition (not using OpenAI)
      setText(e.value[0]);
    };
    Voice.onSpeechError = (e) => {
      console.error(e.error);
      setError(e.error.message);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      {isRecording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
    </View>
  );
}

export default AI_SpeechToText

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});
