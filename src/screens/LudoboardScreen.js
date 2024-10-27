import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Wrapper from '../components/Wrapper'
import MenuIcon from '../assets/images/menu.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import Dice from '../components/Dice';
import { Colors } from '../constants/Colors';
import Pocket from '../components/Pocket';
import VerticalPath from '../components/VerticalPath';
import { Plot2Data } from '../helpers/PlotData';

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

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.blue} player={3} />
          </View>
            
        </View>

        <View style={styles.flexRow}>
            <Dice color={Colors.red} />
            <Dice color={Colors.blue}  rotate/>
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
        backgroundColor: 'green',
    },
  plotContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ccc',
    },
    
});


export default LudoboardScreen