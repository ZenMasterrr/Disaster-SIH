"use client";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Base Modal Component to handle shared modal logic
const BaseModal = ({ isOpen, onClose, title, children, ariaLabel }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={ariaLabel}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative z-50">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                {children}
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};


const ContactModal = ({ isOpen, onClose }) => (
    <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Emergency Contacts"
        ariaLabel="Emergency Contact Information"
    >
        <div className="space-y-6">
            <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Emergency Services</h3>
                <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">National Disaster Helpline:</span>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full">1800-123-4567</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Fire Department:</span>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full">101</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Police:</span>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full">100</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Ambulance:</span>
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full">102</span>
                    </li>
                </ul>
            </section>
            
            <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Customer Support</h3>
                <p className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Customer Care:</span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full">1800-987-6543</span>
                </p>
            </section>

            <section className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold mb-2 text-green-800">Important NGOs</h3>
                <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Red Cross:</span>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full">1800-123-7777</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Save the Children:</span>
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full">1800-888-9999</span>
                    </li>
                </ul>
            </section>
        </div>
    </BaseModal>
);

const DonateModal = ({ isOpen, onClose }) => (
    <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Donate to Help"
        ariaLabel="Donate Modal"
    >
        <p className="mb-4 text-gray-700">
            Your donations will help provide emergency assistance and aid to those in need.
        </p>
        <form>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select NGO</label>
                <select className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700">
                    <option value="">Choose an NGO</option>
                    <option value="red-cross">Red Cross</option>
                    <option value="save-the-children">Save the Children</option>
                    <option value="unicef">UNICEF</option>
                    <option value="doctors-without-borders">Doctors Without Borders</option>
                    <option value="oxfam">Oxfam</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Amount (INR)</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">₹</span>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-2 border rounded-lg text-gray-700"
                        min="0"
                        step="1"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                <select className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700">
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>UPI</option>
                    <option>Net Banking</option>
                </select>
            </div>
            <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full transition duration-300"
                onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}
            >
                Donate
            </button>
        </form>
    </BaseModal>
);

const EmergencyRequestModal = ({ isOpen, onClose }) => (
    <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Emergency Request"
        ariaLabel="Emergency Request Modal"
    >
        <p className="mb-4 text-gray-700">
            If you or someone you know is in immediate danger or needs urgent help, please contact emergency services.
        </p>
        <form>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                    placeholder="Describe the emergency"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700"
                    rows="4"
                />
            </div>
            <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full transition duration-300"
                onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}
            >
                Send Request
            </button>
        </form>
    </BaseModal>
);

const ModalsComponent = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isDonateOpen, setIsDonateOpen] = useState(false);
    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

    useEffect(() => {
        const nextElement = document.getElementById('__next');
        if (nextElement) {
            Modal.setAppElement(nextElement);
        }
    }, []);

    return (
        <div className="p-6 flex justify-center">
            <div className="space-x-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => setIsContactOpen(true)}
                >
                    Contact Us
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    onClick={() => setIsDonateOpen(true)}
                >
                    Donate
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => setIsEmergencyOpen(true)}
                >
                    Emergency Request
                </button>
            </div>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
            <EmergencyRequestModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
        </div>
    );
};

export default ModalsComponent;



