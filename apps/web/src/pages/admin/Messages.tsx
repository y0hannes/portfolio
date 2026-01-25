import { useEffect, useState } from 'react';
import { api, type Message } from '../../services/api';
import { Mail, Clock } from 'lucide-react';

export const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = () => {
    api.getMessages().then(setMessages);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Inbox</h1>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="text-center py-20 text-white/40 bg-white/5 rounded-2xl border border-white/5">
            <Mail size={48} className="mx-auto mb-4 opacity-50" />
            <p>No messages yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="group p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{msg.name}</h3>
                    <div className="text-sm text-cyan-400">{msg.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Clock size={14} />
                  <span>{formatDate(msg.date)}</span>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed pl-13 ml-13 border-l-2 border-white/10 pl-4">
                {msg.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
