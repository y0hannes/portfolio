import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FolderPlus, LogOut, Menu, X, Award, Briefcase } from 'lucide-react';
import { clsx } from 'clsx';

export const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth !== 'true') navigate('/admin/login');
    else setIsAuthenticated(true); // eslint-disable-line
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/admin/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/messages',     icon: MessageSquare,   label: 'Messages' },
    { path: '/admin/projects',     icon: FolderPlus,      label: 'Projects' },
    { path: '/admin/certificates', icon: Award,           label: 'Certificates' },
    { path: '/admin/experiences',  icon: Briefcase,       label: 'Experience' },
  ];

  return (
    <div className="min-h-screen bg-dark flex">

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-dark-3 rounded-lg border border-white/10"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        'fixed inset-y-0 left-0 w-60 bg-dark-2 border-r border-white/[0.08] transform transition-transform duration-300 z-40 lg:translate-x-0 flex flex-col',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="px-6 py-7 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">YM</span>
            </div>
            <span className="text-sm font-semibold text-white/80">Admin Panel</span>
          </div>
        </div>

        <nav className="px-3 py-4 space-y-0.5 flex-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm',
                isActive
                  ? 'bg-accent/25 text-white border border-accent/30'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              )}
            >
              <item.icon size={16} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/[0.08]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={16} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 lg:ml-60 p-8 min-h-screen admin-scroll">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
