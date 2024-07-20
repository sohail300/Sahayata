import {
  ArrowRight,
  Users,
  AlertTriangle,
  Search,
  Clipboard,
  SquareGanttChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminHomepage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "SOLVED CASES",
      color: "bg-green-500",
      icon: <Clipboard className="w-8 h-8" />,
      count: 245,
      link: "/admin/solvedCases",
    },
    {
      title: "EMERGENCY CASES",
      color: "bg-red-500",
      icon: <AlertTriangle className="w-8 h-8" />,
      count: 18,
      link: "/admin/emergencyCases",
    },
    {
      title: "NORMAL CASES",
      color: "bg-amber-500",
      icon: <Users className="w-8 h-8" />,
      count: 189,
      link: "/admin/normalCases",
    },
    {
      title: "SEARCH AGENCIES",
      color: "bg-blue-500",
      icon: <Search className="w-8 h-8" />,
      count: 52,
      link: "/admin/agencies",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1`}
              onClick={() => navigate(card.link)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {card.icon}
                  <span className="text-3xl font-bold text-white">
                    {card.count}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <div className="flex items-center text-white">
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <li
                key={item}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center">
                  <div className=" rounded-full mr-4">
                    <SquareGanttChart />
                  </div>
                  <div>
                    <p className="font-medium">Activity {item}</p>
                    <p className="text-sm text-gray-500">
                      Description of activity {item}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
