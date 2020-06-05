import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForms";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      title: "Update old projects",
      rating: 2,
      body: "lorem ipsum",
      key: "1",
    },
    {
      title: "Fix React DevTools",
      rating: 5,
      body: "lorem ipsum",
      key: "2",
    },
    {
      title: "Download Yarn",
      rating: 4,
      body: "lorem ipsum",
      key: "3",
    },
  ]);

  const addReview = (review) => {
    review.key = Math.random().toString();
    setReviews((currentReviews) => {
      return [review, ...currentReviews];
    });
    setModalOpen(false);
  };

  const pressHandler = (key) => {
    setReviews((prevReviews) => {
      return prevReviews.filter((review) => review.key != key);
    });
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <ReviewForm addReview={addReview} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />

      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.container}>
              <Text
                onPress={() => navigation.navigate("ReviewDetails", item)}
                style={globalStyles.titleText}
              >
                {item.title}
              </Text>
              <MaterialIcons
                onPress={() => pressHandler(item.key)}
                name="delete"
                style={styles.check}
                size={18}
                color={"#333"}
              />
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  check: {},
});
