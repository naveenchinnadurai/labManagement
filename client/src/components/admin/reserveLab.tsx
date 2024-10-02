import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown } from "react-icons/fa"; // For dropdown icon
import { dateToString } from "../../utils/lib";
import { useUser } from "../../context/userProvider";
import apiClient from "../../utils/api";
import Model from '../../components/modal'

interface ReservationData {
    date: String;
    periods: string[];
    labNumber: string;
    description: string;
}
interface Props{
    close: () => void ;
}
const periods = ["Forenoon", "Afternoon"];

const ReserveLab: React.FC < Props > = ({ close }) => {
    const { user } = useUser();
    const [date, setDate] = useState<Date>(new Date())
    const [formData, setFormData] = useState<ReservationData>({
        date: "",
        periods: [],
        labNumber: "",
        description: ""
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePeriodChange = (selectedPeriod: string) => {
        const newPeriods = formData.periods.includes(selectedPeriod)
            ? formData.periods.filter((period) => period !== selectedPeriod)
            : [...formData.periods, selectedPeriod];

        setFormData({ ...formData, periods: newPeriods });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const reservationData = {
            reservedBy: user?.id,
            reserverName: user?.name,
            reservedDate: date,
            session: formData.periods,
            reservedOn: new Date(),
            message: formData.description,
            lab: formData.labNumber
        }
        const res = await apiClient.post("/reservation/", reservationData)
        console.log(res)
        if (res.status === 201) {
            setFormData({
                date: "",
                periods: [],
                labNumber: "",
                description: ""
            })
            close();
        }
    };

    const excludedDates = [new Date("2024-09-07"), new Date("2024-09-10")]; // dates that are to be excluded

    const isDateExcluded = (date: Date) => {
        return excludedDates.some(
            (excludedDate) => date.toDateString() === excludedDate.toDateString()
        );
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded w-full max-w-md flex-col justify-center items-center" >
            <div className="mb-4">
                <label htmlFor="labNumber" className="block text-sm font-medium text-gray-700" >
                    Lab Number
                </label>
                <input
                    type="text"
                    id="labNumber"
                    name="labNumber"
                    placeholder="Lab Number"
                    value={formData.labNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
             focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700" >
                    Date
                </label>
                <DatePicker
                    selected={date}
                    onChange={(date: Date | null) => setDate(date || new Date())}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    filterDate={(date) => !isDateExcluded(date)}
                    required
                    className="h-10 mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
             focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4 relative">
                <label htmlFor="periods" className="block text-sm font-medium text-gray-700" >
                    Periods
                </label>
                <div className="flex items-center gap-2">
                    <div
                        className="mt-1 block w-fit px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
             focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        Select Session
                        <FaChevronDown className="inline-block ml-2" />
                    </div>
                    {
                        formData.periods.length > 0
                            ? formData.periods.map((e, i) => (
                                <span className="p-1 px-3 mr-1 text-sm bg-slate-400 rounded-3xl">{e}</span>
                            ))
                            : null
                    }
                </div>
                {
                    isDropdownOpen && (
                        <div className="absolute pe-7 mt-2 w-fit bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {
                                periods.map((period) => (
                                    <div
                                        key={period}
                                        className="flex items-center px-3 py-2 hover:bg-gray-100"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.periods.includes(period)}
                                            onChange={() => handlePeriodChange(period)}
                                            className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <label
                                            htmlFor={period}
                                            className="ml-3 text-sm text-gray-700"
                                        >
                                            {period}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700" >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Purpose of reservation"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
          bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Reserve Lab
            </button>
        </form>
    );
};

export default ReserveLab;
