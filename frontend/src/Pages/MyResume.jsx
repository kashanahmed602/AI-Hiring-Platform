import UploadResume from "../Components/UploadResume";
import ResumeUploaded from "../Components/ResumeUploaded";
import axios from "axios";
import { useState, useEffect } from "react";

const MyResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/candidate/profile",
          {
            withCredentials: true,
          }
        );

        setResumeData(response.data.user);

        console.log("resumeData:", response.data.user);
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {resumeData?.resume?.parsingStatus === "completed" ? <ResumeUploaded data={resumeData} /> : <UploadResume />}
    </div>
  );
};

export default MyResume;
