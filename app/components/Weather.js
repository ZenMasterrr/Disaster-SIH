export default function Weather({ weatherData }) {
    return (
        <div className="bg-blue-100 p-4 rounded shadow-lg">
            <h3 className="text-2xl font-bold">{weatherData.city}</h3>
            <p className="text-xl">{weatherData.temp}°C</p>
            <p>{weatherData.description}</p>
            <p>Updated: {weatherData.lastUpdated}</p>
        </div>
    );
}