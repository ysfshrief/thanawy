import { db, firebaseReady } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

// ──────────────────────────────────────────────────────────────
//  Unified data store.
//  - When Firebase is configured -> reads/writes Firestore live.
//  - Otherwise -> uses localStorage so the app is fully usable
//    offline / before backend setup (great for the live retreat).
//
//  Public API:
//    store.get(key)            -> latest value (async)
//    store.set(key, value)     -> persist (async)
//    store.subscribe(key, cb)  -> live updates, returns unsubscribe
// ──────────────────────────────────────────────────────────────

const LS_PREFIX = "bedifferent:";

// keys map to single Firestore documents in collection "app"
const DEFAULTS = {
  points: {}, // { teamId: number }
  rankingState: { published: false },
  gallery: [], // [{ id, url, title }]
  hymns: [], // dynamic hymns added by admin
  spiritualWord: { driveUrl: "", note: "" },
  bibleStudy: { driveUrl: "", note: "" },
  teamLogos: {}, // { teamId: driveUrl }
  schedule: null, // custom schedule (null = use built-in seed)
  scheduleState: { hidden: false }, // admin show/hide the schedule
};

function lsGet(key) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    return raw ? JSON.parse(raw) : structuredClone(DEFAULTS[key] ?? null);
  } catch {
    return structuredClone(DEFAULTS[key] ?? null);
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
    // notify same-tab listeners
    window.dispatchEvent(
      new CustomEvent("bd-store", { detail: { key, value } })
    );
  } catch (e) {
    console.error("localStorage write failed", e);
  }
}

export const store = {
  ready: firebaseReady,

  async get(key) {
    if (firebaseReady && db) {
      try {
        const snap = await getDoc(doc(db, "app", key));
        if (snap.exists()) return snap.data().value;
        return structuredClone(DEFAULTS[key] ?? null);
      } catch (e) {
        console.error("Firestore get failed, using local", e);
        return lsGet(key);
      }
    }
    return lsGet(key);
  },

  async set(key, value) {
    if (firebaseReady && db) {
      try {
        await setDoc(doc(db, "app", key), { value, updatedAt: Date.now() });
        return;
      } catch (e) {
        console.error("Firestore set failed, using local", e);
      }
    }
    lsSet(key, value);
  },

  subscribe(key, cb) {
    if (firebaseReady && db) {
      return onSnapshot(
        doc(db, "app", key),
        (snap) => {
          cb(snap.exists() ? snap.data().value : structuredClone(DEFAULTS[key] ?? null));
        },
        (err) => {
          console.error("Firestore subscribe error", err);
          cb(lsGet(key));
        }
      );
    }
    // localStorage mode: emit current + listen for changes
    cb(lsGet(key));
    const handler = (e) => {
      if (e.detail?.key === key) cb(e.detail.value);
    };
    const storageHandler = (e) => {
      if (e.key === LS_PREFIX + key) cb(lsGet(key));
    };
    window.addEventListener("bd-store", handler);
    window.addEventListener("storage", storageHandler);
    return () => {
      window.removeEventListener("bd-store", handler);
      window.removeEventListener("storage", storageHandler);
    };
  },
};
