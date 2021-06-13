import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Colors from "../config/Colors";
import Routes from "../config/Routes";
import i18n, { changeLanguage } from "../i18n/i18n";
import * as navigation from "../utils/NavigationHelper";
import { Picker } from "@react-native-picker/picker";
import { getSettings } from "../services/SettingsService";
import AppStyles from "../styles/AppStyles";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // get language from settings
    getSettings().then((settings) => {
      setSelectedLanguage(settings.language);
      i18n.changeLanguage(settings.language);
    });
  }, []);

  return (
    <View style={[AppStyles.containerHorizontal, styles.container]}>
      <TouchableOpacity activeOpacity={1} style={styles.logoTouch} onPress={() => navigation.navigate(Routes.Home)}>
        <Image style={styles.logo} source={require("../assets/logo_defichange.png")} />
      </TouchableOpacity>
      
      <Picker
        style={styles.languageSelect}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedLanguage(itemValue);
          changeLanguage(itemValue);
        }}
      >
        <Picker.Item label="Deutsch" value="de" />
        <Picker.Item label="English" value="en" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  logoTouch: {
    width: 150,
    height: 30,
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
  },
  languageSelect: {
    marginLeft: "auto",
    color: Colors.Primary,
    borderColor: Colors.Primary,
  },
});

export default Header;
