import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";
import Header from "../shared/header";
import React from "react";
import { Image } from "react-native";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Gamezone" />,
        headerBackground: () => (
          <Image
            source={require("../assets/game_bg.png")}
            style={{ height: 60 }}
          />
        ),
      };
    },
  },

  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      title: "Revew Details",
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee", height: 60 },
  },
});

export default HomeStack;
