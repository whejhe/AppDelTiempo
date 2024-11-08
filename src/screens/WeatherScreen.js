// src/screens/WeatherScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, FlatList, ScrollView } from 'react-native';
import { getWeatherByProvince } from '../api/apiClient';

const WeatherScreen = () => {
    const [province, setProvince] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const provinceCodes = {
        almeria: '04',
        cadiz: '11',
        cordoba: '14',
        granada: '18',
        huelva: '21',
        jaen: '23',
        malaga: '29',
        sevilla: '41'
    };

    const images = {
        despejado: require('../../assets/img/despejado.png'),
        muynubosoconlluviaescasa: require('../../assets/img/muynubosoconlluviaescasa.png'),
        lluviasfuertes: require('../../assets/img/lluvias-fuertes.png'),
        intervalosnubosos: require('../../assets/img/intervalosnubosos.png'),
        muynuboso: require('../../assets/img/muynuboso.png'),
        nube: require('../../assets/img/nube.png'),
        nuboso: require('../../assets/img/nuboso.png'),
        tormentaelectrica: require('../../assets/img/tormenta-electrica.png'),
        tormenta: require('../../assets/img/tormenta.png'),
        default: require('../../assets/img/default.png'),
    };
    

    const handleSearchWeather = async () => {
        const code = provinceCodes[province.toLowerCase()];
        if (!code) {
            Alert.alert('Error', 'Provincia no encontrada. Por favor ingresa una provincia válida de Andalucía.');
            return;
        }

        setLoading(true);
        try {
            const data = await getWeatherByProvince(code);

            // Elegimos la ciudad principal (primera en el array de "ciudades")
            const mainCity = data.ciudades && data.ciudades[0];
            if (!mainCity) {
                Alert.alert('Error', 'No se encontraron datos de ciudades para esta provincia.');
                setWeatherData(null);
                return;
            }

            setWeatherData({
                title: data.title,
                description: mainCity.stateSky.description,
                temperatureMax: mainCity.temperatures.max,
                temperatureMin: mainCity.temperatures.min,
                today: { p: data.today.p },
                tomorrow: { p: data.tomorrow.p },
            });
        } catch (error) {
            Alert.alert('Error', 'No se pudo obtener el clima. Verifica tu conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
                <TextInput
                    placeholder="Ingrese la provincia (ej. Almería)"
                    value={province}
                    onChangeText={setProvince}
                    style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
                />
                <Button title="Buscar Clima" onPress={handleSearchWeather} disabled={loading} />

                {weatherData && (
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.h1}>{weatherData.title}</Text>
                        <Image
                            source={images[weatherData.description.toLowerCase().replace(/\s+/g, '')] || images['default']}
                            style={styles.image}
                        />
                        <Text>Descripción del cielo: {weatherData.description}</Text>
                        <Text>Temperatura Máxima: {weatherData.temperatureMax}°C</Text>
                        <Text>Temperatura Mínima: {weatherData.temperatureMin}°C</Text>
                        <Text style={styles.h2}>Hoy:</Text>
                        <Text>{weatherData.today && weatherData.today.p}</Text>
                        <Text style={styles.h2}>Mañana:</Text>
                        <Text>{weatherData.tomorrow && weatherData.tomorrow.p}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    h2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    image: {
        resizeMode: 'contain',
        width: 150,
        height: 150,
        marginBottom: 5,
        flex: 1,
    },
};


export default WeatherScreen;
