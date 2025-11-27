import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Fazil from "../../assets/Fazil.png";
import Sethu from "../../assets/sethu.png";
import Mugil from "../../assets/mugil.png";
import Vikram from "../../assets/vikram.png";

export default function Wall() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      user: "Fazil",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      time: "2 hrs ago",
      content: "N weeks and 7 days is still not enough time. #worklife",
      image: Fazil, 
      likes: 12,
      comments: 3,
    },
    {
      id: "2",
      user: "sethu",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      time: "5 hrs ago",
      content: "!",
      image:
        Sethu,
      likes: 30,
      comments: 10,
    },
    {
      id: "3",
      user: "Mugil",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      time: "1 day ago",
      content: "Work hard, stay humble 💪",
      image: Mugil,
      likes: 5,
      comments: 1,
    },
     {
      id: "4",
      user: "Vikram",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      time: "1 day ago",
      content: " stay humble 💪",
      image:Vikram ,
      likes: 5,
      comments: 1,
    },
  ]);

  const renderPost = ({ item }:any) => (
    <View style={styles.card}>

      <View style={styles.header}>
        <Image  source={
            typeof item.image === "string"
              ? { uri: item.image }
              : item.image
          } style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{item.content}</Text>

      {/* Image (Local + Remote Support) */}
      {item.image && (
        <Image
          style={styles.postImage}
          source={
            typeof item.image === "string"
              ? { uri: item.image }
              : item.image
          }
        />
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="thumb-up-outline" size={22} color="#555" />
          <Text style={styles.actionText}>{item.likes} Likes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="comment-outline" size={22} color="#555" />
          <Text style={styles.actionText}>{item.comments} Comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Post Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 6,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    color: "#555",
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
