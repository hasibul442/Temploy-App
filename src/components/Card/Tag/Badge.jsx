import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Badge({ text, fontSize, backgroundColor, color }) {
    return (
        <>
            <View style={[styles.tag, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.tagText, { fontSize: fontSize, color: color }]}>{text}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    tag: {
        // backgroundColor: Colors.gray_50,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 6,
    },
    tagText: {
        // fontSize: 12,
        // color: Colors.gray_700,
        textTransform: "capitalize",
    },
})

export default Badge