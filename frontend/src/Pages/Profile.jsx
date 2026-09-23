import {
  Mail,
  Phone,
  User,
  LockKeyhole,
  X,
  Save,
} from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";

const ProfileModal = ({
  isOpen,
  onClose,
  onSave,
  onChangePassword,
}) => {
  // ================= FORM DATA =================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const updatedProfileData = async () => {
    try {
      setLoading(true);

      const response = await axios.put(
        "http://localhost:3001/api/v1/candidate/profileUpdate",
        formData,
        {
          withCredentials: true,
        }
      );
    }catch (error) {
      alert("error updating profile:", error.response?.data || error.message);
    } finally {
      setLoading(false);    
    }
  }

  // ================= FETCH PROFILE =================

  useEffect(() => {
    if (!isOpen) return;

    const fetchedProfileData = async () => {
      try {
        setLoading(true);

        // console.log("🔥 Fetching logged-in candidate profile...");

        const response = await axios.get(
          "http://localhost:3001/api/v1/candidate/profile",
          {
            withCredentials: true,
          }
        );

        // console.log("✅ Profile API Response:", response.data);

        // Backend response:
        // {
        //   success: true,
        //   message: "...",
        //   user: {...}
        // }

        const userData = response.data.user;

        if (!userData) {
          console.error("❌ User data not found in API response");
          return;
        }

        console.log("👤 User Data:", userData);

        // Set API data into form
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      } catch (error) {
        console.error(
          "❌ Profile API Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchedProfileData();
  }, [isOpen]);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    updatedProfileData();
  };

  // ================= CLOSE =================

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-slate-900/40
        backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
          border border-slate-200
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            px-6
            sm:px-7
            py-5
            flex
            items-center
            justify-between
            border-b
            border-slate-100
          "
        >
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Edit Profile
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Update your account information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9
              rounded-xl
              bg-slate-50
              text-slate-500
              flex
              items-center
              justify-center
              hover:bg-slate-100
              hover:text-slate-900
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="p-10 flex flex-col items-center justify-center">
            <div
              className="
                w-8
                h-8
                border-4
                border-violet-200
                border-t-violet-600
                rounded-full
                animate-spin
              "
            />

            <p className="text-sm text-slate-500 mt-4">
              Loading profile...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7">

            {/* ================= ACCOUNT INFORMATION ================= */}

            <div className="space-y-5">

              {/* ================= NAME ================= */}

              <div>
                <label
                  htmlFor="name"
                  className="
                    block
                    text-xs
                    font-semibold
                    text-slate-600
                    mb-2
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-4
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-violet-400
                      focus:ring-4
                      focus:ring-violet-500/10
                      transition
                    "
                  />
                </div>
              </div>

              {/* ================= EMAIL ================= */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    block
                    text-xs
                    font-semibold
                    text-slate-600
                    mb-2
                  "
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-4
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      text-sm
                      text-slate-500
                      outline-none
                      cursor-not-allowed
                    "
                  />
                </div>

                <p className="text-[11px] text-slate-400 mt-1.5">
                  Email address cannot be changed here.
                </p>
              </div>

              {/* ================= PHONE ================= */}

              <div>
                <label
                  htmlFor="phone"
                  className="
                    block
                    text-xs
                    font-semibold
                    text-slate-600
                    mb-2
                  "
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-4
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-violet-400
                      focus:ring-4
                      focus:ring-violet-500/10
                      transition
                    "
                  />
                </div>
              </div>
            </div>

            {/* ================= SECURITY ================= */}

            <div className="mt-7 pt-6 border-t border-slate-100">
              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2">

                    <LockKeyhole
                      size={17}
                      className="text-violet-600"
                    />

                    <h3 className="text-sm font-bold text-slate-900">
                      Account Security
                    </h3>

                  </div>

                  <p className="text-xs text-slate-400 mt-1.5">
                    Keep your account secure by updating your password.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onChangePassword}
                  className="
                    shrink-0
                    h-10
                    px-4
                    rounded-xl
                    border
                    border-violet-200
                    bg-violet-50
                    text-violet-700
                    text-xs
                    font-semibold
                    flex
                    items-center
                    gap-2
                    hover:bg-violet-100
                    hover:border-violet-300
                    transition
                  "
                >
                  <LockKeyhole size={15} />

                  Change Password
                </button>

              </div>
            </div>

            {/* ================= FOOTER ================= */}

            <div
              className="
                flex
                flex-col-reverse
                sm:flex-row
                sm:justify-end
                gap-3
                mt-7
                pt-5
                border-t
                border-slate-100
              "
            >

              {/* CANCEL */}

              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="
                  w-full
                  sm:w-auto
                  px-5
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  text-sm
                  font-semibold
                  text-slate-600
                  hover:bg-slate-50
                  transition
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              {/* SAVE */}

              <button
                type="submit"
                disabled={saving}
                className="
                  w-full
                  sm:w-auto
                  px-5
                  h-11
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-blue-600
                  text-white
                  text-sm
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-lg
                  shadow-violet-500/20
                  hover:shadow-xl
                  hover:shadow-violet-500/25
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                <Save size={16} />

                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;