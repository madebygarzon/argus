import { chromium } from 'playwright';
import { performance } from 'perf_hooks';
import path from 'path';
import { promises as fs } from 'fs';

interface RunResult {
  ok: boolean;
  httpStatus?: number;
  durationMs: number;
  screenshotPath?: string;
  errorMessage?: string;
}

// We use the Playwright API directly so we can integrate the results with our custom store.
export async function runUrlCheck(url: string, runId: string): Promise<RunResult> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const start = performance.now();
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const durationMs = Math.round(performance.now() - start);
    const httpStatus = response?.status();
    const dir = path.join(process.cwd(), 'public', 'tests');
    await fs.mkdir(dir, { recursive: true });
    const relative = path.join('tests', `${runId}.png`);
    const filePath = path.join(dir, `${runId}.png`);
    await page.screenshot({ path: filePath });
    await browser.close();
    return { ok: true, httpStatus, durationMs, screenshotPath: relative };
  } catch (err: any) {
    const durationMs = Math.round(performance.now() - start);
    await browser.close();
    return { ok: false, durationMs, errorMessage: err?.message };
  }
}

export type { RunResult };
