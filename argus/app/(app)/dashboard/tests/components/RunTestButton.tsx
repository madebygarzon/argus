'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Play } from 'lucide-react';

export default function RunTestButton({ id, onFinished }: { id: string; onFinished: () => void }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function run() {
    setLoading(true);
    const res = await fetch(`/api/admin/tests/targets/${id}/run`, { method: 'POST' });
    const data = await res.json();
    setLoading(false);
    toast({ title: data.ok ? 'OK' : 'Failed', description: data.errorMessage });
    onFinished();
  }

  return (
    <Button onClick={run} disabled={loading} className="flex items-center gap-1">
      <Play className="h-4 w-4" /> {loading ? 'Running' : 'Run'}
    </Button>
  );
}
