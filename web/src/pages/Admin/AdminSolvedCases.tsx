import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  XCircle,
} from "lucide-react";

const SolvedCase = ({
  caseId,
  title,
  filerName,
  filerNumber,
  latitude,
  longitude,
  filingDate,
  solvingDate,
  onMarkUnsolved,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-semibold text-lg text-emerald-600">
            Case #{caseId}: {title}
          </h3>
          <p className="text-sm text-gray-500">
            Filed on: {filingDate} | Solved on: {solvingDate}
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-emerald-500" />
        ) : (
          <ChevronDown className="text-emerald-500" />
        )}
      </div>
      {isExpanded && (
        <div className="px-4 pb-4">
          <p>
            <strong>Filed by:</strong> {filerName}
          </p>
          <p>
            <strong>Contact Number:</strong> {filerNumber}
          </p>
          <p>
            <strong>Location:</strong> Lat: {latitude}, Long: {longitude}
          </p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onMarkUnsolved(caseId)}
              className=" bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center"
            >
              <AlertCircle className="mr-2" /> Mark as Unsolved
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SolvedCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cases, setCases] = useState([
    {
      caseId: "001",
      title: "Missing Person Found",
      filerName: "Jane Smith",
      filerNumber: "+1234567890",
      latitude: "40.7128",
      longitude: "-74.0060",
      filingDate: "2024-07-10",
      solvingDate: "2024-07-15",
    },
    {
      caseId: "002",
      title: "Stolen Vehicle Recovered",
      filerName: "John Doe",
      filerNumber: "+1987654321",
      latitude: "34.0522",
      longitude: "-118.2437",
      filingDate: "2024-07-12",
      solvingDate: "2024-07-14",
    },
    // Add more cases as needed
  ]);

  const filteredCases = cases.filter(
    (case_) =>
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.caseId.includes(searchTerm) ||
      case_.filerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkUnsolved = (caseId) => {
    setCases(cases.filter((case_) => case_.caseId !== caseId));
    // In a real application, you would also send this update to your backend
    alert(
      `Case #${caseId} has been marked as unsolved and removed from the solved cases list.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-emerald-800 mb-8">
          Solved Cases
        </h1>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search cases by ID, title, or filer name..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" />
        </div>

        {filteredCases.length > 0 ? (
          filteredCases.map((case_) => (
            <SolvedCase
              key={case_.caseId}
              caseId={case_.caseId}
              title={case_.title}
              filerName={case_.filerName}
              filerNumber={case_.filerNumber}
              latitude={case_.latitude}
              longitude={case_.longitude}
              filingDate={case_.filingDate}
              solvingDate={case_.solvingDate}
              onMarkUnsolved={handleMarkUnsolved}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No solved cases found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
