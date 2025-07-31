import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updatePlayerNames } from '../redux/reducers/gameSlice';
import Wrapper from '../components/Wrapper';
import { Colors } from '../constants/Colors';
import { BackgroundImage } from '../helpers/GetIcons';

const PlayerNameScreen = () => {
    const [numPlayers, setNumPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState(['', '', '', '']);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleHome = () => {
        navigation.navigate('HomeScreen');
    };

    const handleStartGame = () => {
        const players = playerNames.slice(0, numPlayers).map((name, index) => name || `Player ${index + 1}`);
        dispatch(updatePlayerNames(players));
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
            <View contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Enter Player Names</Text>
                <View style={styles.numPlayersContainer}>
                    <Text style={styles.numPlayersLabel}>Number of Players:</Text>
                    <View style={styles.numPlayersButtons}>
                        {[2, 3, 4].map(num => (
                            <TouchableOpacity
                                key={num}
                                style={[styles.numPlayersButton, numPlayers === num && styles.numPlayersButtonActive]}
                                onPress={() => setNumPlayers(num)}
                            >
                                <Text style={styles.numPlayersButtonText}>{num}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {Array.from({ length: numPlayers }).map((_, index) =>
                    <View key={index}>
                        {renderInput(
                            playerNames[index],
                            (text) => {
                                const newPlayerNames = [...playerNames];
                                newPlayerNames[index] = text;
                                setPlayerNames(newPlayerNames);
                            },
                            [Colors.red, Colors.green, Colors.yellow, Colors.blue][index],
                            `Player ${index + 1} Name`
                        )}
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleStartGame}>
                        <Text style={styles.buttonText}>Start Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleHome}>
                        <Text style={styles.buttonText}>HOME</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 20,
        width: '90%',
        borderRadius: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.red,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        marginBottom: 20,
    },
    numPlayersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    numPlayersLabel: {
        fontSize: 18,
        color: Colors.blue,
        marginRight: 10,
    },
    numPlayersButtons: {
        flexDirection: 'row',
    },
    numPlayersButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    numPlayersButtonActive: {
        backgroundColor: Colors.green,
    },
    numPlayersButtonText: {
        color: Colors.blue,
        fontSize: 16,
        fontWeight: 'bold',
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
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.green,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlayerNameScreen;
