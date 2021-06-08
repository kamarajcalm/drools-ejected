import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily =settings.fontFamily
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
    
        return (
            <View style={{ flex: 1 }}>
        
                {/* Headers */}
                <LinearGradient
                    style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ marginTop: Constants.statusBarHeight }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Statistics</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(Statistics);