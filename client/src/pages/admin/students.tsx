
import { Button } from '../../components/ui/button';
import { BarChart, Clock3, Cpu, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';

type ClassSection = {
  id: string;
  name: string;
  studentCount: number;
};

const classes: ClassSection[] = [
  { id: 'c1', name: 'II', studentCount: 20 },
  { id: 'c2', name: 'III', studentCount: 15 },
  { id: 'c3', name: 'IV', studentCount: 23 },
];

const StudentDashboard = () => {

  const activeStudentCount = 58;
  const totalSessionsToday = 124;
  const avgSessionDuration = '1h 15m';
  const labsInUse = 4;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>

      {/* Active Students */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle>Total Active Students</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center text-4xl font-semibold text-green-700 space-x-4">
          <Users className="w-10 h-10" />
          <span>{activeStudentCount}</span>
        </CardContent>
      </Card>

      {/* Infographic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Sessions Today</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center text-blue-600 text-3xl font-medium space-x-4">
            <BarChart className="w-8 h-8" />
            <span>{totalSessionsToday}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Session Duration</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center text-yellow-600 text-3xl font-medium space-x-4">
            <Clock3 className="w-8 h-8" />
            <span>{avgSessionDuration}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Labs Currently In Use</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center text-purple-600 text-3xl font-medium space-x-4">
            <Cpu className="w-8 h-8" />
            <span>{labsInUse}</span>
          </CardContent>
        </Card>
      </div>

      {/* Class Navigation */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Classes Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{cls.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-3 text-gray-600">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{cls.studentCount} Students</span>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant="outline"
                >
                  View Class
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
