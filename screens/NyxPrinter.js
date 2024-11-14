import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  DeviceEventEmitter,
} from 'react-native';
import NyxPrinter, {
  PrintAlign,
  PrinterStatus,
  BarcodeTextPosition,
  LcdOpt,
  BitmapType,
} from 'nyx-printer-react-native';

const Separator = () => <View style={styles.separator} />;
const Divider = () => <View style={styles.divider} />;
const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAIAAACUOFjWAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEOklEQVR4nO3dQY4jNxAAQcvw/7+8vvlgqIEtiEWnxhHnhdSrSfBQINmvX79+/QElf/7XDwD/JkpyREmOKMkRJTmiJEeU5IiSHFGSI0pyREmOKMkRJTmiJOev0b9+vV5Lz3HE2214nWce7RJ8euz4//Gt6fZIKyU5oiRHlOSIkhxRkiNKcmYjobfun4ccTUCeHm80cznyJCNHftX4n+aJlZIcUZIjSnJESY4oyRElOaIk58Cc8smRkVX8UrjPN5JNf6XPf5D+38VKSY4oyRElOaIkR5TkiJKcxZFQxOoWtb19bvFZ2CorJTmiJEeU5IiSHFGSI0pyREnOz59T3h/4jQ71rp4A/lJWSnJESY4oyRElOaIkR5TkiJKcxTnll07URtPEkdGH7P16/b+LlZIcUZIjSnJESY4oyRElOQdGQvG3Va7uAft8N9qXvrxilZWSHFGSI0pyREmOKMkRJTmiJOfV38h02ecX9rny70NWSnJESY4oyRElOaIkR5Tk3H5h6HSn1sjnA5rph+ztDbs/V9rbLDd9PCslOaIkR5TkiJIcUZIjSnJESc5sTnl5W9fThxyxd5Ha3sz1yIdP55F719A9sVKSI0pyREmOKMkRJTmiJEeU5HzlEdvVvYZ720BHQ837U8POyWArJTmiJEeU5IiSHFGSI0pyvnIkdN/eUdr7E6sj3/jkSE5WSnJESY4oyRElOaIkR5TkiJKc20dsj3zyyOog8Pc/YWr0IaP9b0eu/FudjFopyRElOaIkR5TkiJIcUZIzGwndv2RspPOKic8/uXMH2u8/xilWSnJESY4oyRElOaIkR5TkiJKc2RHbbxySdc4QH7nPbW83WudXtVKSI0pyREmOKMkRJTmiJOfArWtH5hGjD997meaTzjfuPUZndmalJEeU5IiSHFGSI0pyREmOKMk5cOva6unYzw+8Hhkx3h8Erp5hHfn8Sdy6xtcTJTmiJEeU5IiSHFGSI0pyDlwFeMSRVxO8df+uvdUJ6N7+1yO8xZafSZTkiJIcUZIjSnJESc7iC0PvezuPOHKt2ZO9bV17Lww9wq1r/L+IkhxRkiNKckRJjijJESU5sznlW/G3Q0xHiZdnsZ1b/DpDaCslOaIkR5TkiJIcUZIjSnIOjISedIYdl79x9VK4n/QGjCdWSnJESY4oyRElOaIkR5TkiJKcxTllRGf89tb9k779Q71WSnJESY4oyRElOaIkR5TkiJKcnz+nPDKPPDIIHP3j+6PHI6/LOPKeYyslOaIkR5TkiJIcUZIjSnIWR0L3T8e+NX2MvenP6OtGM5f7ryhd3fhnpSRHlOSIkhxRkiNKckRJjijJOTCnjJxVndrb0ta5vjCydW3KSkmOKMkRJTmiJEeU5IiSnFdkgxn8w0pJjijJESU5oiRHlOSIkhxRkiNKckRJjijJESU5oiRHlOSIkhxRkvM3gRuB4OZ3Cs0AAAAASUVORK5CYII=';

