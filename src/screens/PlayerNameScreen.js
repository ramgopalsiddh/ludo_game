import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updatePlayerNames } from '../redux/reducers/gameSlice';
import Wrapper from '../components/Wrapper';
import { Colors } from '../constants/Colors';

const PlayerNameScreen = () => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [player3, setPlayer3] = useState('');
    const [player4, setPlayer4] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleStartGame = () => {
        dispatch(updatePlayerNames([player1, player2, player3, player4]));
        navigation.navigate('LudoBoardScreen');
    };

    const renderInput = (player, setPlayer, color, placeholder) => (
        <View style={styles.inputContainer}>
            <Image source={BackgroundImage.GetImage(color)} style={styles.pileIcon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={Colors.blue}
                value={player}
                onChangeText={setPlayer}
            />
        </View>
    );

    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Enter Player Names</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Player 1 Name"
                    value={player1}
                    onChangeText={setPlayer1}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Player 2 Name"
                    value={player2}
                    onChangeText={setPlayer2}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Player 3 Name"
                    value={player3}
                    onChangeText={setPlayer3}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Player 4 Name"
                    value={player4}
                    onChangeText={setPlayer4}
                />
                 <TouchableOpacity style={styles.button} onPress={handleStartGame}>
                    <Text style={styles.buttonText}>Start Game</Text>
                </TouchableOpacity>
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
    },
    backIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        transform: [{ rotate: '180deg' }]
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.red,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    pileIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: Colors.blue,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: Colors.blue
    },
    button: {
        backgroundColor: Colors.green,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlayerNameScreen;