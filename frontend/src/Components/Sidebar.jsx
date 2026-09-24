import {
  BriefcaseBusiness,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Mic2,
  Search,
  Settings,
  Sparkles,
  Target,
  X,
  Pencil,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from "axios";

const Sidebar = ({
    
  role = "candidate",
  user = null,
  onUserUpdate,
  onEditProfile,
  onClose,
}) => {

      const [profileData, setProfileData] = useState([]);


  useEffect(() => {
    const fetchedProfileData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/candidate/profile/${id}`);
            setProfileData(response.data);
        }catch(error){
            console.error("Error fetching profile data:", error);
        }
    }

  },[])
  const navigate = useNavigate();
  const location = useLocation();

  const isCandidate = role === "candidate";

  const userName = user?.name || "User";
  const userHeadline =
    user?.headline ||
    (isCandidate ? "Full Stack Developer" : "Recruiter");

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // =========================
  // CANDIDATE MENU
  // =========================

  const candidateMenu = [
    {
      icon: Home,
      label: "Overview",
      path: "/candidate/dashboard",
      active: true,
    },
    {
      icon: Search,
      label: "Find Jobs",
      path: "/candidate/jobs",
    },
    {
      icon: FileText,
      label: "My Resume",
      path: "/candidate/resume",
    },
    {
      icon: BriefcaseBusiness,
      label: "Applications",
      path: "/candidate/applications",
    },
    {
      icon: Target,
      label: "Assessments",
      path: "/candidate/assessments",
    },
    {
      icon: Mic2,
      label: "Interviews",
      path: "/candidate/interviews",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/candidate/messages",
      badge: 3,
    },
  ];

  // =========================
  // RECRUITER MENU
  // =========================

  const recruiterMenu = [
    {
      icon: Home,
      label: "Overview",
      path: "/recruiter/dashboard",
      active: true,
    },
    {
      icon: Search,
      label: "Find Candidates",
      path: "/recruiter/candidates",
    },
    {
      icon: BriefcaseBusiness,
      label: "Jobs",
      path: "/jobs",
    },
    {
      icon: FileText,
      label: "Applications",
      path: "/recruiter/applications",
    },
    {
      icon: Target,
      label: "Assessments",
      path: "/recruiter/assessments",
    },
    {
      icon: Mic2,
      label: "Interviews",
      path: "/recruiter/interviews",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/recruiter/messages",
      badge: 3,
    },
  ];

  const menuItems = (isCandidate ? candidateMenu : recruiterMenu).map((item) => ({
    ...item,
    active: item.path === location.pathname,
  }));

  // =========================
  // NAVIGATION
  // =========================

  const handleNavigation = (path) => {
    navigate(path);
    onClose?.();
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/v1/logout",
        {},
        {
          withCredentials: true,
        }
      );

      onClose?.();

      navigate("/");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <aside className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* =========================================
          LOGO
      ========================================== */}

      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <Sparkles size={19} />
          </div>

          <div>
            <h1 className="font-bold text-lg text-slate-900">
              Hire<span className="text-violet-600">Flow</span>
            </h1>

            <p className="text-[8px] uppercase tracking-[0.2em] text-slate-400">
              {isCandidate ? "Candidate" : "Recruiter"}
            </p>
          </div>
        </div>

        {/* Mobile close */}
        <button
          onClick={() => onClose?.()}
          className="lg:hidden text-slate-400 hover:text-slate-700 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* =========================================
          NAVIGATION
      ========================================== */}

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Workspace
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition ${
                item.active
                  ? "bg-violet-50 text-violet-700 font-semibold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />

              <span className="truncate">
                {item.label}
              </span>

              {item.badge && (
                <span className="ml-auto w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* =========================================
            ACCOUNT
        ========================================== */}

        <div className="pt-6">
          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Account
          </p>

          <button
            onClick={() => handleNavigation("/settings")}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* =========================================
          USER PROFILE
      ========================================== */}

      <div className="p-4 border-t border-slate-100 shrink-0">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 group">
          {/* Avatar */}

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center font-semibold text-sm shrink-0">
            {initials}
          </div>

          {/* User Info */}

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {userName}
            </p>

            <p className="text-xs text-slate-400 truncate">
              {userHeadline}
            </p>
          </div>

          {/* Edit Profile */}

          <button
            type="button"
            onClick={onEditProfile}
            title="Edit Profile"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-white transition shrink-0"
          >
            <Pencil size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;