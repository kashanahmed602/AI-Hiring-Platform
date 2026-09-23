import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  X,
  Save,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSave,
}) => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  /* =====================================================
     RESET FORM WHEN MODAL OPENS
  ====================================================== */

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setError("");

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);


  /* =====================================================
     PASSWORD UPDATE
  ====================================================== */

  const passwordUpdate = async () => {

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      setError("Please enter your new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );
      return;
    }

    try {

      setSaving(true);
      setError("");

      const response = await axios.put(
        "http://localhost:3001/api/v1/candidate/updatePassword",
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Password update:", response.data);

      alert("Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      if (onSave) {
        onSave();
      }

      onClose();

    } catch (error) {

      console.error(
        "Error updating password:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Error updating password."
      );

    } finally {
      setSaving(false);
    }
  };


  /* =====================================================
     SUBMIT
  ====================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    await passwordUpdate();
  };


  /* =====================================================
     CLOSE
  ====================================================== */

  const handleClose = () => {

    if (saving) return;

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setError("");

    onClose();
  };


  /* =====================================================
     PASSWORD INPUT
  ====================================================== */

  const PasswordInput = ({
    id,
    name,
    label,
    placeholder,
    value,
    onChange,
    showPassword,
    setShowPassword,
  }) => {

    return (
      <div>

        <label
          htmlFor={id}
          className="
            block
            text-xs
            font-semibold
            text-slate-600
            mb-2
          "
        >
          {label}
        </label>

        <div className="relative">

          <LockKeyhole
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
            id={id}
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={
              name === "currentPassword"
                ? "current-password"
                : "new-password"
            }
            className="
              w-full
              h-11
              pl-10
              pr-11
              rounded-xl
              border
              border-slate-200
              bg-white
              text-sm
              text-slate-900
              outline-none
              placeholder:text-slate-300
              focus:border-violet-400
              focus:ring-4
              focus:ring-violet-500/10
              transition
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-slate-700
              transition
            "
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>

        </div>

      </div>
    );
  };


  /* =====================================================
     HIDE MODAL
  ====================================================== */

  if (!isOpen) return null;


  return (
    <div
      className="
        fixed
        inset-0
        z-[110]
        bg-slate-900/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onMouseDown={(e) => {
        if (
          e.target === e.currentTarget &&
          !saving
        ) {
          handleClose();
        }
      }}
    >

      {/* MODAL */}

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-slate-200
          overflow-hidden
        "
      >

        {/* HEADER */}

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

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-violet-50
                text-violet-600
                flex
                items-center
                justify-center
              "
            >
              <LockKeyhole size={19} />
            </div>

            <div>

              <h2
                className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-slate-900
                "
              >
                Change Password
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Update your account password
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
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
              disabled:opacity-50
            "
          >
            <X size={18} />
          </button>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-7"
        >

          {/* SECURITY MESSAGE */}

          <div
            className="
              flex
              gap-3
              p-3.5
              rounded-2xl
              bg-violet-50
              border
              border-violet-100
              mb-6
            "
          >

            <ShieldCheck
              size={18}
              className="
                text-violet-600
                shrink-0
                mt-0.5
              "
            />

            <p
              className="
                text-xs
                leading-5
                text-violet-700
              "
            >
              Choose a strong password that you don't use
              anywhere else.
            </p>

          </div>


          {/* PASSWORD INPUTS */}

          <div className="space-y-5">

            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              showPassword={showCurrentPassword}
              setShowPassword={setShowCurrentPassword}
            />


            <PasswordInput
              id="newPassword"
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
            />


            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />

          </div>


          {/* REQUIREMENT */}

          <div className="mt-4">

            <p className="text-[11px] text-slate-400">
              Password must contain at least 8 characters.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div
              className="
                mt-4
                px-3.5
                py-3
                rounded-xl
                bg-red-50
                border
                border-red-100
                text-xs
                text-red-600
                leading-5
              "
            >
              {error}
            </div>
          )}


          {/* BUTTONS */}

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

            <button
              type="button"
              onClick={handleClose}
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

              {saving
                ? "Changing..."
                : "Change Password"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ChangePasswordModal;