export function getItem(key) {
  if (!key || typeof(key) != 'string') {
    return;
  }

  return JSON.parse(localStorage.getItem(key));
}

export function setItem(key, value) {
  if (!key || typeof(key) != 'string') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value ?? null));
}

export function removeItem(key) {
  if (!key || typeof(key) != 'string') {
    return;
  }

  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}