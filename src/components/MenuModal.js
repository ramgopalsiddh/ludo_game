import React, { useCallback } from "react";
import { Text, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import GradientButton from "./GradientButton";
import { useDispatch } from "react-redux";
import { announceWinner, resetGame } from "../redux/reducers/gameSlice";
import { playSound } from "../helpers/SoundUtility";
import { goBack } from "../navigation/NavigationUtil";
import LinearGradient from "react-native-linear-gradient";

const MenuModal = ({ visible, onPresHide }) => {
    const dispatch = useDispatch();


    const handleNewGame = useCallback(() => {
        dispatch(resetGame());
        playSound('game_start');
        dispatch(announceWinner(null));
        onPresHide();
    }, [dispatch, onPresHide]);

    const handleHome = useCallback(() => {
        goBack();
    }, []);

    return (
        <Modal
            style={styles.bottomModalView}
            isVisible={visible}
            backdropColor="black"
            backdropOpacity={0.8}
            onBackdropPress={onPresHide}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onBackButtonPress={onPresHide} >
            <View style={styles.modalContainer} >
                <LinearGradient
                    colors={['#0f0c29', '#302b63', '#24243e']}
                    style={styles.gradientContainer} >
                    <View style={styles.subView}>
                        <GradientButton title="RESUME" onPress={onPresHide} />
                        <GradientButton title="NEW GAME" onPress={handleNewGame} />
                        <GradientButton title="HOME" onPress={handleHome} />
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    bottomModalView: {
        justifyContent: 'center',
        width: '95%',
        alignSelf: 'center',
    },
    gradientContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        padding: 20,
        paddingVertical: 40,
        width: '95%',
        borderWidth: 2,
        borderColor: 'gold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subView: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default MenuModal;