import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Mail, Clock, Trash2 } from 'lucide-react';
import { type Message } from '../../../../types/Message';

export const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = () => { api.getMessages().then(setMessages); };
  useEffect(() => { loadMessages(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      await api.deleteMessage(id);
      loadMessages();
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium text-sand">Inbox</h1>

      <div className="grid gap-3">
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-dark-3 rounded-xl border border-white/[0.06]">
            <Mail size={32} className="mx-auto mb-3 text-sand/20" />
            <p className="text-sm text-sand/25">No messages yet</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="group p-6 bg-dark-3 border border-white/[0.06] rounded-xl hover:border-accent/25 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/25 flex items-center justify-center font-medium text-sand/70 text-sm select-none">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-sand">{msg.name}</h3>
                    <div className="text-xs text-sand/30">{msg.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sand/25 text-xs">
                    <Clock size={12} /><span>{formatDate(msg.createdAt as string)}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id!)}
                    className="p-1.5 text-sand/20 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors duration-200"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-sand/50 leading-relaxed border-l-2 border-accent/20 pl-4">
                {msg.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
