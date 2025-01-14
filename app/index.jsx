import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");
  const [result, setResult] = useState("");

  // Conversion factors
  const conversionFactors = {
    meters: {
      kilometers: 0.001,
      feet: 3.28084,
      inches: 39.3701,
    },
    kilometers: {
      meters: 1000,
      feet: 3280.84,
      inches: 39370.1,
    },
    feet: {
      meters: 0.3048,
      kilometers: 0.0003048,
      inches: 12,
    },
    inches: {
      meters: 0.0254,
      kilometers: 0.0000254,
      feet: 0.0833333,
    },
  };

  const handleConvert = () => {
    if (!inputValue || isNaN(inputValue)) {
      alert("Please enter a valid number");
      return;
    }

    if (fromUnit === toUnit) {
      setResult(inputValue);
      return;
    }

    const factor = conversionFactors[fromUnit]?.[toUnit];
    const convertedValue = factor ? inputValue * factor : "Conversion not available";
    setResult(convertedValue.toFixed(2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6a11cb", "#2575fc"]}
        style={styles.gradient}
      > 
        <View style={styles.card}>
        <Text
          style={styles.heading}
        >Unit Converter</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter value"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={setInputValue}
          />

          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>From:</Text>
              <Picker
                selectedValue={fromUnit}
                style={styles.picker}
                onValueChange={(itemValue) => setFromUnit(itemValue)}
              >
                <Picker.Item label="Meters" value="meters" />
                <Picker.Item label="Kilometers" value="kilometers" />
                <Picker.Item label="Feet" value="feet" />
                <Picker.Item label="Inches" value="inches" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>To:</Text>
              <Picker
                selectedValue={toUnit}
                style={styles.picker}
                onValueChange={(itemValue) => setToUnit(itemValue)}
              >
                <Picker.Item label="Meters" value="meters" />
                <Picker.Item label="Kilometers" value="kilometers" />
                <Picker.Item label="Feet" value="feet" />
                <Picker.Item label="Inches" value="inches" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleConvert}>
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>

          {result !== "" && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                Result: <Text style={styles.resultValue}>{result}</Text> {toUnit}
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 30,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#8e44ad",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#8e44ad",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: "100%",
    alignItems: "center",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
  },
  resultValue: {
    color: "#228B22",
  },
  heading : {
    marginBottom : 20,
    fontSize : 25,
    fontWeight : 700,
    color : '#8e44ad'
  }
});

export default App;
