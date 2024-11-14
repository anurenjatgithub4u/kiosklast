import { StyleSheet, Text, View ,Image,Dimensions} from "react-native";
import React from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";


const KioskLanding = () => {
  const navigation = useNavigation();

  const imageUrl = 'https://th.bing.com/th/id/R.dba7c2e0beae32f5dcc9bb7a11bcfc9a?rik=iVMsLRscBKLqYw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fdollar-signs-transparent%2fdollar-signs-transparent-19.png&ehk=MnJi%2b9rQhoH1dgkMOR3qurQN7XV7SzLe9IvHncEFfeM%3d&risl=&pid=ImgRaw&r=0';

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >

<Image source={{ uri: imageUrl }} style={{ width: '50%', height: responsiveHeight(40),marginTop:responsiveHeight(5) }} />

      <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: "bold" }}>
        Win big With{" "}
      </Text>

      <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: "bold" }}>
        Afro Lottery System
      </Text>

      <Text
        style={{
          fontSize: responsiveFontSize(1.6),
          marginTop: responsiveHeight(4),
        }}
      >
        Six Numbers Can Change Your Life
      </Text>

      <Text style={{ fontSize: responsiveFontSize(1.6) }}>
        Get started today and try your luck with us{" "}
      </Text>



<LinearGradient colors={["#F0C735", "#D98F39"]} style={styles.doneButton}>
<TouchableOpacity onPress={()=>navigation.navigate('ChooseGame')} >
          <Text onPress={()=>navigation.navigate('ChooseGame')} style={styles.doneButtonText}>Play Now</Text>
          </TouchableOpacity>
      </LinearGradient>


      
      
    
    </View>
  );
};
//"react-native-reanimated": "~3.6.2",
export default KioskLanding;

const styles = StyleSheet.create({

  doneButton: {
    backgroundColor: "#F0C735",
    paddingVertical: SCREEN_WIDTH * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.01,
   
    width: "85%",
    marginTop: SCREEN_WIDTH * 0.05,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",
  },
});