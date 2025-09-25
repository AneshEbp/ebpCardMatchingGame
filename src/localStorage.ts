// Functions to interact with local storage
export function saveToLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getItemFromLocalStorage(key: string): string {
  const item: string | null = localStorage.getItem(key);
  if (item != null) {
    return item;
  } else {
    return "";
  }
}

export function removeItemFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
