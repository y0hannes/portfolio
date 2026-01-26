import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Users, Layout, MessageSquare, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number | string;
  color: string;
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-white/40 text-sm">{label}</div>
  </div>
);

export const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    views: 1234 // Mock view count
  });

  useEffect(() => {
    Promise.all([
      api.getProjects(),
      api.getMessages()
    ]).then(([projects, messages]) => {
      setStats(prev => ({
        ...prev,
        projects: projects.length,
        messages: messages.length
      }));
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <Link to="/admin/projects" className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2">
          <Plus size={18} />
          <span>New Project</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard 
          icon={Users} 
          label="Total Views" 
          value={stats.views} 
          color="bg-purple-500" 
        />
        <StatCard 
          icon={Layout} 
          label="Projects" 
          value={stats.projects} 
          color="bg-cyan-500" 
        />
        <StatCard 
          icon={MessageSquare} 
          label="Messages" 
          value={stats.messages} 
          color="bg-pink-500" 
        />
      </div>

      {/* <div className="p-8 bg-white/5 border border-white/5 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-sm text-white/60 py-2 border-b border-white/5 last:border-0">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>New connection received from United States</span>
              <span className="ml-auto text-white/20">2m ago</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
