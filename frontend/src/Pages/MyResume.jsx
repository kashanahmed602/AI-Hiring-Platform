import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useRef, useState } from "react";

const ResumeUpload = () => {

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");


  // ======================================================
  // FILE SELECT
  // ======================================================

  const handleFileChange = (event) => {

    const file = event.target.files?.[0];

    setError("");

    if (!file) return;


    // Allowed formats
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];


    // Check format
    if (!allowedTypes.includes(file.type)) {

      setError(
        "Please upload your resume in PDF or DOCX format."
      );

      event.target.value = "";
      return;
    }


    // Check size - 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

      setError(
        "Resume size must be less than 5MB."
      );

      event.target.value = "";
      return;
    }


    setSelectedFile(file);

  };


  // ======================================================
  // REMOVE FILE
  // ======================================================

  const removeFile = () => {

    setSelectedFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  };


  // ======================================================
  // UPLOAD BUTTON
  // ======================================================

  const handleUpload = () => {

    if (!selectedFile) {

      setError("Please select your resume first.");
      return;

    }


    // Abhi sirf testing ke liye
    console.log("Selected Resume:", selectedFile);

    alert(
      "Resume selected successfully. Backend upload will be added next."
    );

  };


  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">


      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
          Upload Your Resume
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Upload your resume and let AI automatically build
          your professional profile.
        </p>

      </div>


      {/* ==================================================
          UPLOAD AREA
      ================================================== */}

      {!selectedFile && (

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-slate-200 hover:border-violet-400 rounded-2xl p-8 sm:p-10 transition group"
        >

          <div className="flex flex-col items-center text-center">

            <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:bg-violet-100 transition">

              <Upload size={25} />

            </div>


            <h3 className="mt-4 text-sm font-bold text-slate-900">
              Upload your resume
            </h3>


            <p className="mt-1 text-sm text-slate-500">
              Click to browse your files
            </p>


            <p className="mt-3 text-xs text-slate-400">
              PDF or DOCX • Maximum 5MB
            </p>

          </div>

        </button>

      )}


      {/* ==================================================
          HIDDEN INPUT
      ================================================== */}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="hidden"
      />


      {/* ==================================================
          SELECTED FILE
      ================================================== */}

      {selectedFile && (

        <div className="border border-violet-200 bg-violet-50/50 rounded-2xl p-4">

          <div className="flex items-center gap-4">


            {/* File Icon */}

            <div className="w-11 h-11 rounded-xl bg-white text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">

              <FileText size={21} />

            </div>


            {/* File Information */}

            <div className="flex-1 min-w-0">

              <p className="text-sm font-semibold text-slate-900 truncate">

                {selectedFile.name}

              </p>

              <p className="text-xs text-slate-500 mt-1">

                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB

              </p>

            </div>


            {/* Remove */}

            <button
              type="button"
              onClick={removeFile}
              className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center"
            >

              <X size={17} />

            </button>

          </div>


          {/* Upload */}

          <button
            type="button"
            onClick={handleUpload}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition shadow-lg shadow-violet-500/20"
          >

            <Upload size={17} />

            Upload Resume

          </button>

        </div>

      )}


      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (

        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600">

          <AlertCircle
            size={17}
            className="shrink-0 mt-0.5"
          />

          <p className="text-sm">
            {error}
          </p>

        </div>

      )}


      {/* ==================================================
          TIPS
      ================================================== */}

      <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={17}
            className="text-emerald-500 shrink-0 mt-0.5"
          />

          <div>

            <p className="text-sm font-semibold text-slate-800">
              For better AI parsing
            </p>

            <ul className="mt-2 space-y-1 text-xs text-slate-500">

              <li>
                • Use a clear, text-based resume
              </li>

              <li>
                • Include your skills and work experience
              </li>

              <li>
                • Include your education and projects
              </li>

              <li>
                • Use standard section headings
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumeUpload;