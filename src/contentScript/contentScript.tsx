import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'
import {
	getStoredWords,
	setStoredWords,
	getStoredLanguageOption,
	WordLanguage
} from '../utils/storage'
import {fetchWordData, WordData} from '../utils/api'
import {VolumeUp as VolumeIcon} from '@material-ui/icons'
import CloseIcon from '@material-ui/icons/Close'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography
} from '@material-ui/core'
import Loader from 'react-loader-spinner'

type SavingState = 'ready' | 'saving'
type WordCardState = 'empty' | 'loading' | 'error' | 'ready'
const App: React.FC<{}> = () => {
	const [wordData, setWordData] = useState<WordData | null>(null)
	const [wordCardState, setWordCardState] = useState<WordCardState>('empty')
	const [wordAudio, setWordAudio] = useState<HTMLAudioElement | null>(null)
	const [selectedWord, setSelectedWord] = useState<string>('')
	const [savingState, setSavingState] = useState<SavingState>('ready')
	const [lang, setLang] = useState<WordLanguage | null>(null)

	useEffect(() => {
		getStoredLanguageOption().then((lang) => setLang(lang))
		window.addEventListener('dblclick', handleSelection)
		return () => {
			window.removeEventListener('dblclick', handleSelection)
		}
	}, [])

	useEffect(() => {
		if (lang != null && selectedWord !== '') {
			fetchWordData(lang, selectedWord)
				.then((data) => {
					const audioSrc = data.word.audioSrc
					data.word.audioSrc = audioSrc.startsWith('https://')
						? audioSrc
						: `https://${audioSrc}`
					console.log('data:', data)
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
	const handleAudioPlayButtonClick = (): void => {
		wordAudio.play()
	}
	const handleCloseButtonClick = (): void => {
		setSelectedWord('')
		setWordCardState('empty')
	}
	const handleSaveButtonClick = (): void => {
		getStoredWords().then((words) => {
			setSavingState('saving')
			setStoredWords([...words, selectedWord]).then(() => {
				setTimeout(() => {
					setSavingState('ready')
				}, 1000)
			})
		})
	}

	const isButtonDisabled = savingState === 'saving'

	if (wordCardState === 'empty') {
		return null
	}

	if (wordCardState === 'loading' || wordCardState === 'error') {
		return (
			<Card elevation={2} className='overlayCard'>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<IconButton onClick={handleCloseButtonClick}>
							<CloseIcon />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container justifyContent='center' alignItems='center'>
					<Grid item>
						<CardContent>
							{wordCardState === 'loading' && (
								<Loader
									type='TailSpin'
									color='#00BFFF'
									height={150}
									width={100}
								/>
							)}
							{wordCardState === 'error' && (
								<Typography color='secondary'>
									{wordData.word.message}
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
						<Grid container alignItems='center' style={{height: '36px'}}>
							<Grid item>
								<Typography style={{fontSize: '20px'}}>
									{selectedWord}
								</Typography>
							</Grid>
							<Grid item>
								<IconButton
									onClick={handleAudioPlayButtonClick}
									style={{padding: '10px'}}
								>
									<VolumeIcon>
										<audio src={wordData.word.audioSrc}></audio>
									</VolumeIcon>
								</IconButton>
							</Grid>
						</Grid>
						<Typography color='textSecondary' style={{marginBottom: '5px'}}>
							{wordData.word.pronounce}
						</Typography>
						<Typography style={{fontSize: '15px'}}>
							{wordData.word.def}
						</Typography>
					</CardContent>
				</Grid>
				<Grid item xs={4}>
					<Grid
						container
						direction='column'
						justifyContent='space-between'
						alignItems='flex-end'
						style={{height: '100%'}}
					>
						<Grid item>
							<IconButton onClick={handleCloseButtonClick}>
								<CloseIcon />
							</IconButton>
						</Grid>
						<Grid item>
							<CardActions>
								<Button
									style={{
										color: '#009818'
									}}
									size='small'
									variant='outlined'
									onClick={handleSaveButtonClick}
									disabled={isButtonDisabled}
								>
									<Typography>
										{savingState === 'ready' ? '保存' : '保存中'}
									</Typography>
								</Button>
							</CardActions>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
