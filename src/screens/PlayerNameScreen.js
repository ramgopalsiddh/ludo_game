import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
        backgroundColor: '#f0f0f0',
        marginTop: '20%',
        marginBottom: '20%',
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.red,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: Colors.blue,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.green,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlayerNameScreen;
