import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";

// Dummy data for demonstration
const allPYQs = [
  {
    subject: "CS301: Data Structures",
    session: "Winter 2024",
    pages: 12,
    downloads: 345,
    type: "PDF",
    year: "2024",
    sem: "6",
    branch: "CSE",
    exam: "End Term",
  },
  {
    subject: "MTH201: Linear Algebra",
    session: "Summer 2023",
    pages: 8,
    downloads: 562,
    type: "PDF",
    year: "2023",
    sem: "4",
    branch: "CSE",
    exam: "Mid Term",
  },
  {
    subject: "ECO101: Microeconomics",
    session: "Winter 2024",
    pages: 10,
    downloads: 289,
    type: "PDF",
    year: "2024",
    sem: "2",
    branch: "ECO",
    exam: "End Term",
  },
  {
    subject: "PHY202: Electromagnetism",
    session: "Winter 2023",
    pages: 15,
    downloads: 476,
    type: "PDF",
    year: "2023",
    sem: "4",
    branch: "PHY",
    exam: "End Term",
  },
];

const years = ["2024", "2023"];
const sems = ["2", "4", "6"];
const branches = ["CSE", "ECO", "PHY"];
const exams = ["Mid Term", "End Term"];

const PYQs = () => {
  // State for filters
  const [year, setYear] = useState("");
  const [sem, setSem] = useState("");
  const [branch, setBranch] = useState("");
  const [exam, setExam] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Filter logic
  const filteredPYQs = allPYQs.filter(
    (q) =>
      (year === "" || q.year === year) &&
      (sem === "" || q.sem === sem) &&
      (branch === "" || q.branch === branch) &&
      (exam === "" || q.exam === exam)
  );

  return (
    <div className="min-h-screen bg-[#f9f4ef] py-12 px-4">
      {/* Heading */}
        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700"
                onClick={() => setShowModal(false)}
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Add PYQ</h2>
            <form>
                <div className="mb-4">
                <label className="block mb-1 font-semibold">Course Name & Code</label>
                <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. CS301: Data Structures"
                    required
                />
                </div>
                <div className="mb-4">
                <label className="block mb-1 font-semibold">Exam Type</label>
                <select className="w-full border rounded px-3 py-2" required>
                    <option value="">Select</option>
                    <option value="Mid Term">Mid Term</option>
                    <option value="End Term">End Term</option>
                </select>
                </div>
                <div className="mb-4">
                <label className="block mb-1 font-semibold">Year</label>
                <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. 2024"
                    required
                />
                </div>
                <div className="mb-4">
                <label className="block mb-1 font-semibold">Page Length</label>
                <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. 2"
                    required
                />
                </div>
                <button
                type="submit"
                className="w-full bg-yellow-900 text-white py-2 rounded font-semibold hover:bg-yellow-800 transition"
                >
                Submit
                </button>
            </form>
            </div>
        </div>
        )}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-playfair font-bold text-yellow-900 mb-2">Previous Year Papers</h1>
            <p className="text-xl text-yellow-900/70">Access exam papers to prepare better</p>
          </div>

          <button
            className="mt-4 md:mt-0 px-6 py-2 bg-yellow-900 text-white rounded-lg font-semibold shadow hover:bg-yellow-800 transition"
            onClick={() => setShowModal(true)}
          >
            + Add PYQ
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap gap-4">
        <select value={year} onChange={e => setYear(e.target.value)} className="px-4 py-2 rounded border">
          <option value="">Year</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={sem} onChange={e => setSem(e.target.value)} className="px-4 py-2 rounded border">
          <option value="">Semester</option>
          {sems.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={branch} onChange={e => setBranch(e.target.value)} className="px-4 py-2 rounded border">
          <option value="">Branch</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={exam} onChange={e => setExam(e.target.value)} className="px-4 py-2 rounded border">
          <option value="">Exam Type</option>
          {exams.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        <button
          className="ml-2 px-4 py-2 bg-yellow-900 text-white rounded"
          onClick={() => { setYear(""); setSem(""); setBranch(""); setExam(""); }}
        >
          Clear
        </button>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPYQs.length === 0 && (
          <div className="col-span-4 text-center text-yellow-900 text-lg">No papers found for selected filters.</div>
        )}
        {filteredPYQs.map((q, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[220px] justify-between">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold font-playfair text-yellow-900">{q.subject}</h2>
              <span className="bg-yellow-100 text-yellow-900 text-xs px-3 py-1 rounded font-semibold">{q.type}</span>
            </div>
            <div className="text-yellow-900/80 mb-1">{q.session}</div>
            <div className="flex justify-between text-yellow-900/70 text-sm mb-4">
              <span>{q.pages} pages</span>
              <span>{q.downloads} downloads</span>
            </div>
            <button className="border border-yellow-900 text-yellow-900 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-yellow-900 hover:text-white transition">
              <FaDownload />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PYQs;