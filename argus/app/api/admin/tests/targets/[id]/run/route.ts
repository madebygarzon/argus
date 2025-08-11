import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { runUrlCheck } from '@/lib/runUrlCheck';
import { appendRun, listTargets, updateTargetMeta, TestRun } from '@/lib/testStore';

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const targets = await listTargets();
  const target = targets.find(t => t.id === id);
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const runId = randomUUID();
  const startedAt = new Date().toISOString();
  const result = await runUrlCheck(target.url, runId);
  const finishedAt = new Date().toISOString();
  const run: TestRun = {
    id: runId,
    targetId: target.id,
    startedAt,
    finishedAt,
    ok: result.ok,
    httpStatus: result.httpStatus,
    durationMs: result.durationMs,
    screenshotPath: result.screenshotPath,
    errorMessage: result.errorMessage,
  };
  await appendRun(run);
  await updateTargetMeta(target.id, {
    lastRunAt: finishedAt,
    lastStatus: result.ok ? 'ok' : 'fail',
    lastHttpStatus: result.httpStatus,
    lastDurationMs: result.durationMs,
    lastScreenshotPath: result.screenshotPath,
  });
  return NextResponse.json(run);
}
