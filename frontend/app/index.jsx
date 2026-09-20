import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "sujey" && password === "24680") {
      router.replace("/tabs/dashboard");
    } else {
      Alert.alert(
        "Access Denied",
        "Invalid credentials. Use sujey / 24680"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>CollabLens</Text>
        <Text style={styles.subtitle}>Team Analytics Platform</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05070B",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#0D1117",
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: "#202938",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "#8B95A7",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 28,
  },

  input: {
    height: 52,
    backgroundColor: "#151B24",
    borderRadius: 10,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#293241",
    marginBottom: 14,
  },

  button: {
    height: 52,
    backgroundColor: "#00C2FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#001018",
    fontSize: 16,
    fontWeight: "800",
  },
});