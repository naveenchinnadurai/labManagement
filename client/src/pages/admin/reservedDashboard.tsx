import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../../components/modal";
import { useUser } from "../../context/userProvider";
import apiClient from "../../utils/api";
import ReserveLab from "../../components/admin/reserveLab";

// Set up moment.js localizer for the calendar
const localizer = momentLocalizer(moment);

interface ReservationEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    reserverName: string;
    lab: string;
    session: string[];
}

const LabReservationCalendar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [events, setEvents] = useState<ReservationEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ReservationEvent | null>(null);

    const { user } = useUser();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await apiClient.get("/reservation"); // Adjust your API route here
                console.log(response)

                const reservations = response.data.data.map((reservation: any) => ({
                    id: reservation.id,
                    title: `Reserved by ${reservation.reserverName}`,
                    start: new Date(reservation.reservedDate),
                    end: new Date(reservation.reservedDate),
                    reserverName: reservation.reserverName,
                    lab: reservation.lab,
                    session: reservation.session,
                }));
                setEvents(reservations);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, []);

    // Handle date click to show reservation modal
    const handleDateClick = (slotInfo: any) => {
        setSelectedDate(slotInfo.start);
        setShowModal(true);
    };

    // Handle event click to show reservation details
    const handleEventClick = (event: ReservationEvent) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const today = new Date();
    const MaxDate = new Date(today);
    MaxDate.setMonth(today.getMonth() + 1);

    return (
        <div className="h-screen p-4 flex flex-col items-center justify-evenly">
            <div className="flex justify-between gap-3">
                <h1 className="text-3xl font-medium">Reservation Dashboard {user?.name}</h1>
                <button className="p-1 px-4 bg-blue-500 rounded-lg text-white flex gap-1 items-center justify-center" onClick={() => setIsModalOpen(true)}>
                    Reserve Lab
                </button>
            </div>
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
            {
                showModal && (
                    <Modal
                        isOpen={showModal}
                        onClose={() => { setShowModal(false); setSelectedEvent(null); }}
                        title={selectedEvent ? "Reservation Details" : "Reserve Lab"}
                        className=""
                    >
                        <div className="flex flex-col items-center p-6 rounded-lg">
                            {selectedEvent ? (
                                <>
                                    <p><strong>Lab:</strong> {selectedEvent.lab}</p>
                                    <p><strong>Booked By:</strong> {selectedEvent.reserverName}</p>
                                    <p><strong>Date:</strong> {moment(selectedEvent.start).format("YYYY-MM-DD")}</p>
                                    <p><strong>Sessions:</strong> {selectedEvent.session.join(", ")}</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold">Reserve Lab</h2>
                                    <p><strong>Date:</strong> {moment(selectedDate).format("YYYY-MM-DD")}</p>
                                    {/* Add your form fields for reservation here */}
                                </>
                            )}
                            <button
                                onClick={() => { setShowModal(false); setSelectedEvent(null); }}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </Modal>
                )
            }
            {
                isModalOpen ? (
                    <Modal isOpen={isModalOpen} title="Reserve Your Lab" onClose={() => setIsModalOpen(false)} className="">
                        <ReserveLab close={() => setIsModalOpen(false)} />
                    </Modal>
                ) : null
            }
        </div>
    );
};

export default LabReservationCalendar;
