import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

import defaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';

import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );
};

const GameScreen = ({ userChoice, onGameOver }) => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [avaliableDeviceHeight, setAvaliableDeviceHeight] = useState(Dimensions.get('window').height);
    const [avaliableDeviceWidth, setAvaliableDeviceWidth] = useState(Dimensions.get('window').width);
    const localMin = useRef(1);
    const localMax = useRef(100);

    useEffect(() => {
        if (userChoice === currentGuess) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    useEffect(() => {
        const updateLayout = () => {
            setAvaliableDeviceHeight(Dimensions.get('window').height);
            setAvaliableDeviceWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const nextGuessHandler = (dir) => {
        if ((!dir && currentGuess < userChoice) || (dir && currentGuess > userChoice)) {
            Alert.alert("Don't lie!", 'You know that this is wrong', [{ text: 'sorry!', style: 'cancel' }]);
            return;
        }
        if (!dir) {
            localMax.current = currentGuess;
        } else {
            localMin.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(localMin.current, localMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds((currRounds) => currRounds + 1);
        setPastGuesses((curPastGuesses) => [nextNumber.toString(), ...curPastGuesses]);
    };

    if (avaliableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={defaultStyles.title}>Computer's Guess:</Text>

                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 0)}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 1)}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>

                <View style={styles.listContainer}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={pastGuesses}
                        keyExtractor={(item) => item}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                    ></FlatList>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Computer's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.card}>
                <View style={styles.buttonRow}>
                    <MainButton onPress={nextGuessHandler.bind(this, 0)}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 1)}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                ></FlatList>
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    card: {
        marginTop: Dimensions.get('window').height > 600 ? 30 : 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 300,
        maxWidth: '80%',
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    },
    list: {
        flexGrow: 1,

        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center',
    },
});
