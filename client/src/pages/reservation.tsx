import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ReservationData {
  date: Date | null;
  period: string;
  LabNumber: string;
}

const periods = ["Period 1", "Period 2", "Period 3", "Period 4", "Period 5"];

const ReserveLab: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    date: null,
    period: "",
    LabNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    /* if (formData.date && formData.period && formData.labName) {
      try {
        await axios.post("http://localhost:5000/api/reservations", formData);
        alert("Reservation successful!");
      } catch (error) {
        console.error("There was an error making the reservation:", error);
        alert("Failed to make reservation.");
      }
    } else {
      alert("Please fill out all fields.");
    } */
  };
  const excludedDates = [new Date('2024-09-07'), new Date('2024-09-10')];

  const isDateExcluded = (date: Date) => {
    return excludedDates.some(excludedDate => 
      date.toDateString() === excludedDate.toDateString()
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md" >
        <h2 className="text-2xl font-bold mb-6 text-center">Reserve Lab</h2>
        <div className="mb-4">
          <label htmlFor="labName" className="block text-sm font-medium text-gray-700">Lab Name</label>
          <input
            type="text"
            id="labName"
            name="labName"
            value={formData.LabNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700"> Date </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            filterDate={date => !isDateExcluded(date)}
            required
            className=" h-10 mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="period" className="block text-sm font-medium text-gray-700"> Period </label>
          <select
            id="period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a period</option>
            {periods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reserve Lab
        </button>
      </form>
    </div>
  );
};

export default ReserveLab;
