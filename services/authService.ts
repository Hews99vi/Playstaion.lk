/**
 * Authentication & Security Service
 * Handles admin authentication with hashed credentials,
 * brute-force protection, session management, and input sanitization.
 */

// --- Password Hashing (SHA-256 via Web Crypto API) ---
async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Pre-computed SHA-256 hashes of admin credentials
// These are NOT the plain-text credentials — only the hashes are stored in code.
// To change credentials, hash the new values and replace these constants.
const ADMIN_EMAIL_HASH = 'debd64da1e9f165345c4318df5c9756cb9913231500f22841543c099d6077f9d'; // hashed email
const ADMIN_PASSWORD_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'; // hashed password

// --- Brute Force Protection ---
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15-minute window for attempts

interface LoginAttemptRecord {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil: number | null;
}

function getAttemptRecord(): LoginAttemptRecord {
  try {
    const raw = sessionStorage.getItem('psl_login_attempts');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore corrupt data */ }
  return { attempts: 0, firstAttemptAt: 0, lockedUntil: null };
}

function saveAttemptRecord(record: LoginAttemptRecord): void {
  sessionStorage.setItem('psl_login_attempts', JSON.stringify(record));
}

function clearAttemptRecord(): void {
  sessionStorage.removeItem('psl_login_attempts');
}

export function getLoginLockoutInfo(): { isLocked: boolean; remainingSeconds: number } {
  const record = getAttemptRecord();
  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    return {
      isLocked: true,
      remainingSeconds: Math.ceil((record.lockedUntil - Date.now()) / 1000)
    };
  }
  return { isLocked: false, remainingSeconds: 0 };
}

export function getRemainingAttempts(): number {
  const record = getAttemptRecord();
  
  // Reset if the attempt window has passed
  if (record.firstAttemptAt && Date.now() - record.firstAttemptAt > ATTEMPT_WINDOW_MS) {
    clearAttemptRecord();
    return MAX_ATTEMPTS;
  }
  
  return Math.max(0, MAX_ATTEMPTS - record.attempts);
}

function recordFailedAttempt(): void {
  const record = getAttemptRecord();
  const now = Date.now();
  
  // Reset if window expired
  if (record.firstAttemptAt && now - record.firstAttemptAt > ATTEMPT_WINDOW_MS) {
    saveAttemptRecord({
      attempts: 1,
      firstAttemptAt: now,
      lockedUntil: null
    });
    return;
  }
  
  const newAttempts = record.attempts + 1;
  saveAttemptRecord({
    attempts: newAttempts,
    firstAttemptAt: record.firstAttemptAt || now,
    lockedUntil: newAttempts >= MAX_ATTEMPTS ? now + LOCKOUT_DURATION_MS : null
  });
}

// --- Authentication ---
export interface AuthResult {
  success: boolean;
  error?: string;
  remainingAttempts?: number;
}

export async function authenticateAdmin(email: string, password: string): Promise<AuthResult> {
  // Check lockout first
  const lockout = getLoginLockoutInfo();
  if (lockout.isLocked) {
    const minutes = Math.ceil(lockout.remainingSeconds / 60);
    return {
      success: false,
      error: `SYSTEM LOCKED: Too many failed attempts. Try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`,
      remainingAttempts: 0
    };
  }
  
  // Hash the provided credentials and compare against stored hashes
  const [emailHash, passwordHash] = await Promise.all([
    hashString(email.toLowerCase().trim()),
    hashString(password)
  ]);
  
  if (emailHash === ADMIN_EMAIL_HASH && passwordHash === ADMIN_PASSWORD_HASH) {
    // Success — clear attempt records
    clearAttemptRecord();
    return { success: true };
  }
  
  // Failed — record attempt
  recordFailedAttempt();
  const remaining = getRemainingAttempts();
  
  return {
    success: false,
    error: remaining > 0
      ? `ACCESS DENIED: Invalid credentials. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`
      : `SYSTEM LOCKED: Too many failed attempts. Try again in 5 minutes.`,
    remainingAttempts: remaining
  };
}

// --- Secure Session Management ---
const SESSION_KEY = 'psl_session';
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2-hour session expiry

interface SecureSession {
  user: { id: string; name: string; role: string };
  expiresAt: number;
  fingerprint: string;
}

function generateFingerprint(): string {
  // Simple browser fingerprint for session binding
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ].join('|');
  // Simple hash — not cryptographic, just for binding
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

export function createSecureSession(user: { id: string; name: string; role: string }): void {
  const session: SecureSession = {
    user,
    expiresAt: Date.now() + SESSION_DURATION_MS,
    fingerprint: generateFingerprint()
  };
  // Encode to make it slightly harder to tamper with (not true encryption)
  const encoded = btoa(JSON.stringify(session));
  localStorage.setItem(SESSION_KEY, encoded);
}

export function getSecureSession(): { id: string; name: string; role: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    
    const session: SecureSession = JSON.parse(atob(raw));
    
    // Check expiry
    if (Date.now() > session.expiresAt) {
      destroySession();
      return null;
    }
    
    // Check browser fingerprint matches
    if (session.fingerprint !== generateFingerprint()) {
      destroySession();
      return null;
    }
    
    return session.user;
  } catch {
    // Corrupt or tampered session
    destroySession();
    return null;
  }
}

export function destroySession(): void {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem('psl_login_attempts');
}

export function refreshSession(): void {
  const user = getSecureSession();
  if (user) {
    createSecureSession(user);
  }
}

// --- Input Sanitization ---
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function sanitizeForDisplay(input: string): string {
  // Strip any HTML tags for text that will be rendered
  return input.replace(/<[^>]*>/g, '');
}

// Validate that a string doesn't contain script injection patterns
export function isCleanInput(input: string): boolean {
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,  // onclick=, onerror=, etc.
    /data:\s*text\/html/i,
    /vbscript:/i,
    /expression\s*\(/i
  ];
  return !dangerousPatterns.some(pattern => pattern.test(input));
}
