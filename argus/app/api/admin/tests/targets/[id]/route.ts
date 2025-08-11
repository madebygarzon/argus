import { NextResponse } from 'next/server';
import { deleteTarget } from '@/lib/testStore';

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(req.url);
  const params = await context.params;
  const removeRuns = searchParams.get('runs') === '1';
  await deleteTarget(params.id, removeRuns);
  return NextResponse.json({ ok: true });
}
