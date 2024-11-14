import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import NyxPrinter from "nyx-printer-react-native";

const PrinterTest = () => {
  const _printTest = async () => {
    try {
      const status = await NyxPrinter.getPrinterStatus();
      if (status !== PrinterStatus.SDK_OK) {
        console.log(`Printer status: ${PrinterStatus.msg(status)}`);
        return;
      }

      await NyxPrinter.printText("Receipt", { textSize: 48, align: PrintAlign.CENTER });
      await NyxPrinter.printText(`\nOrder Time:\t${new Date().toLocaleString()}\n`, { align: PrintAlign.CENTER });

      const weights = [1, 1, 1, 1];
      const rows = [
        ["ITEM", "QTY", "PRICE", "TOTAL"],
        ["Apple", "1", "2.00", "2.00"],
        ["Orange", "1", "2.00", "2.00"],
        ["Banana", "1", "2.00", "2.00"],
        ["Cherry", "1", "2.00", "2.00"]
      ];
      const styles = Array(4).fill({ align: PrintAlign.CENTER });

      for (const row of rows) {
        await NyxPrinter.printTableText(row, weights, styles);
      }

      await NyxPrinter.printText("\nOrder Price: \t\t9999.00\n", { align: PrintAlign.CENTER });
      await NyxPrinter.printQrCode(Date.now().toString(), 300, 300, PrintAlign.CENTER);
      await NyxPrinter.printBarcode(Date.now().toString(), 300, 150, BarcodeTextPosition.TEXT_BELOW, PrintAlign.CENTER);
      await NyxPrinter.printText("\n***Print Complete***", { align: PrintAlign.CENTER });
    } catch (e) {
      console.log(`printTest: ${e}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Printer Test</Text>
      <Button title="Print Test" onPress={_printTest} />
    </View>
  );
};

export default PrinterTest;
