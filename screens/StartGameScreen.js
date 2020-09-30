import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const StartGameScreen = ({ onStartGame }) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);

    const numberInputHandler = (value) => {
        setEnteredValue(value.replace(/[^0-9]/g, '')); //to prevent android dot and pasting of text
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be between 1 and 99', [
                { text: 'okay', style: 'destructive', onPress: resetInputHandler },
            ]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Chosen Number:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Enter a Number</BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonRow}>
                        <View style={styles.button}>
                            <Button title="reset" color={Colors.accent} onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button title="confirm" color={Colors.primary} onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: { maxWidth: '80%', width: 300, alignItems: 'center' },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 15,
    },
    button: {
        flex: 1,
        maxWidth: '40%',
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'open-sans',
    },
});
export default StartGameScreen;
