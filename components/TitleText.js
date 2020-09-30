import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TitleText = (props) => {
    return <Text style={{ ...styles.titleFont, ...props.style }}>{props.children}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
    titleFont: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
});
