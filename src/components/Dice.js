import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import { BackgroundImage } from '../helpers/GetIcons';
import LottieView from 'lottie-react-native';
import DiceRoll from '../assets/animation/diceroll.json';
import Arrow from '../assets/images/arrow.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPlayerChance, selectDiceNo, selectDiceRolled } from '../redux/reducers/gameSelectors';
import { resolver } from '../../metro.config';
import { enableCellSelection, enablePileSelection, updateDiceNo, updatePlayerChance } from '../redux/reducers/gameSlice';
import { handleForwardThunk } from '../redux/reducers/gameAction';
import { playSound } from '../helpers/SoundUtility';

const Dice = React.memo(({ color, rotate, player, data }) => {
    const dispatch = useDispatch();
    const currentPlayerChance = useSelector(selectCurrentPlayerChance);
    const isDiceRolled = useSelector(selectDiceRolled);
    const playerPices = useSelector(state => state.game[`player${currentPlayerChance}`],);
    const playerNames = useSelector(state => state.game.playerNames);

    // Import player icon and dice from helpers
    const diceNo = useSelector(selectDiceNo);
    const pileIcon = BackgroundImage.GetImage(color);
    const diceIcon = BackgroundImage.GetImage(diceNo);

    const arrowAnim = useRef(new Animated.Value(0)).current;

    // Arrow animation 
    const [diceRolling, setDiceRolling] = useState(false);
    useEffect(() => {
        const animateArrow = () =>{
            Animated.loop(
                Animated.sequence([
                    Animated.timing(arrowAnim, {
                        toValue: 10,
                        duration: 600,
                        easing:Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(arrowAnim, {
                        toValue: -10,
                        duration: 600,
                        easing:Easing.in(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };
        animateArrow();
    }, [])

    // Promise for delay to show dice number
    const delay = ms => new Promise(resolver => setTimeout(resolver, ms));

    const handleDicePress = async () => {
        const newDiceNo = Math.floor(Math.random() * 6) + 1;
        playSound('dice_roll');
        setDiceRolling(true);
        await delay(800);
        dispatch(updateDiceNo({ diceNo: newDiceNo }));
        setDiceRolling(false);

        if (newDiceNo === 6) {
            const canOpenPiece = playerPices.some(p => p.pos === 0);
            const canMovePiece = playerPices.some(p => p.pos !== 0 && p.travelCount + newDiceNo <= 57);

            if (canOpenPiece || canMovePiece) {
                // A valid move is possible, so give the player the choice.
                if (canOpenPiece) {
                    dispatch(enablePileSelection({ playerNo: player }));
                }
                if (canMovePiece) {
                    dispatch(enableCellSelection({ playerNo: player }));
                }
            } else {
                // No valid move is possible with a 6, so pass the turn.
                let chancePlayer = player + 1;
                if (chancePlayer > 4) {
                    chancePlayer = 1;
                }
                await delay(600);
                dispatch(updatePlayerChance({ chancePlayer: chancePlayer }));
            }
        } else {
            const openPiles = playerPices.filter(pile => pile.pos !== 0 && pile.travelCount < 57);

            if (openPiles.length === 0) {
                // No pieces on board, pass turn
                let chancePlayer = player + 1;
                if (chancePlayer > 4) {
                    chancePlayer = 1;
                }
                await delay(600);
                dispatch(updatePlayerChance({ chancePlayer: chancePlayer }));
            } else {
                // Find which of the open piles can actually move
                const movablePiles = openPiles.filter(
                    pile => pile.travelCount + newDiceNo <= 57,
                );

                if (movablePiles.length === 1) {
                    // Exactly one piece can move, so move it automatically
                    dispatch(handleForwardThunk(player, movablePiles[0].id, movablePiles[0].pos));
                } else if (movablePiles.length > 1) {
                    // More than one piece can move, let the user choose
                    dispatch(enableCellSelection({ playerNo: player }));
                } else {
                    // No pieces can move (all are blocked), pass the turn
                    let chancePlayer = player + 1;
                    if (chancePlayer > 4) {
                        chancePlayer = 1;
                    }
                    await delay(600);
                    dispatch(updatePlayerChance({ chancePlayer: chancePlayer }));
                }
            }
        }
    };

  return (
    <View style={[styles.flexRow, {transform: [{scaleX: rotate ? -1 : 1}]}]}>

        {/* Show player icon */}
        <View style={styles.border1}>
            <LinearGradient 
                style={styles.linearGradient}
                colors={['#0052be', '#5f9fcb', '#97c6c9']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}>
                <View style={styles.pileContainer}>
                    <Image source={pileIcon} style={styles.pileIcon} />
                </View>
            </LinearGradient>
        </View>

        {/* Show dice box  */}
        <View style={styles.border2}>
            <LinearGradient 
                style={styles.diceGradient}
                colors={['#aac8ab', '#aac8ab', '#aac8ab']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}>
                  <View style={styles.diceContainer}>
                    {currentPlayerChance === player && !diceRolling && (
                          <TouchableOpacity
                              disabled={isDiceRolled}
                              activeOpacity={0.4}
                              onPress={handleDicePress}
                          >
                            <Image source={diceIcon} style={styles.dice} />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>
        </View>

        {/* Show Arrow */}
        {currentPlayerChance === player && !isDiceRolled && (
            <Animated.View style={{transform:[{translateX:arrowAnim}]}}>
                <Image source={Arrow} style={{width: 50, height: 30}} />
            </Animated.View>
        )}

        {/* Show dice rotaion animation  */}
        {currentPlayerChance === player && diceRolling && (
            <LottieView
                source={DiceRoll}
                style={styles.rollingDice}
                loop={false}
                autoPlay
                cacheComposition={true}
                hardwareAccelerationAndroid
            />
        )}

    </View>
  );
});

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    border1: {
        borderWidth: 3,
        borderRightWidth: 0,
        borderColor: '#f0ce2c',
    },
    border2: {
        borderWidth: 3,
        padding: 1,
        backgroundColor: '#aac8ab',
        borderRadius: 10,
        borderLeftWidth: 3,
        borderColor: '#aac8ab',
    },
    pileIcon: {
        width: 35,
        height: 35,
    },
    pileContainer: {
        paddingHorizontal: 3,
        alignItems: 'center',
    },
    playerName: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
        alignItems: 'center',
    },
    diceContainer: {
        backgroundColor: '#e8c0c1',
        borderWidth: 1,
        borderRadius: 5,
        width: 55,
        height: 55,
        paddingHorizontal: 8,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    diceGradient: {
        borderWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#f0ce2c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    dice: {
        height: 45,
        width: 45,
    },
    rollingDice: {
        height: 80,
        width: 80,
        zIndex: 99,
        top: -25,
        position: 'absolute',
        left: 38,
    },
    
});

export default Dice