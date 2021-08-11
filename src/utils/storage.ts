export interface LocalStorage {
	words?: string[]
	option?: LocalStorageOption
}
export type WordLanguage = 'jp' | 'en'
export interface LocalStorageOption {
	lang?: WordLanguage
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

export function getStoredOption(): Promise<LocalStorageOption> {
	const key: LocalStorageKey[] = ['option']
	return new Promise((resolve) => {
		chrome.storage.local.get(key, (res: LocalStorage) => {
			resolve(res.option)
		})
	})
}

export function setStoredOption(option: LocalStorageOption): Promise<void> {
	const vals: LocalStorage = {option: option}
	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}
