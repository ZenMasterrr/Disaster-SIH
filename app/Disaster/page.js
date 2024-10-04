"use client";
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Weather from "../components/Weather";
import AlertList from "../components/AlertList";
import "leaflet/dist/leaflet.css";
import LeafletMap from "../components/LeafletMap";

const Map = dynamic(() => import("../components/LeafletMap"), { ssr: false });

export default function Disaster() {
    const [location, setLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India
    const [markers, setMarkers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("earthquake");
    const [forecastData, setForecastData] = useState({
        earthquake: { probability: 0.1, intensity: "Low", areas: ["Gujarat", "Maharashtra"] },
        heavyRain: { probability: 0.7, intensity: "High", areas: ["Kerala", "Karnataka"] },
        flood: { probability: 0.5, intensity: "Medium", areas: ["Assam", "Bihar"] },
        cyclone: { probability: 0.3, intensity: "Medium", areas: ["Odisha", "West Bengal"] },
        thunderstorm: { probability: 0.6, intensity: "High", areas: ["Uttar Pradesh", "Madhya Pradesh"] },
    });
    const [selectedOperation, setSelectedOperation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    setMapCenter([latitude, longitude]);
                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );
                        const cityName =
                            response.data.address.city ||
                            response.data.address.town ||
                            response.data.address.village ||
                            "Unknown Location";
                        setLocation((loc) => ({ ...loc, cityName }));
                    } catch (error) {
                        setLocation((loc) => ({ ...loc, cityName: "Unable to retrieve city name." }));
                    }
                },
                () => {
                    setLocation({ cityName: "Unable to retrieve location." });
                }
            );
        } else {
            setLocation({ cityName: "Geolocation not supported." });
        }
    }, []);

    const handleCurrentLocationClick = () => {
        if (location) {
            setMarkers([
                {
                    position: [location.latitude, location.longitude],
                    type: "current",
                    popupText: "Your Current Location",
                },
            ]);
        } else {
            console.error("Location not available");
        }
    };

    const handleFoodAndShelterClick = async () => {
        if (location) {
            const nearbyFoodShelter = [
                { latitude: location.latitude + 0.01, longitude: location.longitude + 0.01, name: "Shelter 1" },
                { latitude: location.latitude - 0.01, longitude: location.longitude - 0.01, name: "Shelter 2" },
            ];

            const shelterMarkers = nearbyFoodShelter.map((place) => ({
                position: [place.latitude, place.longitude],
                type: "food",
                popupText: place.name,
            }));

            setMarkers(shelterMarkers);
        } else {
            console.error("Location not available");
        }
    };

    const handleMedicalPlacesClick = async () => {
        if (location) {
            const nearbyMedicalPlaces = [
                { latitude: location.latitude + 0.02, longitude: location.longitude + 0.02, name: "Clinic 1" },
                { latitude: location.latitude - 0.02, longitude: location.longitude - 0.02, name: "Clinic 2" },
            ];

            const medicalPlaceMarkers = nearbyMedicalPlaces.map((place) => ({
                position: [place.latitude, place.longitude],
                type: "medical",
                popupText: place.name,
            }));

            setMarkers(medicalPlaceMarkers);
        } else {
            console.error("Location not available");
        }
    };

    const handleForecastClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderForecastContent = () => {
        const data = forecastData[activeTab];
        return (
            <div className="p-6 border rounded-lg bg-white shadow-lg">
                <h3 className="font-bold text-2xl mb-6 capitalize text-blue-600">{activeTab} Forecast</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-xl font-semibold mb-2 text-gray-800">Probability</p>
                        <p className="text-4xl font-bold text-red-500">{(data.probability * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-xl font-semibold mb-2 text-gray-800">Intensity</p>
                        <p className="text-4xl font-bold text-orange-500">{data.intensity}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-600">Affected Areas:</h4>
                    <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                        {data.areas.map((area, index) => (
                            <li key={index} className="text-lg text-gray-800">{area}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-600">Safety Tips:</h4>
                    <ul className="space-y-2">
                        {getSafetyTips(activeTab).map((tip, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-lg text-gray-800">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    const getSafetyTips = (disasterType) => {
        const tips = {
            earthquake: [
                "Drop, Cover, and Hold On",
                "Stay away from windows and heavy furniture",
                "If outdoors, move to an open area",
            ],
            heavyRain: [
                "Avoid driving through flooded areas",
                "Stay indoors and away from windows",
                "Keep emergency supplies ready",
            ],
            flood: [
                "Move to higher ground",
                "Don't walk or drive through flood waters",
                "Follow evacuation orders",
            ],
            cyclone: [
                "Secure loose items outside",
                "Stay indoors and away from windows",
                "Listen to local authorities for updates",
            ],
            thunderstorm: [
                "Seek shelter indoors",
                "Avoid using electrical equipment",
                "Stay away from windows and doors",
            ],
        };
        return tips[disasterType] || [];
    };

    const weatherData = {
        city: "Indore",
        temp: 24.4,
        description: "Light rain shower",
        lastUpdated: "30 Sep 2024 4:19 PM",
    };

    const alerts = [
        { type: "Flood", description: "Kamla Balan, Jhanjharpur", bgColor: "bg-orange-300", textColor: "text-white" },
        { type: "Thunderstorm Warning", description: "Varanasi, Uttar Pradesh", bgColor: "bg-blue-200", textColor: "text-black" },
    ];

    const rescueOperations = [
        {
            id: 1,
            initialLocation: "Assam, Guwahati",
            latestLocation: "Chirang, Assam",
            initialStatus: "Ongoing",
            latestStatus: "Progressing",
            bgColor: "bg-green-300",
            textColor: "text-black",
            latestNews: "Rescue teams deployed to Chirang as floodwaters rise. 1200 people evacuated. Relief camps established.",
            timestamp: "2024-09-29T10:30:00Z"
        },
        {
            id: 2,
            initialLocation: "Kamla Balan, Jhanjharpur",
            latestLocation: "Kamla Balan, Jhanjharpur",
            initialStatus: "Completed",
            latestStatus: "Relief Phase",
            bgColor: "bg-green-200",
            textColor: "text-black",
            latestNews: "Residents moved to safer zones. Health camps have been set up to prevent water-borne diseases.",
            timestamp: "2024-09-29T12:45:00Z"
        },
    ];

    const openRescueNews = (operation) => {
        setSelectedOperation(operation);
    };

    const closeRescueNews = () => {
        setSelectedOperation(null);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <header className="bg-black text-white z-10">
                <div className="container mx-auto flex items-center justify-between p-0.1">

                </div>
                <div className="bg-gray-600 text-white text-center py-2 mt-4 w-full">
                    <p className="font-bold">
                        Your Current Location: {location?.cityName || "Fetching..."}
                    </p>
                </div>
                <div className="bg-white p-4 shadow-md">
                    <div className="flex justify-around items-center">
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded"
                            onClick={handleCurrentLocationClick}
                        >
                            Current Location CAP Alert
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={handleFoodAndShelterClick}
                        >
                            Food and Shelter
                        </button>
                        <button
                            className="bg-yellow-500 text-white py-2 px-4 rounded"
                            onClick={handleMedicalPlacesClick}
                        >
                            Medical Places
                        </button>
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded"
                            onClick={handleForecastClick}
                        >
                            Forecast
                        </button>
                    </div>
                </div>
            </header>

            {/* Only one Map instance here */}
            {mapCenter && (
                <LeafletMap 
                    center={mapCenter} 
                    markers={markers}
                />
            )}

            {/* Modal for Forecast */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl overflow-hidden relative z-[1001]">
                        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 4rem)' }}>
                            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Disaster Forecast</h2>
                            <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-6">
                                {Object.keys(forecastData).map((disaster) => (
                                    <button
                                        key={disaster}
                                        className={`py-2 px-4 rounded-full capitalize text-lg font-semibold transition-colors duration-200 ${
                                            activeTab === disaster 
                                                ? "bg-blue-500 text-white" 
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                        onClick={() => setActiveTab(disaster)}
                                    >
                                        {disaster}
                                    </button>
                                ))}
                            </div>
                            {renderForecastContent()}
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col h-screen">
                <div className="flex flex-col lg:flex-row justify-between mt-4 px-8">
                    {/* Weather section */}
                    <div
                        className="flex flex-col lg:w-1/4 bg-blue-100 p-6 rounded-lg shadow-md mb-4 lg:mb-0 text-gray-900">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search city..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                            />
                        </div>
                        <Weather weatherData={weatherData}/>
                    </div>

                    {/* Alerts section */}
                    <div
                        className="flex flex-col lg:w-1/3 bg-orange-200 p-6 rounded-lg shadow-md mb-4 lg:mb-0 text-gray-800">
                        <AlertList alerts={alerts}/>
                    </div>

                    {/* Rescue Operations section */}
                    <div className="flex flex-col lg:w-1/2 bg-green-200 p-6 rounded-lg shadow-md text-gray-900">
                        <h2 className="text-lg font-bold mb-4">Latest Rescue Operations</h2>
                        <div className="overflow-x-auto">
                            <div className="flex space-x-4">
                                {rescueOperations.map((operation) => (
                                    <button
                                        key={operation.id}
                                        className={`flex-none w-80 p-4 rounded-lg ${operation.bgColor} ${operation.textColor} hover:opacity-80 transition-opacity duration-200`}
                                        onClick={() => openRescueNews(operation)}
                                    >
                                        <h3 className="text-md font-semibold">Location: {operation.initialLocation}</h3>
                                        <p>Initial Status: {operation.initialStatus}</p>
                                        <p className="mt-2 text-sm italic">Click for latest updates</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rescue News Modal */}
            {selectedOperation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative z-[1001]">
                        <h3 className="text-xl font-bold mb-4">{selectedOperation.initialLocation}</h3>
                        <div className="mb-4">
                            <p className="font-semibold">Latest Location: <span className="font-normal">{selectedOperation.latestLocation}</span></p>
                            <p className="font-semibold">Latest Status: <span className="font-normal">{selectedOperation.latestStatus}</span></p>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Latest News:</h4>
                            <p className="text-gray-700">{selectedOperation.latestNews}</p>
                        </div>
                        <p className="text-sm text-gray-500 italic">Last updated: {new Date(selectedOperation.timestamp).toLocaleString()}</p>
                        <button
                            onClick={closeRescueNews}
                            className="absolute top-2 right-2 bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-colors duration-200 text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}