import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const performOCR = (file: ImagePicker.ImagePickerAsset) => {
    let myHeaders = new Headers();
    myHeaders.append(
      "apikey",
      "becl6l8rOjd5TkfOjo9PoIiiubSkXoIC"
    );
    myHeaders.append(
      "Content-Type",
      "multipart/form-data"
    );

    let raw = file;
    let requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw as any,
      redirect: "follow",
    };

    fetch(
      "https://api.apilayer.com/image_to_text/upload",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setExtractedText(result["all_text"]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.heading}>
            MenuMate
          </Text>
          <Text style={styles.subheading}>
            Image to Text App
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickImageGallery}>
              <Text style={styles.buttonText}>Pick from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImageCamera}>
              <Text style={styles.buttonText}>Take a photo</Text>
            </TouchableOpacity>
          </View>
          {image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            </View>
          )}

          <Text style={styles.labelText}>
            Extracted text:
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.extractedText}>
              {extractedText}
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF5F6D",
    textAlign: "center",
  },
  subheading: {
    fontSize: 24,
    marginBottom: 30,
    color: "#333333",
    textAlign: "center",
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5F6D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FF5F6D',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  labelText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333333",
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  textContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    width: '100%',
  },
  extractedText: {
    fontSize: 16,
    color: "#333333",
  },
});