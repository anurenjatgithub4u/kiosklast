import { View, Text, TextInput, Alert ,StyleSheet,Dimensions} from 'react-native';
import React, { useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const NumberRow = ({ numbers }) => {



  return (
    <View style={styles.container}>
      {numbers.map((number, index) => (
        <View key={index} style={styles.numberBox}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
      ))}
    </View>
  );
};

const PlayedGame = ({ route }) => {


const navigation = useNavigation();
const {gameNumber,currentDate,announcementDate,gameType,gameSymbol,level,winnerAmt ,customerName ,createdAt,value,transactionId,kioskOwnerName,
  location,code } = route.params;

const formattedAnnouncementDate = new Date(currentDate).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const [name, setName] = useState('');
const [email, setEmail] = useState('');


const formattedAnnouncementDateTwo = new Date(announcementDate).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});


const formattedAnnouncementTime = new Date(announcementDate).toLocaleTimeString('en-GB', {
  hour: "numeric",
  minute: "numeric",
  hour12: true, 
});

const navToPrint = () =>  {

  if (!name || !email) {
    Alert.alert('Missing Information', 'Please fill in your Name and Email.');
    return;
  }
  navigation.navigate('Print',{gameNumber,currentDate,announcementDate,gameType,gameSymbol,level,winnerAmt ,customerName ,createdAt,value,transactionId
  
    ,kioskOwnerName,
    location,code,name,email
  })

  console.log("Print testing....",gameNumber,currentDate,announcementDate,gameType,gameSymbol,level,winnerAmt ,customerName ,createdAt,value)
}

console.log("currentDate",currentDate)
  return (
    <View
    style={{
     
     
      padding:responsiveHeight(2),
      paddingTop: "16%",
    }}>

      <Text style={styles.Heading}>Your Game</Text>

      <Text style={styles.dateText}>{formattedAnnouncementDate}</Text>
      <Text style={styles.subtitle}> {gameType}, Level {level}, {gameSymbol}{winnerAmt}</Text>
      <LinearGradient
        colors={['#BA8DF3', '#615EE2']} // Example colors, replace with your desired gradient colors
        style={styles.mainCard}
      >
       <Text style={styles.yourNumbers}>Your Numbers</Text>
        <NumberRow numbers={gameNumber} />
      </LinearGradient>

      <Text  style={{fontSize:16 , fontWeight:400,marginTop:20,marginLeft:responsiveWidth(2.5)}}>  Winners will be announced on </Text>
      <View style={{flexDirection:'row'}}>

<Text style={styles.dateTextTwo}>{formattedAnnouncementDate}</Text>
<Text style={styles.dateTextThree}>,{formattedAnnouncementTime}</Text>
</View>

<TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.inputTwo}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />


<TouchableOpacity onPress={()=> navigation.navigate("ChooseGame")}>
      <LinearGradient colors={["#F0C735", "#D98F39"]} style={styles.doneButton}>
     
          <Text style={styles.doneButtonText}>Play Again</Text>
       
      </LinearGradient>
</TouchableOpacity>

<TouchableOpacity onPress={navToPrint}>
      <LinearGradient colors={["#31A062", "#31A062"]} style={styles.doneButtonFinished}>
     
     <Text style={styles.doneButtonText}>Print</Text>
  
 </LinearGradient>
 </TouchableOpacity>

    </View>
  )
}

export default PlayedGame

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",
  },
  numberBox: {
    width: 45,
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    marginLeft: 15,
    marginVertical:5,
    width: '90%',
    marginTop:20
  },
  inputTwo: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    marginLeft: 15,
    marginVertical:5,
    width: '90%',
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
   
    color:'black',
    marginLeft:responsiveWidth(5),
    marginTop:10
  },
  numberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  Heading: {
    fontSize: 34,
    fontWeight: '700',
    color: '#333',
    lineHeight:44.2,
    marginLeft:responsiveWidth(5)
   
   
    
   
  },

  winText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#333',
   
    marginStart: '7%',
    
   
  },

  winnersAnn:{fontSize:16 , 
    
    fontWeight:400},
  yourNumbers: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    
    marginStart: 5,
    marginTop:10
    
    
   
  },
  headerTextYourNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginTop: 10,
    marginRight: 33,
    marginEnd: 32,
  },

  headerTextWinNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginStart: 10,
    marginRight: 10,
    marginEnd: 23,
  },
  NumberMatching: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart: 10,
    marginEnd: 23,
  },
  YouWon: {
    fontSize: 25,
    marginTop: 40,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart: 10,
    marginEnd: 23,
  },
  mainCard: {
    
    padding: 15,
    borderRadius: 15,
    height:134,
    width:'95%',
    elevation: 3,
    backgroundColor: '#F0C735',
    marginTop:30,
    alignSelf:'center'
  },
  dateText: {
    fontSize: 32,
    
    marginLeft:responsiveWidth(5),
    marginTop:5,
   
    color:'black',

    
  },
  dateTextTwo: {
    fontSize: 29,
    marginLeft:responsiveWidth(4.5),
    
    marginTop:5,
   
    color:'black',

    
  },

  dateTextThree: {
    fontSize: 29,
   
    
    marginTop:5,
   
    color:'black',

    
  },
  doneButton: {
   
    height:50,
    borderRadius: 10,
    marginBottom:2,
    width:'95%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:30
  },
  doneButtonFinished: {
   
    height:50,
    borderRadius: 10,
    marginBottom:2,
    width:'95%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:15
  },
});