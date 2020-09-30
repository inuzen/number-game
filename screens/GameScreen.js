import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

import defaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';

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
//with the scroll view
// const renderListItem = (value, numOfRound) => {
//     return (
//         <View key={value} style={styles.listItem}>
//             <BodyText>#{numOfRound}</BodyText>
//             <BodyText>{value}</BodyText>
//         </View>
//     );
// };

const GameScreen = ({ userChoice, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const localMin = useRef(1);
    const localMax = useRef(100);

    useEffect(() => {
        if (userChoice === currentGuess) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
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
        setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Computer's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{ marginTop: 20 }}>
                <View style={styles.buttonRow}>
                    {/* <Button title="Lower" onPress={nextGuessHandler.bind(this, 0)} /> */}
                    <MainButton onPress={nextGuessHandler.bind(this, 0)}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    {/* <Button title="Greater" onPress={nextGuessHandler.bind(this, 1)} /> */}
                    <MainButton onPress={nextGuessHandler.bind(this, 1)}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, idx) => renderListItem(guess, pastGuesses.length - idx))}
                </ScrollView> */}
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        maxWidth: '80%',
    },
    listContainer: {
        flex: 1,
        width: '60%',
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
});
