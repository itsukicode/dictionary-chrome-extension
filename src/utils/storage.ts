export interface LocalStorage {
	words?: string[]
}

export type LocalStorageKey = keyof LocalStorage

export function getStoredWords(): Promise<string[]> {
	const key: LocalStorageKey[] = ['words']
	return new Promise((resolve) => {
		chrome.storage.local.get(key, (res: LocalStorage) => {
			resolve(res.words)
		})
	})
}

export function setStoredWords(words: string[]): Promise<void> {
	const vals: LocalStorage = {words: words}
	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}
