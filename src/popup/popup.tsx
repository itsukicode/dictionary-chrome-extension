import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import WordCard from '../components/WordCard'
import {getStoredWords} from '../utils/storage'
import {Box} from '@material-ui/core'

const App: React.FC<{}> = () => {
	const [words, setWords] = useState<string[]>([])

	useEffect(() => {
		getStoredWords().then((words) => setWords(words))
	}, [])

	return (
		<Box mx='8px' my='16px'>
			{words.map((word, index) => (
				<WordCard key={index} word={word} />
			))}
		</Box>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
