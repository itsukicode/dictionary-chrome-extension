import React, {useState, useEffect} from 'react'
import {fetchWordData, WordData} from '../../utils/api'

type WordCardState = 'loading' | 'error' | 'ready'

const WordCard: React.FC<{word: string}> = ({word}) => {
	const [wordData, setWordData] = useState<WordData | null>(null)
	const [wordCardState, setWordCardState] = useState<WordCardState>('loading')
	useEffect(() => {
		fetchWordData(word).then((data) => {
			setWordData(data)
			setWordCardState('ready')
		})
	}, [])

	if (wordCardState === 'loading' || wordCardState === 'error') {
		return <div>{wordCardState === 'loading' ? 'Loading...' : 'Error: could not retrieve word data'}</div>
	}
	return (
		<div>
			<p>{wordData.word.pronounce}</p>
			<p>{wordData.word.def}</p>
			<audio src={wordData.word.audioSrc}></audio>
		</div>
	)
}
export default WordCard
