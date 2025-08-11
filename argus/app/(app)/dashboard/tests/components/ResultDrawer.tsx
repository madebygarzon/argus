'use client';

import { Button } from '@/components/ui/button';
import type { TestTarget } from '@/lib/testStore';
import { X } from 'lucide-react';

export default function ResultDrawer({ target, onClose }: { target: TestTarget; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" role="dialog" aria-modal="true">
      <div className="w-80 bg-white p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Last run</h2>
          <Button onClick={onClose} className="px-2 py-1"><X className="h-4 w-4" /></Button>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div>Status: {target.lastStatus}</div>
          <div>HTTP: {target.lastHttpStatus}</div>
          <div>Duration: {target.lastDurationMs} ms</div>
          <div>Date: {target.lastRunAt ? new Date(target.lastRunAt).toLocaleString() : '-'}</div>
          {target.lastScreenshotPath && (
            <img src={`/${target.lastScreenshotPath}`} alt="screenshot" className="mt-2 w-full" />
          )}
        </div>
      </div>
    </div>
  );
}
