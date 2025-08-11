import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export interface TestTarget {
  id: string;
  url: string;
  label?: string;
  createdAt: string;
  lastRunAt?: string;
  lastStatus?: 'ok' | 'fail';
  lastHttpStatus?: number;
  lastDurationMs?: number;
  lastScreenshotPath?: string;
}

export interface TestRun {
  id: string;
  targetId: string;
  startedAt: string;
  finishedAt?: string;
  ok?: boolean;
  httpStatus?: number;
  durationMs?: number;
  screenshotPath?: string;
  errorMessage?: string;
}

const dataDir = path.join(process.cwd(), 'data');
const targetsFile = path.join(dataDir, 'test-targets.json');
const runsFile = path.join(dataDir, 'test-runs.json');

async function ensureFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(targetsFile); } catch { await fs.writeFile(targetsFile, '[]'); }
  try { await fs.access(runsFile); } catch { await fs.writeFile(runsFile, '[]'); }
}

async function readJSON<T>(file: string): Promise<T[]> {
  await ensureFiles();
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data || '[]');
}

async function writeJSON<T>(file: string, value: T[]): Promise<void> {
  await fs.writeFile(file, JSON.stringify(value, null, 2));
}

export async function listTargets(): Promise<TestTarget[]> {
  return readJSON<TestTarget>(targetsFile);
}

export async function createTarget(data: { url: string; label?: string }): Promise<TestTarget> {
  const targets = await readJSON<TestTarget>(targetsFile);
  const target: TestTarget = {
    id: randomUUID(),
    url: data.url,
    label: data.label,
    createdAt: new Date().toISOString(),
  };
  targets.push(target);
  await writeJSON(targetsFile, targets);
  return target;
}

export async function deleteTarget(id: string, removeRuns = false): Promise<void> {
  const targets = await readJSON<TestTarget>(targetsFile);
  const filtered = targets.filter(t => t.id !== id);
  await writeJSON(targetsFile, filtered);
  if (removeRuns) {
    const runs = await readJSON<TestRun>(runsFile);
    await writeJSON(runsFile, runs.filter(r => r.targetId !== id));
  }
}

export async function updateTargetMeta(id: string, updates: Partial<TestTarget>): Promise<TestTarget | undefined> {
  const targets = await readJSON<TestTarget>(targetsFile);
  const idx = targets.findIndex(t => t.id === id);
  if (idx === -1) return undefined;
  targets[idx] = { ...targets[idx], ...updates };
  await writeJSON(targetsFile, targets);
  return targets[idx];
}

export async function listRunsByTarget(targetId: string, limit?: number): Promise<TestRun[]> {
  const runs = await readJSON<TestRun>(runsFile);
  const filtered = runs.filter(r => r.targetId === targetId).sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
}

export async function appendRun(run: TestRun): Promise<void> {
  const runs = await readJSON<TestRun>(runsFile);
  runs.push(run);
  await writeJSON(runsFile, runs);
}
