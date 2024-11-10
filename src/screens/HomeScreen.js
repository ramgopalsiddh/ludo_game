import { StyleSheet, Image, Text, View, Pressable, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/logo.png';
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import GradientButton from '../components/GradientButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPostions } from '../redux/reducers/gameSelectors';
import { useIsFocused } from '@react-navigation/native';
import { playSound } from '../helpers/SoundUtility';
import SoundPlayer from 'react-native-sound-player';
import { resetGame } from '../redux/reducers/gameSlice';
import { navigate } from '../navigation/NavigationUtil';
import LottieView from 'lottie-react-native';
import Witch from '../assets/animation/witch.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';


const HomeScreen = () => {

  const dispatch = useDispatch()
  const witchAnim = useRef(new Animated.Value(-deviceWidth)).current
  const scaleXAnim = useRef(new Animated.Value(-1)).current
  const currentPosition = useSelector(selectCurrentPostions)
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      playSound('home')
    }
  }, [isFocused])

  const renderButton = useCallback((title, onPress) =>
    <GradientButton title={title} onPress={onPress} />,
    [],
  );

  const startGame = async (isNew = false) => {
    SoundPlayer.stop();
    if (isNew) {
      dispatch(resetGame())
    }
    navigate('LudoBoardScreen')
    playSound('game_start')
  }

  const handleNewGamePress = useCallback(()=>{ startGame(true) },[])

  const handleResumePress = useCallback(() => { startGame() }, [])

// Witch animation logic
  const loopAnimation = () => {
    Animated.loop(
      Animated.sequence([

        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: deviceWidth * 0.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: -1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),

        Animated.delay(3000),

        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: deviceWidth * 2,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: -deviceWidth * 0.05,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),

        Animated.delay(3000),

        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: -deviceWidth * 2,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  };

  useEffect(() => {
    const cleanupAnimation = () => {
      Animated.timing(witchAnim).stop()
      Animated.timing(scaleXAnim).stop()
    }
    loopAnimation()

    return cleanupAnimation;
  },[witchAnim, scaleXAnim])

  // function for open link
  const openLink = (url) => {
    Linking.openURL(url);
  }

  return (
    <Wrapper style={{justifyContent: 'flex-start'}}>
      <Animated.View style={styles.imgContainer}>
        <Image source={Logo} style={styles.img} />
      </Animated.View>

      {currentPosition.length!==0 && renderButton('RESUME', handleResumePress)}
      {renderButton('NEW GAME', handleNewGamePress)}

      <Animated.View
        style={[styles.witchContainer,
          {
            transform: [{translateX: witchAnim}, {scaleX: scaleXAnim}],
          },
        ]}>
        <Pressable onPress={() => {
          const random = Math.floor(Math.random() * 3) + 1;
          // playSound(`girl${random}`);
        }}>
          <LottieView
            hardwareAccelerationAndroid
            source={Witch}
            autoPlay
            speed={1}
            style={styles.witch}
          />

        </Pressable>
      </Animated.View>

      {/* Social media icons at the bottom */}
      <View style={styles.socialLinks}>
        <Pressable onPress={() => openLink('https://twitter.com/ramgopalsiddh1')} style={styles.iconWrapper}>
          <FontAwesome name="twitter" size={50} color="#1DA1F2" />
        </Pressable>
        <Pressable onPress={() => openLink('https://www.linkedin.com/in/ramgopalsiddh')} style={styles.iconWrapper}>
          <FontAwesome name="linkedin" size={50} color="#0077B5" />
        </Pressable>
        <Pressable onPress={() => openLink('https://github.com/ramgopalsiddh')} style={styles.iconWrapper}>
          <FontAwesome name="github" size={50} color="#333" />
        </Pressable>
        <Pressable onPress={() => openLink('https://ramgopal.dev')} style={styles.iconWrapper}>
          <FontAwesome name="user" size={50} color="#000" />
        </Pressable>
      </View>
      <Text style={styles.artist}>Made By - RAM GOPAL SIDDH</Text>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
    alignSelf: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  artist: {
    position: 'absolute',
    bottom: 60,
    color: 'white',
    fontWeight: '900',
    opacity: 0.8,
    fontStyle: 'italic',
    fontSize: 19,
  },
  witchContainer: {
    position: 'absolute',
    top: '45%',
    left: '24%',
  },
  witch: {
    height: 300,
    width: 250,
    transform: [{rotate: '25deg'}],
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '95%',
    position: 'absolute',
    bottom: 110,
  },
  iconWrapper: {
    borderWidth: 3,
    borderColor: 'gold',
    borderRadius: 20,
    padding: 8, 
    backgroundColor: 'white',
  },
});

export default HomeScreen;