import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'
import {getStoredWords, setStoredWords} from '../utils/storage'
import {fetchWordData, WordData} from '../utils/api'
import {VolumeUp as VolumeIcon} from '@material-ui/icons'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core'
import Loader from 'react-loader-spinner'

type WordCardState = 'empty' | 'loading' | 'error' | 'ready'
const App: React.FC<{}> = () => {
	const [wordData, setWordData] = useState<WordData | null>(null)
	const [wordCardState, setWordCardState] = useState<WordCardState>('empty')
	const [wordAudio, setWordAudio] = useState<HTMLAudioElement | null>(null)
	const [selectedWord, setSelectedWord] = useState<string>('')
	useEffect(() => {
		window.addEventListener('dblclick', handleSelection)
		return () => {
			window.removeEventListener('dblclick', handleSelection)
		}
	}, [])

	useEffect(() => {
		if (selectedWord !== '') {
			console.log(selectedWord)
			fetchWordData(selectedWord)
				.then((data) => {
					setWordData(data)
					setWordAudio(new Audio(data.word.audioSrc))
					setWordCardState('ready')
				})
				.catch((err) => {
					setWordCardState('error')
				})
		}
	}, [selectedWord])

	const handleSelection = (): void => {
		setSelectedWord(window.getSelection().toString())
		setWordCardState('loading')
	}
	const handleAudioPlay = (): void => {
		wordAudio.play()
	}

	if (wordCardState === 'empty') {
		return null
	}

	if (wordCardState === 'loading' || wordCardState === 'error') {
		return (
			<Card elevation={2} className='overlayCard'>
				<Grid container justifyContent='center' alignItems='center'>
					<Grid item>
						<CardContent>
							{wordCardState === 'loading' && (
								<Loader
									type='TailSpin'
									color='#00BFFF'
									height={80}
									width={80}
								/>
							)}
							{wordCardState === 'error' && (
								<Typography color='secondary'>
									Error: could not retrieve word data
								</Typography>
							)}
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		)
	}

	return (
		<Card elevation={2} className='overlayCard'>
			<Grid container>
				<Grid item xs={8}>
					<CardContent>
						<Grid className='wordCard-wrap' container alignItems='center'>
							<Grid item>
								<Typography className='wordCard-word'>
									{selectedWord}
								</Typography>
							</Grid>
							<Grid item>
								<IconButton onClick={handleAudioPlay}>
									<VolumeIcon>
										<audio src={wordData.word.audioSrc}></audio>
									</VolumeIcon>
								</IconButton>
							</Grid>
						</Grid>
						<Typography className='wordCard-pronounce' color='textSecondary'>
							{wordData.word.pronounce}
						</Typography>
						<Typography className='wordCard-def'>
							{wordData.word.def}
						</Typography>
					</CardContent>
				</Grid>
				<Grid item xs={4} alignItems='flex-end'>
					<CardActions>
						<Button
							color='secondary'
							size='small'
							variant='outlined'
							// onClick={}
						>
							<Typography className='wordCard-delete'>保存</Typography>
						</Button>
					</CardActions>
				</Grid>
			</Grid>
		</Card>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
