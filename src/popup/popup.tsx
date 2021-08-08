import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import WordCard from '../components/WordCard'
import {getStoredWords} from '../utils/storage'

const App: React.FC<{}> = () => {
	const [words, setWords] = useState<string[]>([])

	useEffect(() => {
		getStoredWords().then((words) => setWords(words))
	}, [])

	return (
		<>
			{words.map((word, index) => (
				<WordCard key={index} word={word} />
			))}
		</>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
