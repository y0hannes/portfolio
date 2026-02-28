import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FolderPlus, LogOut, Menu, X, Award } from 'lucide-react';
import { clsx } from 'clsx';

export const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth !== 'true') {
      navigate('/admin/login');
    } else {
      // eslint-disable-next-line
      setIsAuthenticated(true);
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/projects', icon: FolderPlus, label: 'Projects' },
    { path: '/admin/certificates', icon: Award, label: 'Certificates' },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 z-40 lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8">
          <h2 className="text-2xl font-bold font-display bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Admin
          </h2>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                isActive
                  ? "bg-white/10 text-emerald-400 border border-white/10 shadow-lg shadow-emerald-500/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-8"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
