import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const AdminEmergencyCase = ({
  caseId,
  title,
  filerName,
  filerNumber,
  latitude,
  longitude,
  filingDate,
  onUpdateStatus,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-md mb-4 overflow-hidden `}>
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-semibold text-lg text-red-600">
            Case #{caseId}: {title}
          </h3>
          <p className="text-sm text-gray-500">Filed on: {filingDate}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-red-500" />
        ) : (
          <ChevronDown className="text-red-500" />
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
              onClick={() => onUpdateStatus(caseId, "Resolved")}
              className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center `}
            >
              <CheckCircle className="mr-2" /> Mark Resolved
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function AdminEmergencyCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cases, setCases] = useState([
    {
      caseId: "E001",
      title: "Kidnapping in Progress",
      filerName: "Alice Johnson",
      filerNumber: "+1234567890",
      latitude: "40.7128",
      longitude: "-74.0060",
      filingDate: "2024-07-20",
    },
    {
      caseId: "E002",
      title: "Armed Robbery",
      filerName: "Bob Williams",
      filerNumber: "+1987654321",
      latitude: "34.0522",
      longitude: "-118.2437",
      filingDate: "2024-07-19",
    },
    // Add more emergency cases as needed
  ]);

  const filteredCases = cases.filter(
    (case_) =>
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.caseId.includes(searchTerm) ||
      case_.filerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = (caseId) => {
    setCases(
      cases.map((case_) => (case_.caseId === caseId ? { ...case_ } : case_))
    );
    // In a real application, you would also send this update to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-red-800 mb-8">
          Emergency Cases
        </h1>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search emergency cases by ID, title, or filer name..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" />
        </div>

        {filteredCases.length > 0 ? (
          filteredCases.map((case_) => (
            <AdminEmergencyCase
              key={case_.caseId}
              caseId={case_.caseId}
              title={case_.title}
              filerName={case_.filerName}
              filerNumber={case_.filerNumber}
              latitude={case_.latitude}
              longitude={case_.longitude}
              filingDate={case_.filingDate}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No emergency cases found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
