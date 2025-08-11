'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const schema = z.object({
  url: z.string().url(),
  label: z.string().max(60).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function UrlForm({ onCreated }: { onCreated: () => void }) {
  const { toast } = useToast();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { url: '', label: '' } });

  async function onSubmit(values: FormValues) {
    const res = await fetch('/api/admin/tests/targets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast({ title: 'Target added' });
      form.reset();
      onCreated();
    } else {
      const data = await res.json();
      toast({ title: 'Error', description: data.error });
    }
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 md:flex-row">
      <FormField control={form.control} name="url" render={({ field }) => (
        <Input {...field} placeholder="https://example.com" />
      )} />
      <FormField control={form.control} name="label" render={({ field }) => (
        <Input {...field} placeholder="Label" />
      )} />
      <Button type="submit">Add</Button>
    </Form>
  );
}
