import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = ({ title }) => {
    return (
        <View style={styles.container}>
            <TitleText style={styles.text}>{title}</TitleText>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
    },
});
export default Header;
