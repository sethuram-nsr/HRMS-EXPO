import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// @ts-ignore
import EmojiSelector from "react-native-emoji-selector";


export default function Chat() {
    const [chat, setChat] = useState("");
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const [messages, setMessages] = useState([
        { id: "1", text: "Hello! 👋", sent: false },
        { id: "2", text: "Hi, how are you?", sent: true },
    ]);

    const sendMessage = () => {
        if (!chat.trim()) return;

        setMessages([
            ...messages,
            { id: String(messages.length + 1), text: chat, sent: true },
        ]);
        setChat("");
    };

    const renderMsg = ({ item }: any) => (
        <View
            style={[
                styles.messageBubble,
                item.sent ? styles.sentBubble : styles.receivedBubble,
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chat</Text>

            <View style={styles.chatBody}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMsg}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* Emoji Picker Modal */}
            <Modal visible={emojiPickerVisible} animationType="slide">
                <EmojiSelector
                    onEmojiSelected={(emoji) => setChat(chat + emoji)}
                    showSearchBar={false}
                    theme="light"
                />
            </Modal>

            {/* Input Bar */}
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => setEmojiPickerVisible(true)}>
                    <Icon name="emoticon-happy-outline" size={26} color="#555" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={chat}
                    onChangeText={setChat}
                    placeholder="Message"
                />

                <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                    <Icon name="send" size={22} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#8db7e4ff" },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        padding: 20,
        paddingTop: 45,
    },
    chatBody: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 15,
    },
    messageBubble: {
        maxWidth: "75%",
        padding: 12,
        borderRadius: 18,
        marginVertical: 5,
    },
    sentBubble: {
        backgroundColor: "#007bff",
        marginLeft: "auto",
    },
    receivedBubble: {
        backgroundColor: "#e5e7eb",
        marginRight: "auto",
    },
    messageText: { fontSize: 15, color: "#000" },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        padding: 12,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    sendBtn: {
        backgroundColor: "#007bff",
        height: 45,
        width: 45,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});
