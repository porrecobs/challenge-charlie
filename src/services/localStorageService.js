export const getItem = (key) => {
  if (!key || typeof(key) != 'string') {
    return;
  }

  return JSON.parse(localStorage.getItem(key));
}

export const setItem = (key, value) => {
  if (!key || typeof(key) != 'string') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value ?? null));
}

export const removeItem = (key) => {
  if (!key || typeof(key) != 'string') {
    return;
  }

  localStorage.removeItem(key);
}

export const clearStorage = () => {
  localStorage.clear();
}