export function getUserId(): string {
  const storageKey = 'userId';
  let userId = localStorage.getItem(storageKey);
  
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(storageKey, userId);
  }
  
  return userId;
}