export default function App() {
  const [log, setLog] = React.useState();
  const [printerVersion, setPrinterVersion] = React.useState();
  const [printerServiceVersion, setPrinterServiceVersion] = React.useState();

  React.useEffect(() => {
    _getPrinterVersion();
    _getPrinterServiceVersion();

    // Register scanner listener
    const listener = DeviceEventEmitter.addListener('onScanResult', (res) => {
      appendLog(`scan result: ${JSON.stringify(res)}`);
    });
    return () => {
      listener.remove(); // Clean up listener
    };
  }, []);

  const appendLog = (msg) => {
    setLog((prevLog) => `${prevLog ? prevLog + '\n' + msg : msg}`);
  };

  const _getPrinterVersion = async () => {
    try {
      let res = await NyxPrinter.getPrinterVersion();
      setPrinterVersion(res);
    } catch (e) {
      appendLog(`getPrinterVersion: ${e}`);
    }
  };

  const _getPrinterServiceVersion = async () => {
    try {
      let res = await NyxPrinter.getServiceVersion();
      setPrinterServiceVersion(res);
    } catch (e) {
      appendLog(`getPrinterServiceVersion: ${e}`);
    }
  };

  const _printTest = async () => {
    try {
      let ret = await NyxPrinter.getPrinterStatus();
      if (ret !== PrinterStatus.SDK_OK) {
        appendLog(`printer status: ${PrinterStatus.msg(ret)}`);
        return;
      }
      await NyxPrinter.printText("Receipt", { textSize: 48, align: PrintAlign.CENTER });
      await NyxPrinter.printText(`\nOrder Time:\t${Date.now()}\n`, { align: PrintAlign.CENTER });
      let weights = [1, 1, 1, 1];
      let row1 = ["ITEM", "QTY", "PRICE", "TOTAL"];
      let row2 = ["Apple", "1", "2.00", "2.00"];
      let row3 = ["Orange", "1", "2.00", "2.00"];
      let row4 = ["Banana", "1", "2.00", "2.00"];
      let row5 = ["Cherry", "1", "2.00", "2.00"];
      let styles = [
        { align: PrintAlign.CENTER },
        { align: PrintAlign.CENTER },
        { align: PrintAlign.CENTER },
        { align: PrintAlign.CENTER }
      ];
      await NyxPrinter.printTableText(row1, weights, styles);
      await NyxPrinter.printTableText(row2, weights, styles);
      await NyxPrinter.printTableText(row3, weights, styles);
      await NyxPrinter.printTableText(row4, weights, styles);
      await NyxPrinter.printTableText(row5, weights, styles);
      await NyxPrinter.printText("\nOrder Price: \t\t9999.00\n", { align: PrintAlign.CENTER });
      await NyxPrinter.printQrCode(Date.now().toString(), 300, 300, PrintAlign.CENTER);
      await NyxPrinter.printText("\n", {});
      await NyxPrinter.printBarcode(Date.now().toString(), 300, 150, BarcodeTextPosition.TEXT_BELOW, PrintAlign.CENTER);
      await NyxPrinter.printBitmap(imageBase64, BitmapType.BLACK_WHITE, PrintAlign.CENTER);
      await NyxPrinter.printText("\n***Print Complete***", { align: PrintAlign.CENTER });
      await NyxPrinter.printEndAutoOut();
    } catch (e) {
      appendLog(`printTest: ${e}`);
    }
  };

  const _showLcd = async () => {
    try {
      await NyxPrinter.configLcd(LcdOpt.INIT);
      await NyxPrinter.showLcdBitmap(imageBase64);
    } catch (e) {
      appendLog(`showLcd: ${e}`);
    }
  };

  const _resetLcd = async () => {
    try {
      await NyxPrinter.configLcd(LcdOpt.INIT);
    } catch (e) {
      appendLog(`resetLcd: ${e}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Printer Info</Text>
        <Text>Printer Version: {printerVersion}</Text>
        <Text>Service Version: {printerServiceVersion}</Text>
        <Button title="Print Test" onPress={_printTest} />
        <Button title="Show LCD" onPress={_showLcd} />
        <Button title="Reset LCD" onPress={_resetLcd} />
        <Text style={styles.header}>Log</Text>
        <Text>{log}</Text>
        <Separator />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  divider: {
    height: 10,
  },
});
