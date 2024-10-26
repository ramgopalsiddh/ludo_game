import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Wrapper from '../components/Wrapper'
import MenuIcon from '../assets/images/menu.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import Dice from '../components/Dice';
import { Colors } from '../constants/Colors';

const LudoboardScreen = () => {
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

        <View style={styles.ludoboard}>

        </View>

      </View>
    </Wrapper>
  );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: deviceHeight * 0.5,
        width: deviceWidth,
        backgroundColor: 'red',
    },
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
    }
    
});


export default LudoboardScreen