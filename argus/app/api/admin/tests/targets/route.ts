import { NextResponse } from 'next/server';
import { z } from 'zod';
import { listTargets, createTarget } from '@/lib/testStore';

const schema = z.object({
  url: z.string().url().max(2000),
  label: z.string().max(60).optional(),
});

export async function GET() {
  const targets = await listTargets();
  return NextResponse.json(targets);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }
  const target = await createTarget(result.data);
  return NextResponse.json(target, { status: 201 });
}
