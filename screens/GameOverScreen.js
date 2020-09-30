import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <TitleText>Game over</TitleText>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/success.png')} resizeMode="cover" />
                {/* <Image style={styles.image} source={{ uri: 'https://i.imgur.com/XithH4r.jpeg' }} resizeMode="cover" /> */}
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Computer needed <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number{' '}
                    <Text style={styles.highlight}>{userNumber}</Text>
                </BodyText>
            </View>
            {/* <BodyText>Number was: {userNumber}</BodyText> */}
            {/* <Button title="Restart" onPress={onRestart} /> */}
            <MainButton onPress={onRestart}>Restart</MainButton>
        </View>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: 150,
        width: 300,
        height: 300,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginVertical: 20,
        width: '80%',
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
});
