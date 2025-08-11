'use client';

import { useState } from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RunTestButton from './RunTestButton';
import ResultDrawer from './ResultDrawer';
import type { TestTarget } from '@/lib/testStore';
import { ExternalLink, Trash } from 'lucide-react';

export default function UrlTable({ targets, onChange }: { targets: TestTarget[]; onChange: () => void }) {
  const [viewTarget, setViewTarget] = useState<TestTarget | null>(null);

  async function remove(id: string) {
    await fetch(`/api/admin/tests/targets/${id}`, { method: 'DELETE' });
    onChange();
  }

  return (
    <div className="relative">
      <Table>
        <thead>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Last run</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </thead>
        <TableBody>
          {targets.map(t => (
            <TableRow key={t.id}>
              <TableCell>{t.label}</TableCell>
              <TableCell>
                <a href={t.url} target="_blank" className="flex items-center gap-1 text-blue-600 underline">
                  {t.url}<ExternalLink className="h-3 w-3" />
                </a>
              </TableCell>
              <TableCell>{t.lastRunAt ? new Date(t.lastRunAt).toLocaleString() : '-'}</TableCell>
              <TableCell>
                {t.lastStatus && (
                  <Badge className={t.lastStatus === 'ok' ? 'bg-green-600' : 'bg-red-600'}>
                    {t.lastStatus}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{t.lastDurationMs ? `${t.lastDurationMs} ms` : '-'}</TableCell>
              <TableCell className="space-x-2">
                <RunTestButton id={t.id} onFinished={onChange} />
                {t.lastRunAt && <Button onClick={() => setViewTarget(t)}>View</Button>}
                <Button onClick={() => remove(t.id)}><Trash className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewTarget && <ResultDrawer target={viewTarget} onClose={() => setViewTarget(null)} />}
    </div>
  );
}
