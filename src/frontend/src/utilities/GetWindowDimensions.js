import { useSyncExternalStore } from "react";

const store = {
  size: {
    height: undefined,
    width: undefined,
  },
};

export default function GetWindowDimensions() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  if (
    store.size.height !== window.innerHeight ||
    store.size.width !== window.innerWidth
  ) {
    store.size = { height: window.innerHeight, width: window.innerWidth };
  }
  return store.size;
}
