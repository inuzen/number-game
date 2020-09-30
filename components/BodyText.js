import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BodyText = (props) => {
    return <Text style={{ ...styles.bodyFont, ...props.style }}>{props.children}</Text>;
};

export default BodyText;

const styles = StyleSheet.create({
    bodyFont: {
        fontFamily: 'open-sans',
    },
});
