import { FaDotCircle as Dot, FaCalendar as Calender, FaCalendarAlt as UpdatedCalender } from "react-icons/fa";
import { FaLocationDot as Location } from "react-icons/fa6";

interface Complaint {
    id: string;
    studentName: string;
    rollNo: string;
    complaintDetail: string;
    postedDate: string;
    updatedDate: String;
    status: 'Resolved' | 'Pending' | 'In Progress';
    lab: string
}

const ComplaintCard: React.FC<Complaint> = ({ studentName, complaintDetail, postedDate, updatedDate, status, lab, rollNo }) => {
    const getColor = (val: String) => {
        if (val === "Resolved") {
            return "text-green-400";
        } else if (val === "Pending") {
            return "text-red-400";
        } else {
            return "text-yellow-400";
        }
    }
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4 w-2/5">
            <h2 className="text-lg font-bold text-gray-900">Raised By: {studentName} ({rollNo})</h2>
            <p className="text-gray-600 mt-2">{complaintDetail}</p>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                <div className="flex gap-1 items-center justify-center">
                    <Calender className="text-base" />
                    <p>Posted On: {new Date(postedDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <Dot className={`text-base ${getColor(status)}`} />
                    <p>Status: <span className={getColor(status)}>{status}</span></p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <Location className="text-base" />
                    <p>Lab: {lab}</p></div>
                <div className="flex gap-1 items-center justify-center">
                    <UpdatedCalender className="text-base" />
                    <p> Updated On: {new Date(updatedDate).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ComplaintCard
