import {WordLanguage} from './storage'
export interface WordData {
	word: {
		pronounce: string
		audioSrc: string
		def: string
		message: string
	}
}

export async function fetchWordData(
	lang: WordLanguage,
	word: string
): Promise<WordData> {
	const res = await fetch(
		`https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?lang=${lang}&word=${word}`
	)
	if (!res.ok) {
		throw new Error('データの取得に失敗しました。')
	}
	const data: WordData = await res.json()
	return data
}
