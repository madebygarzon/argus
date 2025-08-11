import { NextResponse } from 'next/server';
import { listRunsByTarget } from '@/lib/testStore';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetId = searchParams.get('targetId');
  const limitParam = searchParams.get('limit');
  if (!targetId) return NextResponse.json({ error: 'targetId required' }, { status: 400 });
  const limit = limitParam ? Number(limitParam) : undefined;
  const runs = await listRunsByTarget(targetId, limit);
  return NextResponse.json(runs);
}
