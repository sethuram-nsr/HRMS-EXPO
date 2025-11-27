import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import img from "../../assets/images/Fazil.png";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={img} style={styles.avatar} />

        <Text style={styles.name}>Fazil</Text>
        <Text style={styles.email}>Fazil@gmail.com</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Icon name="account-edit" size={20} color="#fff" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>10</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>180</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* DETAILS */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>About Me</Text>
        <Text style={styles.infoText}>
          Passionate developer 👨‍💻 | Tech Lover ⚡  
          Always learning new things!
        </Text>
      </View>

      {/* SETTINGS */}
      <View style={styles.settingsCard}>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="shield-lock-outline" size={22} color="#555" />
          <Text style={styles.settingText}>Privacy Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="bell-outline" size={22} color="#555" />
          <Text style={styles.settingText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="palette-outline" size={22} color="#555" />
          <Text style={styles.settingText}>Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { borderBottomWidth: 0 }]}>
          <Icon name="logout" size={22} color="#ef4444" />
          <Text style={[styles.settingText, { color: "#ef4444" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1f2937",
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
  },
  editBtn: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  statLabel: {
    color: "#6b7280",
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1f2937",
  },
  infoText: {
    fontSize: 14,
    color: "#4b5563",
  },
  settingsCard: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  settingText: {
    fontSize: 15,
    marginLeft: 12,
    color: "#374151",
    fontWeight: "500",
  },
});
