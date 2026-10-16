import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const WorkspaceLayout = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <div
        className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar role={role} onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="min-h-screen lg:ml-64">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-5 left-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 lg:hidden"
        >
          <Menu size={20} />
        </button>
        {children}
      </main>
    </div>
  );
};

export default WorkspaceLayout;
