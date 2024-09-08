import React from 'react';
import LabItemCard from '../components/itemS';

const computerLabItems = [
    {
        name: 'Desktop Computer',
        brand: 'Dell',
        quantity: 30,
        details: 'High-performance desktops with Intel Core i7 processors and 16GB RAM.'
    },
    {
        name: 'Monitor',
        brand: 'Samsung',
        quantity: 30,
        details: '24-inch Full HD LED monitors with anti-glare coating.'
    },
    {
        name: 'Keyboard',
        brand: 'Logitech',
        quantity: 30,
        details: 'Mechanical keyboards with backlight and customizable keys.'
    },
    {
        name: 'Mouse',
        brand: 'Logitech',
        quantity: 30,
        details: 'Wireless optical mouse with ergonomic design and high precision.'
    },
    {
        name: 'Printer',
        brand: 'HP',
        quantity: 3,
        details: 'LaserJet printer with wireless printing capability and duplex mode.'
    },
    {
        name: 'Router',
        brand: 'Cisco',
        quantity: 2,
        details: 'High-speed dual-band routers with advanced security features.'
    },
    {
        name: 'Projector',
        brand: 'Epson',
        quantity: 2,
        details: '1080p Full HD projectors with 3500 lumens brightness and HDMI support.'
    },
    {
        name: 'Server Rack',
        brand: 'HP',
        quantity: 1,
        details: '42U rack with network and power management system.'
    },
    {
        name: 'NAS (Network Attached Storage)',
        brand: 'Synology',
        quantity: 1,
        details: '4-bay NAS with 16TB storage for centralized file management.'
    },
    {
        name: 'Headphones',
        brand: 'Sony',
        quantity: 20,
        details: 'Over-ear noise-canceling headphones for audio projects and labs.'
    },
];


const LabItemsPage: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Lab Equipment</h1>
            <LabItemCard items={computerLabItems} />
        </div>
    );
};

export default LabItemsPage;
