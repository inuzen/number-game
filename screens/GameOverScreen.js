import React from 'react';
import { Button, StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game over</TitleText>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/success.png')} resizeMode="cover" />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        Computer needed <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number{' '}
                        <Text style={styles.highlight}>{userNumber}</Text>
                    </BodyText>
                </View>
                <MainButton onPress={onRestart}>Restart</MainButton>
            </View>
        </ScrollView>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    imageContainer: {
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginVertical: Dimensions.get('window').height / 60,
        width: '80%',
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
});
