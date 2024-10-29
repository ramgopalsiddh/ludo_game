import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { Colors } from '../constants/Colors';
import Pile from './Pile';
import { ArrowSpot, SafeSpots, StarSpots } from '../helpers/PlotData';
import { ArrowRightIcon, StarIcon } from 'react-native-heroicons/outline'
import { RFValue } from 'react-native-responsive-fontsize'

const Cell = ({ color, id }) => {

    const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
    const isStarSpot = useMemo(() => StarSpots.includes(id), [id]);
    const isArrowSpot = useMemo(() => ArrowSpot.includes(id), [id]);


    return (
        <View style={[styles.container, { backgroundColor: isSafeSpot ? color : 'white' }]}>
        
            {isStarSpot && <StarIcon size={20} color="grey" />}
            {isArrowSpot && (<ArrowRightIcon style={{
                color: color,
                transform: [
                    {
                        rotate:id===38 ? '180deg':id==25 ? '90deg' :id===51 ? '-90deg':'0deg',
                    },
                ],
            }}
                size={RFValue(18)} />
            )}

            {/* <Text>{ id}</Text> */}
            {/* <Pile
                cell={true}
                player={2}
                onPress={() => {}}
                pieceId={6}
                color={Colors.green}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.4,
        borderColor: Colors.borderColor,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pieceContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 99,
    },
});


export default React.memo(Cell);