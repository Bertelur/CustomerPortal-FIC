const ENCRYPTION_KEY_NAME = "auth_encryption_key";
const USER_STORAGE_KEY = "user_encrypted";

async function getEncryptionKey(): Promise<CryptoKey> {
  const keyData = localStorage.getItem(ENCRYPTION_KEY_NAME);

  if (keyData) {
    const keyBuffer = Uint8Array.from(JSON.parse(keyData));
    return await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"],
    );
  } else {
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    );

    const exported = await crypto.subtle.exportKey("raw", key);
    localStorage.setItem(
      ENCRYPTION_KEY_NAME,
      JSON.stringify(Array.from(new Uint8Array(exported))),
    );

    return key;
  }
}

async function encryptUserData(data: object): Promise<string> {
  try {
    const key = await getEncryptionKey();
    const dataString = JSON.stringify(data);
    const dataBuffer = new TextEncoder().encode(dataString);

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      dataBuffer,
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error("Encryption failed:", error);
    console.warn("Falling back to unencrypted storage");
    return btoa(JSON.stringify(data));
  }
}

async function decryptUserData(encrypted: string): Promise<object | null> {
  try {
    const key = await getEncryptionKey();

    const combined = Uint8Array.from(
      atob(encrypted),
      (c) => c.charCodeAt(0),
    );

    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData,
    );

    const decryptedString = new TextDecoder().decode(decrypted);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("Decryption failed:", error);

    try {
      const decoded = atob(encrypted);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}

export type User = {
  id?: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
};

export async function getUser(): Promise<User | null> {
  try {
    const encrypted = localStorage.getItem(USER_STORAGE_KEY);
    if (!encrypted) return null;

    const decrypted = await decryptUserData(encrypted);
    return decrypted as User | null;
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
}

export async function setUser(user: User): Promise<void> {
  try {
    const safeUser: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      ...(user.address && typeof user.address === "object"
        ? { address: user.address }
        : {}),
    };

    const encrypted = await encryptUserData(safeUser);
    localStorage.setItem(USER_STORAGE_KEY, encrypted);

    window.dispatchEvent(new Event("auth-change"));
  } catch (error) {
    console.error("Failed to set user:", error);
    throw error;
  }
}

export function clearUser(): void {
  localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-change"));
}

export function isLoggedIn(): boolean {
  return Boolean(localStorage.getItem(USER_STORAGE_KEY));
}
