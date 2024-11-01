import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet, useAnimatedValue, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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

const LudoboardScreen = () => {

  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceTouch);
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
          useNativeDriver:true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver:true
        }),
      ]));
    }
  },[isFocused])

  return (
    <Wrapper>
      <TouchableOpacity style={{position: 'absolute', top: 60, left: 20}}>
        <Image source={MenuIcon} style={{width:30, height:30}} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.flexRow}>
            <Dice color={Colors.green} />
            <Dice color={Colors.yellow}  rotate/>
        </View>

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} />
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} color={Colors.green} />
            <FourTriangles />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>
            
          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} />
          </View>
        </View>

        <View style={styles.flexRow}>
            <Dice color={Colors.red} />
            <Dice color={Colors.blue}  rotate/>
        </View>

      </View>

      {!showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{width:deviceWidth*0.5, height:deviceHeight*0.2, position:'absolute', opacity: 1 }}
        />
      )}
    </Wrapper>
  );
};


const styles = StyleSheet.create({
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