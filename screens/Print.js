import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text, Image } from 'react-native';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

const PrintComponent = ({ route }) => {
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const navigation = useNavigation();
  const {
    gameNumber,
    currentDate,
    announcementDate,
    gameType,
    gameSymbol,
    level,
    winnerAmt,
    customerName,
    createdAt,
    value,
    transactionId,
    kioskOwnerName,
    location,
    code,
    name,
    email
  } = route.params;

  const extractDate = (dateTimeString) => {
    return dateTimeString.split('T')[0];
  };

  const print = async () => {
    const slipContent = `
    <div style="font-family: Arial, sans-serif; width: 2.25in; height: 3.50in;">
      <div style="flex-direction: row; align-items: center;">
        <h1 style="text-align: center; font-size: 16px; font-weight: bold; margin-top: 5px;">AFRO LOTTERY SYSTEM</h1>
      </div>
      <div class="slip" style="border-width: 0.5px; border-color: black; padding: 16px; margin: 15px;">
        <div style="margin-bottom: 8px; margin-top: 5px; font-weight: bold; font-size: 12px;">Game details</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Customer Name:</span> ${name}</div>
         <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Customer Email:</span> ${email}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;">
        <span style="font-weight: bold;">Selected Numbers:</span>
        <span style="font-weight: bold; font-size: 14px;">
          ${gameNumber.map(number => `<span>${number}</span>`).join(', ')}
        </span>
      </div>
      <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Coupon code:</span> ${code}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Announcement Date:</span> ${extractDate(announcementDate)}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Game Type:</span> ${gameType}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Winner Amount:</span> ${winnerAmt}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Coupon Price:</span> ${value}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Kiosk Name:</span> ${kioskOwnerName}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Location :</span> ${location}</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Created At:</span> ${extractDate(currentDate)}</div>
        <div style="margin-bottom: 15px; margin-top: 5px; font-size: 12px;"><span style="font-weight: bold;">Transaction Id:</span> <span style="border-bottom: 1px solid black;">${transactionId}</span></div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;">Keep this receipt and the coupon receipt to claim the prize. All the best !</div>
        <div style="margin-bottom: 8px; margin-top: 5px; font-size: 12px;">Contact us on als@crowdafrik.com</div>
      </div>
    </div>
    `;

    try {
      await RNPrint.print({
        html: slipContent,
        printer: selectedPrinter, // if available
      });
    } catch (error) {
      console.error('Print Error:', error);
    }
  };

  const printToFile = async () => {
    const slipContent = `
      // Add your HTML content here
    `;
    try {
      const { filePath } = await RNPrint.printToFile({
        html: slipContent,
      });
      await Share.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
      });
    } catch (error) {
      console.error('Error while printing to file:', error);
    }
  };

  const selectPrinter = async () => {
    try {
      const printer = await RNPrint.selectPrinter();
      setSelectedPrinter(printer);
    } catch (error) {
      console.error('Printer Selection Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../assets/logoo.jpeg')}
          style={[styles.logo, { width: 50, height: 50, marginBottom: 5 }]}
          resizeMode="contain"
        />
        <Text style={styles.heading}>AFRO LOTTERY SYSTEM</Text>
      </View>

      <View style={styles.slip}>
        <Text style={styles.fieldTwo}>Game details</Text>
        <Text style={styles.field}>Customer Name: {name}</Text>
        <Text style={styles.field}>Customer Email: {email}</Text>
        <Text style={styles.field}>Selected Numbers: {gameNumber.join(', ')}</Text>
        <Text style={styles.field}>Coupon Code: {code}</Text>
        <Text style={styles.field}>Announcement Date: {extractDate(announcementDate)}</Text>
        <Text style={styles.field}>Game Type: {gameType}</Text>
        <Text style={styles.field}>Winner Amount: {winnerAmt}</Text>
        <Text style={styles.field}>Coupon Price : {value}</Text>
        <Text style={styles.field}>Kiosk Name : {kioskOwnerName}</Text>
        <Text style={styles.field}>Location : {location}</Text>
        <Text style={styles.field}>Transaction Date: {extractDate(currentDate)}</Text>
        <Text style={styles.field}>Transaction Id : {transactionId}</Text>
        <Text style={styles.field}>Keep this receipt and the coupon receipt to claim the prize. All the best !</Text>
        <Text style={styles.field}>Contact us on als@crowdafrik.com </Text>
        <Text style={styles.field}>www.afrolottery.com{value}</Text>
      </View>

      <Button title="Print" onPress={print} />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
     
      backgroundColor: 'white',
      flexDirection: 'column',
      padding: 8,
      paddingTop:'15%'
    },
    spacer: {
      height: 8,
    },
    printer: {
      textAlign: 'center',
    },
  
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign:'center',
      marginTop:5
    },
    slip: {
      borderWidth: .5,
      borderColor: 'black',
      padding: 16,
      marginBottom: 20,
      margin:15
    },
    field: {
      marginBottom: 10,
      marginTop:5
    },
    fieldTwo: {
      marginBottom: 10,
      marginTop:5,
      fontWeight: 'bold',
    },
  });

export default PrintComponent;