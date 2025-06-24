import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
    PermissionsAndroid,
    Platform,
    Button,
    Image
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from 'axios';
import keys from '../utils/keys';

const audioRecorderPlayer = new AudioRecorderPlayer();

const SpeechToText = () => {
    const [transcription, setTranscription] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const audioPath = useRef('');
    const micAnimation = useRef(null);

    const [progress] = useState(new Animated.Value(0));
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);
            return (
                granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
            );
        }
        return true;
    };

    const startRecording = async () => {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return;

            const result = await audioRecorderPlayer.startRecorder();
            audioPath.current = result;
            setIsRecording(true);
            setError('');

            // Animation
            micAnimation.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(progress, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(progress, {
                        toValue: 0,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            );

            micAnimation.current.start();

        } catch (e) {
            setError(JSON.stringify(e));
        }
    };

    const stopRecording = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setIsRecording(false);

            console.log("=== Audio path result ===", result)
            if (micAnimation.current) {
                micAnimation.current.stop();
                micAnimation.current = null;
            }

            // Prevent multiple submissions
            if (!loading) {
                setLoading(true);
                await sendToOpenAI(result);
                setLoading(false);
            }

        } catch (e) {
            setError(JSON.stringify(e));
            setLoading(false);
        }
    };

    const sendToOpenAI = async (filePath) => {
        const file = {
            uri: Platform.OS === 'android' ? `file://${filePath}` : filePath,
            type: 'audio/x-m4a',
            name: 'recording.m4a',
        };

        console.log("=== file in open ai =====", file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', 'whisper-1');

        console.log("=== open ai form data=====", formData)

        let retries = 3;
        let delay = 1000;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/audio/transcriptions',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${keys.OPEN_API_SECRET_KEY}`,
                        },
                    }
                );
                setTranscription(response.data.text);
                return;
            } catch (error) {
                if (error.response?.status === 429 && attempt < retries - 1) {
                    console.warn(`Rate limited. Retrying in ${delay}ms...`);
                    await new Promise((res) => setTimeout(res, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    setError('Whisper API error: ' + error.message);
                    console.error('Whisper API error:', error);
                    return;
                }
            }
        }
    };

    useEffect(() => {
    }, [])

    const scale = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2],
    });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Speech to Text</Text>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{transcription || 'Your transcribed text will appear here...'}</Text>
                {pitch ? <Text style={styles.pitch}>Voice pitch: {pitch}</Text> : null}
            </View>

            <Animated.View style={[styles.micButton, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    onPressIn={startRecording}
                    onPressOut={stopRecording}
                    activeOpacity={0.7}
                >
                    <Image source={isRecording ? require('../assets/images/mic.png')
                        : require('../assets/images/mic-off.png')}
                        style={{
                            width: 30, height: 30,
                            tintColor: isRecording ? '#03DAC6' : '#E1E1E1'
                        }}
                    />
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton}>
                    {/* <MaterialIcons name="history" size={24} color="#E1E1E1" /> */}
                    <Image source={require('../assets/images/history.png')}
                        style={{
                            width: 20, height: 20,
                            tintColor: '#E1E1E1'
                        }}
                    />
                    <Text style={styles.controlText}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton}>
                    {/* <MaterialIcons name="settings" size={24} color="#E1E1E1" /> */}
                    <Image source={require('../assets/images/settings.png')}
                        style={{
                            width: 20, height: 20,
                            tintColor: '#E1E1E1'
                        }}
                    />
                    <Text style={styles.controlText}>Settings</Text>
                </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

export default SpeechToText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#E1E1E1',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 20,
    },
    textContainer: {
        backgroundColor: '#1E1E1E',
        width: '100%',
        minHeight: 150,
        borderRadius: 12,
        padding: 15,
        marginVertical: 20,
    },
    text: {
        color: '#E1E1E1',
        fontSize: 16,
        lineHeight: 24,
    },
    pitch: {
        color: '#03DAC6',
        fontSize: 14,
        marginTop: 10,
        fontStyle: 'italic',
    },
    micButton: {
        backgroundColor: '#6200EE',
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#6200EE',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
        marginBottom: 20,
    },
    controlButton: {
        alignItems: 'center',
    },
    controlText: {
        color: '#E1E1E1',
        fontSize: 12,
        marginTop: 5,
    },
    error: {
        color: '#CF6679',
        fontSize: 14,
        marginTop: 10,
    },
});


