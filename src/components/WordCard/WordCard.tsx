import React, {useState, useEffect} from 'react'
import {fetchWordData, WordData} from '../../utils/api'
import {VolumeUp as VolumeIcon} from '@material-ui/icons'
import {
	Button,
	Box,
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core'
import './WordCard.css'
import Loader from 'react-loader-spinner'

type WordCardState = 'loading' | 'error' | 'ready'

const WordCard: React.FC<{word: string}> = ({word}) => {
	const [wordData, setWordData] = useState<WordData | null>(null)
	const [wordCardState, setWordCardState] = useState<WordCardState>('loading')
	const [wordAudio, setWordAudio] = useState<HTMLAudioElement | null>(null)
	useEffect(() => {
		fetchWordData(word)
			.then((data) => {
				setWordData(data)
				setWordAudio(new Audio(data.word.audioSrc))
				setWordCardState('ready')
			})
			.catch((err) => {
				setWordCardState('error')
			})
	}, [])

	const handleAudioPlay = (): void => {
		wordAudio.play()
	}

	if (wordCardState === 'loading' || wordCardState === 'error') {
		return (
			<Card elevation={2}>
				<Grid container justify='center' alignItems='center'>
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
		<Card elevation={2}>
			<Grid container>
				<Grid item xs={8}>
					<CardContent>
						<Grid className='wordCard-wrap' container alignItems='center'>
							<Grid item>
								<Typography className='wordCard-word'>{word}</Typography>
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
						<Button color='secondary' size='small' variant='outlined'>
							<Typography className='wordCard-delete'>消去</Typography>
						</Button>
					</CardActions>
				</Grid>
			</Grid>
		</Card>
	)
}
export default WordCard
