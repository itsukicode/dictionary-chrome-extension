export interface WordData {
	word: {
		pronounce: string
		audioSrc: string
		def: string
	}
}

export async function fetchWordData(word: string): Promise<WordData> {
	const res = await fetch(`https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?word=${word}`)
	if (!res.ok) {
		throw new Error('Word not found')
	}
	const data: WordData = await res.json()
	return data
}
