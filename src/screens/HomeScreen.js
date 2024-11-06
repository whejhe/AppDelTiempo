// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet, TextInput } from 'react-native';
import apiClient, { baseURL } from '../api/apiClient';

export default function HomeScreen({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await apiClient.get(`${baseURL}${busqueda}`);
                setCharacters(response.data.results);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchCharacters();
    }, [busqueda]);

    const handleBusquedaChange = (text) => {
        setBusqueda(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.busquedaInput}
                placeholder="Buscar"
                value={busqueda}
                onChangeText={handleBusquedaChange}
            />
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    busquedaInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
});