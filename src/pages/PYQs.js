import React, { useState, useEffect } from "react";
import { FaDownload, FaCheckCircle } from "react-icons/fa";

const PYQs = () => {
  // State for PYQs data
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for filters
  const [filters, setFilters] = useState({
    course: "",
    subject: "",
    semester: "",
    year: "",
    examType: "",
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    course: "",
    subject: "",
    semester: "",
    year: "",
    examType: "",
    examTerm: "",
    description: "",
    file: null,
  });

  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State for filter options (will be populated from backend data)
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    semesters: [],
    courses: [],
    examTypes: ["Midterm", "Final", "Quiz"],
    examTerms: ["Mid", "End", "Final"],
  });

  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
    fetchPYQs();
  }, [currentPage, filters]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token to get user info (basic implementation)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsLoggedIn(true);
        setUser(payload);
      } catch (error) {
        console.error("Token decode error:", error);
        setIsLoggedIn(false);
      }
    }
  };

  const fetchPYQs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== "")),
      });

      const response = await fetch(`http://localhost:5000/api/pyqs?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setPyqs(data.pyqs);
        setTotalPages(data.totalPages);
        setTotal(data.total);
        
        // Extract unique filter options from the data
        const uniqueYears = [...new Set(data.pyqs.map(pyq => pyq.year))].sort().reverse();
        const uniqueSemesters = [...new Set(data.pyqs.map(pyq => pyq.semester))].sort();
        const uniqueCourses = [...new Set(data.pyqs.map(pyq => pyq.course))].sort();
        
        setFilterOptions(prev => ({
          ...prev,
          years: uniqueYears,
          semesters: uniqueSemesters,
          courses: uniqueCourses,
        }));
      } else {
        setError(data.message || "Failed to fetch PYQs");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Fetch PYQs error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      course: "",
      subject: "",
      semester: "",
      year: "",
      examType: "",
    });
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setError("Please login to upload PYQs");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      formDataToSend.append("course", formData.course);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("semester", formData.semester);
      formDataToSend.append("year", formData.year);
      formDataToSend.append("examType", formData.examType);
      formDataToSend.append("examTerm", formData.examTerm);
      
      if (formData.description) {
        formDataToSend.append("description", formData.description);
      }
      
      if (formData.file) {
        formDataToSend.append("pyqFile", formData.file);
      }

      // Debug: Log what we're sending
      console.log("Sending data:", {
        course: formData.course,
        subject: formData.subject,
        semester: formData.semester,
        year: formData.year,
        examType: formData.examType,
        examTerm: formData.examTerm,
        description: formData.description,
        hasFile: !!formData.file
      });

      const response = await fetch("http://localhost:5000/api/pyqs", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        setShowModal(false);
        setFormData({
          course: "",
          subject: "",
          semester: "",
          year: "",
          examType: "",
          examTerm: "",
          description: "",
          file: null,
        });
        
        // Show success message
        setSuccessMessage("PYQ uploaded successfully!");
        setShowSuccess(true);
        
        // Refresh the list
        fetchPYQs();
      } else {
        console.error("Server error:", result);
        setError(result.message || `Upload failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async (pyqId, filename) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pyqs/${pyqId}/download`);

      if (response.ok) {
        // Create blob and download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename || 'pyq-file.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        // Refresh data to update download count
        fetchPYQs();
      } else {
        setError("Download failed");
      }
    } catch (error) {
      setError("Download failed");
      console.error("Download error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f4ef] py-12 px-4">
      {/* Success Message Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <FaCheckCircle size={24} />
            <span className="text-lg font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Add PYQ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Add PYQ</h2>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Course</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Computer Science"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Data Structures"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Semester</label>
                <input
                  type="number"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. 4"
                  min="1"
                  max="8"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. 2024"
                  min="2020"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Exam Type</label>
                <select 
                  name="examType"
                  value={formData.examType}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2" 
                  required
                >
                  <option value="">Select Exam Type</option>
                  <option value="Midterm">Midterm</option>
                  <option value="Final">Final</option>
                  <option value="Quiz">Quiz</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Exam Term</label>
                <select 
                  name="examTerm"
                  value={formData.examTerm}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2" 
                  required
                >
                  <option value="">Select Term</option>
                  <option value="Mid">Mid</option>
                  <option value="End">End</option>
                  <option value="Final">Final</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  rows="3"
                  placeholder="Additional details about this PYQ..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Upload File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  accept=".pdf,.doc,.docx"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-900 text-white py-2 rounded font-semibold hover:bg-yellow-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Uploading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-playfair font-bold text-yellow-900 mb-2">Previous Year Papers</h1>
            <p className="text-xl text-yellow-900/70">Access exam papers to prepare better</p>
            {total > 0 && <p className="text-sm text-yellow-900/60 mt-2">Found {total} papers</p>}
          </div>

          <button
            className="mt-4 md:mt-0 px-6 py-2 bg-yellow-900 text-white rounded-lg font-semibold shadow hover:bg-yellow-800 transition"
            onClick={() => {
              if (!isLoggedIn) {
                setError("Please login to upload PYQs");
                return;
              }
              setShowModal(true);
              setError("");
            }}
          >
            + Add PYQ
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap gap-4">
        <select 
          value={filters.year} 
          onChange={e => handleFilterChange("year", e.target.value)} 
          className="px-4 py-2 rounded border"
        >
          <option value="">All Years</option>
          {filterOptions.years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
        
        <select 
          value={filters.semester} 
          onChange={e => handleFilterChange("semester", e.target.value)} 
          className="px-4 py-2 rounded border"
        >
          <option value="">All Semesters</option>
          {filterOptions.semesters.map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}
        </select>
        
        <select 
          value={filters.course} 
          onChange={e => handleFilterChange("course", e.target.value)} 
          className="px-4 py-2 rounded border"
        >
          <option value="">All Courses</option>
          {filterOptions.courses.map(course => <option key={course} value={course}>{course}</option>)}
        </select>
        
        <select 
          value={filters.examType} 
          onChange={e => handleFilterChange("examType", e.target.value)} 
          className="px-4 py-2 rounded border"
        >
          <option value="">All Exam Types</option>
          <option value="Midterm">Midterm</option>
          <option value="Final">Final</option>
          <option value="Quiz">Quiz</option>
        </select>
        
        <input
          type="text"
          placeholder="Search subject..."
          value={filters.subject}
          onChange={e => handleFilterChange("subject", e.target.value)}
          className="px-4 py-2 rounded border"
        />
        
        <button
          className="ml-2 px-4 py-2 bg-yellow-900 text-white rounded hover:bg-yellow-800 transition"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-yellow-900 text-lg">Loading...</div>
        </div>
      )}

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!loading && pyqs.length === 0 && (
          <div className="col-span-full text-center text-yellow-900 text-lg py-8">
            No papers found for selected filters.
          </div>
        )}
        
        {pyqs.map((pyq) => (
          <div key={pyq._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[280px] justify-between hover:shadow-xl transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold font-playfair text-yellow-900 leading-tight">
                  {pyq.subject}
                </h3>
                <span className="bg-yellow-100 text-yellow-900 text-xs px-2 py-1 rounded font-semibold">
                  {pyq.examType}
                </span>
              </div>
              
              <div className="text-yellow-900/80 mb-2 text-sm font-medium">{pyq.course}</div>
              
              <div className="text-yellow-900/60 text-sm mb-3">
                <div>Year: {pyq.year}</div>
                <div>Semester: {pyq.semester}</div>
                {pyq.college && <div>College: {pyq.college}</div>}
              </div>
              
              {pyq.description && (
                <div className="text-yellow-900/70 text-sm mb-3 line-clamp-2">
                  {pyq.description}
                </div>
              )}
              
              <div className="flex justify-between text-yellow-900/70 text-sm mb-4">
                <span>{pyq.downloads || 0} downloads</span>
                <span>By: {pyq.uploadedBy?.name || "Anonymous"}</span>
              </div>
            </div>
            
            <button 
              onClick={() => handleDownload(pyq._id, `${pyq.subject}-${pyq.year}-${pyq.examType}.pdf`)}
              className="border border-yellow-900 text-yellow-900 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-yellow-900 hover:text-white transition mt-auto"
            >
              <FaDownload />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-8 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-yellow-900 text-white rounded disabled:opacity-50 hover:bg-yellow-800 transition"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 bg-white rounded border">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-yellow-900 text-white rounded disabled:opacity-50 hover:bg-yellow-800 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PYQs;