import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../components/modal";
import { useUser } from "../context/userProvider";

// Set up moment.js localizer for the calendar
const localizer = momentLocalizer(moment);

const LabReservationCalendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const events = [
        {
            id: 1,
            title: "Lab Reserved",
            start: new Date(2024, 7, 5, 10, 0, 0),
            end: new Date(2024, 7, 5, 12, 0, 0),
            studentName: "John Doe",
            lab: "Lab A",
        }
    ];
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    // Example of handling a date click
    const handleDateClick = (slotInfo: any) => {
        setSelectedDate(slotInfo.start);
        setShowModal(true);
    };

    // Handle clicking on an event (booking)
    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const today = new Date();
    const MaxDate = new Date(today);
    MaxDate.setMonth(today.getMonth() + 1);

    const { user } = useUser();

    return (
        <div className="h-screen p-4 flex flex-col items-center justify-evenly">
            <h1 className="text-3xl font-medium">Reservation Dashboard { user?.name}</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                className="w-2/3 h-4/5"
                selectable
                onSelectSlot={handleDateClick}
                onSelectEvent={handleEventClick}
                min={today}
                max={MaxDate}
            />
            {showModal && (
                <Modal isOpen={showModal} onClose={() => { setShowModal(false); setSelectedEvent(null) }} title="Reservation details" className="">
                    <div className="flex flex-col items-center p-6 rounded-lg">
                        {selectedEvent ? (
                            <>
                                <p><strong>Lab:</strong> {selectedEvent.lab}</p>
                                <p><strong>Booked By:</strong> {selectedEvent.studentName}</p>
                                <p><strong>Status:</strong> {selectedEvent.status}</p>
                                <p><strong>Date:</strong> {moment(selectedEvent.start).format("YYYY-MM-DD")}</p>
                                <p><strong>Time:</strong> {moment(selectedEvent.start).format("HH:mm A")} - {moment(selectedEvent.end).format("HH:mm A")}</p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold">Reserve Lab</h2>
                                <p><strong>Date:</strong> {moment(selectedDate).format("YYYY-MM-DD")}</p>
                                {/* Add your form fields for reservation here */}
                            </>
                        )}
                        <button
                            onClick={() => { setShowModal(false); setSelectedEvent(null) }}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default LabReservationCalendar;
