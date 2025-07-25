import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet, useAnimatedValue, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Wrapper from '../components/Wrapper'
import MenuIcon from '../assets/images/menu.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import Dice from '../components/Dice';
import { Colors } from '../constants/Colors';
import Pocket from '../components/Pocket';
import VerticalPath from '../components/VerticalPath';
import { Plot1Data, Plot2Data, Plot3Data, Plot4Data } from '../helpers/PlotData';
import HorizontalPath from '../components/HorizontalPath';
import FourTriangles from '../components/FourTriangles';
import { useSelector } from 'react-redux';
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from '../redux/reducers/gameSelectors';
import { useIsFocused } from '@react-navigation/native';
import StartGame from '../assets/images/start.png'
import MenuModal from '../components/MenuModal';
import { playSound } from '../helpers/SoundUtility';
import WinModal from '../components/WinModal';

const LudoboardScreen = () => {

  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceTouch);
  const playerNames = useSelector(state => state.game.playerNames);
  const winner = useSelector(state => state.game.winner);
  const isFocused = useIsFocused();

  const [showStartImage, setShowStartImage] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isFocused) {
      setShowStartImage(true);
      const blinkAnimation = Animated.loop(Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
      ]));

      blinkAnimation.start()

      const timeout = setTimeout(() => {
        blinkAnimation.stop();
        setShowStartImage(false);
      }, 3000);
      return () => {
        blinkAnimation.stop();
        clearTimeout(timeout);
      }
    }
  }, [isFocused]);

  const handleMenuPress = useCallback(() => {
    playSound('ui');
    setMenuVisible(true);
  }, [])

  return (
    <Wrapper>
      <TouchableOpacity onPress={handleMenuPress} style={{position: 'absolute', top: 60, left: 20}}>
        <Image source={MenuIcon} style={{width:30, height:30}} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.flexRow} pointerEvents={isDiceTouch ? 'none' : 'auto' }>
            <View style={styles.diceAndNameContainer}>
              <Dice color={Colors.green} player={2} data={player2} />
              <Text style={styles.playerName}>{playerNames[1]}</Text>
            </View>
            <View style={styles.diceAndNameContainer}>
              <Dice color={Colors.yellow}  rotate player={3} data={player3} />
              <Text style={styles.playerName}>{playerNames[2]}</Text>
            </View>
        </View>

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} data={player3} />
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} color={Colors.green} />
            <FourTriangles
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>
            
          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} data={player4} />
          </View>
        </View>

        <View style={styles.flexRow} pointerEvents={isDiceTouch ? 'none' : 'auto' }>
            <View style={styles.diceAndNameContainer}>
              <Dice color={Colors.red} player={1} data={player1} />
              <Text style={styles.playerName}>{playerNames[0]}</Text>
            </View>
            <View style={styles.diceAndNameContainer}>
              <Dice color={Colors.blue}  rotate player={4} data={player4} />
              <Text style={styles.playerName}>{playerNames[3]}</Text>
            </View>
        </View>

      </View>

      {showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{width:deviceWidth*0.5, height:deviceHeight*0.2, position:'absolute', opacity, }}
        />
      )}
      {menuVisible && <MenuModal onPresHide={() => setMenuVisible(false)} visible={menuVisible} />}
      
      {winner !=null && <WinModal winner={winner} /> }
    </Wrapper>
  );
};


const styles = StyleSheet.create({
    diceAndNameContainer: {
        alignItems: 'center',
    },
    playerName: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
    },
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: deviceHeight * 0.5,
        width: deviceWidth,
    },
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    ludoBoard: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        padding: 10,
        //backgroundColor: 'green',
    },
  plotContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  pathContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: '#1E5162'
  },
    
});


export default LudoboardScreen