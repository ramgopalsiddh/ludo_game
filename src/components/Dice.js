import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import { BackgroundImage } from '../helpers/GetIcons';
import LottieView from 'lottie-react-native';
import DiceRoll from '../assets/animation/diceroll.json';
import Arrow from '../assets/images/arrow.png';

const Dice = React.memo(({color, rotate, player, data}) => {

    // Import player icon and dice from helpers
    const diceNo = 4;
    const pileIcon = BackgroundImage.GetImage(color);
    const diceIcon = BackgroundImage.GetImage(diceNo);

    const arrowAnim = useRef(new Animated.Value(0)).current;

    // Arrow animation 
    const [DiceRolling, setDiceRolling] = useState(false);
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
                    <TouchableOpacity>
                        <Image source={diceIcon} style={styles.dice} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>

        {/* Show Arrow */}
        {DiceRolling && (
            <Animated.View style={{transform:[{translateX:arrowAnim}]}}>
                <Image source={Arrow} style={{width: 50, height: 30}} />
            </Animated.View>
        )}

        {/* Show dice rotaion animation  */}
        {DiceRolling && (
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