'use client';

import useSWR from 'swr';
import UrlForm from './components/UrlForm';
import UrlTable from './components/UrlTable';
import type { TestTarget } from '@/lib/testStore';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function TestsPage() {
  const { data, mutate } = useSWR<TestTarget[]>('/api/admin/tests/targets', fetcher);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">URL Tests</h1>
      <UrlForm onCreated={() => mutate()} />
      <UrlTable targets={data || []} onChange={() => mutate()} />
    </div>
  );
}
