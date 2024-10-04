export default function AlertList({ alerts }) {
    return (
        <div className="bg-gray-200 p-4 w-[300px] shadow-lg">
            <h4 className="font-bold text-lg mb-2">ALERT LIST</h4>
            {alerts.map((alert, index) => (
                <div key={index} className={`p-2 mb-2 ${alert.bgColor}`}>
                    <h5 className="font-bold">{alert.type}</h5>
                    <p>{alert.description}</p>
                </div>
            ))}
        </div>
    );
}
