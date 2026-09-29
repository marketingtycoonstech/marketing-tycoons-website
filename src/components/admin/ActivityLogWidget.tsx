import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityLog } from '../../types';
import { Clock } from 'lucide-react';

export const ActivityLogWidget: React.FC = () => {
  const { activityLogs } = useApp();

  return (
    <div className="bg-[#0e0f14] p-6 rounded-xl border border-gray-800">
      <h3 className="text-gray-200 font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        Activity Log
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activityLogs.length === 0 ? (
          <p className="text-xs text-gray-500">No recent activity.</p>
        ) : (
          activityLogs.map((log: ActivityLog) => (
            <div key={log.id} className="text-xs p-2 rounded bg-gray-800/50 border border-gray-700">
              <span className="font-bold text-[#d4af37]">{log.adminName}</span> {log.action.replace('_', ' ')}
              <span className="text-gray-400"> on {log.targetType}</span>
              <div className="text-[10px] text-gray-500 mt-1">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
