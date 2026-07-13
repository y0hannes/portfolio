import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Users, Layout, MessageSquare, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number | string;
}

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
  <div className="p-6 bg-dark-3 border border-white/[0.08] rounded-xl hover:border-accent/40 transition-colors duration-200">
    <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/25 flex items-center justify-center mb-5">
      <Icon size={18} className="text-white/70" />
    </div>
    <div className="text-2xl font-semibold text-white mb-1">{value}</div>
    <div className="text-sm text-white/50">{label}</div>
  </div>
);

export const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, views: 1234 });

  useEffect(() => {
    Promise.all([api.getProjects(), api.getMessages()]).then(([projects, messages]) => {
      setStats(prev => ({ ...prev, projects: projects.length, messages: messages.length }));
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <Link
          to="/admin/projects"
          className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-2 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} /> New Project
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard icon={Users}         label="Total Views" value={stats.views} />
        <StatCard icon={Layout}        label="Projects"    value={stats.projects} />
        <StatCard icon={MessageSquare} label="Messages"    value={stats.messages} />
      </div>
    </div>
  );
};
