// src/screens/WeatherScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
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
            });
        } catch (error) {
            Alert.alert('Error', 'No se pudo obtener el clima. Verifica tu conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Ingrese la provincia (ej. Almería)"
                value={province}
                onChangeText={setProvince}
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />
            <Button title="Buscar Clima" onPress={handleSearchWeather} disabled={loading} />

            {weatherData && (
                <View style={{ marginTop: 20 }}>
                    <Text>Provincia: {weatherData.title}</Text>
                    <Text>Descripción del cielo: {weatherData.description}</Text>
                    <Text>Temperatura Máxima: {weatherData.temperatureMax}°C</Text>
                    <Text>Temperatura Mínima: {weatherData.temperatureMin}°C</Text>
                    {/* 
                    Descomenta esta línea si ya tienes los iconos listos en 'assets/img/' 
                    <Image
                        source={require(`../../assets/img/${weatherData.description}.png`)}
                        style={{ width: 100, height: 100 }}
                    />
                    */}
                </View>
            )}
        </View>
    );
};

export default WeatherScreen;
