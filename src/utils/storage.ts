export interface LocalStorage {
	words?: string[]
	lang?:  WordLanguage
}
export type WordLanguage = 'jp' | 'en'

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

export function getStoredLanguageOption(): Promise<WordLanguage> {
	const key: LocalStorageKey[] = ['lang']
	return new Promise((resolve) => {
		chrome.storage.local.get(key, (res: LocalStorage) => {
			resolve(res.lang)
		})
	})
}

export function setStoredLanguageOption(lang: WordLanguage): Promise<void> {
	const vals: LocalStorage = {lang: lang}
	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}
