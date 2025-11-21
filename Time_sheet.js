import * as Location from "expo-location";
import img from "/home/sag-sethu/Pictures/HRMS-DEMO/assets/images/lyveHR.jpeg";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Time_sheet({ navigation }) {
  const [location, setLocation] = useState(null);
  const [LoaderLogout, SetLoaderLogout] = useState(true);
  const [LoaderCheckin, SetLoaderCheckin] = useState(true);
  const [LoaderCheckout, SetLoaderCheckout] = useState(true);

  const [empId, setEmpId] = useState(null);
  const [token, setToken] = useState(null);

  // -------------------------------------------------------------------
  // GET TOKEN + EMPID FROM STORAGE SAFELY
  // -------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("EmpID");
      const tk = await AsyncStorage.getItem("response-token");

      setEmpId(id);
      setToken(tk);
    })();
  }, []);

  // -------------------------------------------------------------------
  // GET LOCATION PERMISSION
  // -------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show("Location Permission Denied!", {
          duration: Toast.durations.SHORT,
        });
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  // -------------------------------------------------------------------
  // LOGOUT
  // -------------------------------------------------------------------
  const handleLogout = async () => {
    if (!token) {
      Toast.show("Token missing!", { duration: Toast.durations.SHORT });
      return;
    }

    SetLoaderLogout(false);

    try {
      const response = await fetch(
        "https://sit.hrms.alphadot.co.in/apigateway/api/user/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deviceInfo: {
              deviceId: "D1",
              deviceType: "DEVICE_TYPE_ANDROID",
              notificationToken: null,
            },
          }),
        }
      );

      if (response.status === 200) {
        Toast.show("Logged Out Successfully!", {
          duration: Toast.durations.SHORT,
        });
      } else {
        Toast.show("You Have Already Logged Out!", {
          duration: Toast.durations.SHORT,
        });
      }

      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (err) {
      Toast.show("Server Error! Cannot logout!", {
        duration: Toast.durations.SHORT,
      });
    }

    SetLoaderLogout(true);
  };

  // -------------------------------------------------------------------
  // CHECK-IN
  // -------------------------------------------------------------------
  const CheckInHandler = async () => {
    if (!location) {
      Toast.show("Location not ready! Turn ON GPS!", {
        duration: Toast.durations.SHORT,
      });
      return;
    }

    if (!empId || !token) {
      Toast.show("User not logged in!", { duration: Toast.durations.SHORT });
      return;
    }

    SetLoaderCheckin(false);

    const { latitude, longitude } = location.coords;

    try {
      const response = await fetch(
        `https://sit.hrms.alphadot.co.in/apigateway/payroll/timeSheet/checkIn/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();
      Toast.show(text, { duration: Toast.durations.SHORT });
    } catch (error) {
      Toast.show("Check-In Failed!", { duration: Toast.durations.SHORT });
    }

    SetLoaderCheckin(true);
  };

  // -------------------------------------------------------------------
  // CHECK-OUT
  // -------------------------------------------------------------------
  const CheckOutHandler = async () => {
    if (!location) {
      Toast.show("Location not ready! Turn ON GPS!", {
        duration: Toast.durations.SHORT,
      });
      return;
    }

    if (!empId || !token) {
      Toast.show("User not logged in!", { duration: Toast.durations.SHORT });
      return;
    }

    SetLoaderCheckout(false);

    const { latitude, longitude } = location.coords;

    try {
      const response = await fetch(
        `https://sit.hrms.alphadot.co.in/apigateway/payroll/timeSheet/checkOut/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();
      Toast.show(text, { duration: Toast.durations.SHORT });
    } catch (error) {
      Toast.show("Check-Out Failed!", { duration: Toast.durations.SHORT });
    }

    SetLoaderCheckout(true);
  };

  // -------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
          </Pressable>

          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
            <Text style={styles.maintext}>Timesheet</Text>

            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.logout}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {LoaderLogout ? "Log Out" : <ActivityIndicator color="#fff" />}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Body */}
        <View style={{ height: "80%", justifyContent: "center" }}>
          <View style={styles.box}>
            <StatusBar style="auto" />

            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Image source={img} style={styles.img} />
            </View>

            {/* Buttons */}
            <View style={{ marginVertical: 22 }}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.subBtn}
                  onPress={() => navigation.navigate("EmployeeDetails")}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>Attendance</Text>
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.subBtn} onPress={CheckInHandler}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {LoaderCheckin ? "Check In" : <ActivityIndicator color="#fff" />}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.subBtn} onPress={CheckOutHandler}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {LoaderCheckout ? "Check Out" : <ActivityIndicator color="#fff" />}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </RootSiblingParent>
  );
}

// -------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    height: 65,
    marginVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
    alignItems: "center",
  },
  logout: {
    width: 85,
    backgroundColor: "brown",
    paddingVertical: 4,
    borderRadius: 8,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  img: {
    width: 240,
    height: 55,
  },
  box: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
  },
  subBtn: {
    width: "75%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "brown",
    marginVertical: 6,
  },
  maintext: {
    fontWeight: "400",
    fontSize: 20,
    top: 2,
  },
});
