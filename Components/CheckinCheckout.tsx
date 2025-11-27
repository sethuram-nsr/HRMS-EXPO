import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert,
    FlatList,
    Platform,
    PermissionsAndroid,
    Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optional: if you want GPS coords, install a geolocation lib and uncomment below.
// npm install @react-native-community/geolocation
// import Geolocation from "@react-native-community/geolocation";

const STORAGE_KEY = "@checkin_history_v1";

export default function CheckInOut({ showModal }: any) {
    const [status, setStatus] = useState("out"); // 'in' or 'out'
    const [lastRecord, setLastRecord] = useState<any>(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            console.log(raw,"raw");
            
            const parsed = raw ? JSON.parse(raw) : [];
            setHistory(parsed);
            if (parsed.length > 0) {
                const last = parsed[parsed.length - 1];
                setLastRecord(last);
                setStatus(last.type === "checkin" ? "in" : "out");
                console.log("Loaded history:", parsed);

            } else {
                setStatus("out");
            }
        } catch (err) {
            console.warn("Failed to load check-in history:", err);
        }
    };

    // Save a new record (and update UI)
    const saveRecord = async (record :any) => {
        try {
            const next:any = [...history, record];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            setHistory(next);
            setLastRecord(record);
            setStatus(record.type === "checkin" ? "in" : "out");
        } catch (err) {
            console.warn("Failed to save record:", err);
        }
    };

    // Optional: get coords (requires permissions & library). If you don't want location, leave commented.
    const requestLocationPermissionAndroid = async () => {
        if (Platform.OS !== "android") return true;
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location permission",
                    message: "App needs access to your location to record check-in coordinates.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const getLocation = async () => {
        // Uncomment & use if you installed geolocation library
        /*
        const ok = await requestLocationPermissionAndroid();
        if (!ok) return null;
    
        return new Promise((resolve) => {
        Geolocation.getCurrentPosition(
            (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
            (err) => {
            console.warn("Location error:", err);
            resolve(null);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );
        });
        */
        return null; // fallback if not using location
    };

    const nowISO = () => new Date().toISOString();
    const humanTime = (iso:any) => {
        try {
            const d = new Date(iso);
            return d.toLocaleString();
        } catch {
            return iso;
        }
    };

    const handleCheckIn = async () => {
        if (status === "in") {
            
            showModal("You are already checked in.");
             console.log("in");
            return;
        }

        const coords = await getLocation();
        const record = {
            id: `${Date.now()}`,
            type: "checkin",
            time: nowISO(),
            coords,
        };
        await saveRecord(record);

        showModal(`Checked in at ${humanTime(record.time)}`);
    };

    const handleCheckOut = async () => {
        
        if (status === "out") {
            console.log("out");
            
            showModal("You must check in before checking out.");
            return;
        }

        const coords = await getLocation();
        const record = {
            id: `${Date.now()}`,
            type: "checkout",
            time: nowISO(),
            coords,
        };
        await saveRecord(record);

        showModal(`Checked out at ${humanTime(record.time)}`);
    };


    const handleClearHistory = () => {
        Alert.alert("Clear history", "Do you want to clear all records?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Clear",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.removeItem(STORAGE_KEY);
                    setHistory([]);
                    setLastRecord(null);
                    setStatus("out");
                },
            },
        ]);
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.recordRow}>
            <Text style={styles.recordType}>{item.type === "checkin" ? "IN" : "OUT"}</Text>
            <View style={{ flex: 1 }}>
                <Text style={styles.recordTime}>{humanTime(item.time)}</Text>
                {item.coords ? (
                    <Text style={styles.recordCoords}>
                        {`lat: ${item.coords.latitude.toFixed(5)}, lon: ${item.coords.longitude.toFixed(5)}`}
                    </Text>
                ) : null}
            </View>
        </View>
    );

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Attendance</Text>
                <Text style={styles.status}>
                    Status: <Text style={status === "in" ? styles.inText : styles.outText}>{status.toUpperCase()}</Text>
                </Text>
                {lastRecord ? (
                    <Text style={styles.lastTime}>
                        Last: {lastRecord.type.toUpperCase()} — {humanTime(lastRecord.time)}
                    </Text>
                ) : (
                    <Text style={styles.lastTime}>No records yet</Text>
                )}
            </View>

            <View style={styles.buttons}>
                <Pressable style={[styles.button, status === "in" ? styles.disabled : null]} onPress={handleCheckIn}>
                    <Text style={styles.buttonText}>Check In</Text>
                </Pressable>

                <Pressable style={[styles.button, status === "out" ? styles.disabled : null]} onPress={handleCheckOut}>
                    <Text style={styles.buttonText}>Check Out</Text>
                </Pressable>
            </View>

            <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>History</Text>
                <Pressable onPress={handleClearHistory}>
                    <Text style={styles.clearText}>Clear</Text>
                </Pressable>
            </View>

            <FlatList
                style={styles.historyList}
                data={[...history].reverse()} // show latest first
                keyExtractor={(i:any) => i.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>No check-in / check-out records.</Text>}
            />

        </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 18, backgroundColor: "#fff" },
    header: { marginBottom: 12 },
    title: { fontSize: 22, fontWeight: "700" },
    status: { marginTop: 6, fontSize: 14 },
    inText: { color: "green", fontWeight: "700" },
    outText: { color: "tomato", fontWeight: "700" },
    lastTime: { marginTop: 4, color: "#555" },

    buttons: { flexDirection: "row", justifyContent: "space-between", marginVertical: 12 },
    button: {
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#0b84ff",
        alignItems: "center",
    },
    disabled: { opacity: 0.5, backgroundColor: "#0b84ff" },
    buttonText: { color: "#fff", fontWeight: "700" },

    historyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
    historyTitle: { fontSize: 18, fontWeight: "700" },
    clearText: { color: "red", fontWeight: "600" },

    historyList: { marginTop: 8 },
    recordRow: { flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
    recordType: { width: 48, fontWeight: "700", textAlign: "center" },
    recordTime: { fontSize: 14, color: "#222" },
    recordCoords: { fontSize: 12, color: "#777" },
    empty: { textAlign: "center", marginTop: 20, color: "#777" },
 

});
