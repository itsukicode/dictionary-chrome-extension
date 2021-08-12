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
	Typography
} from '@material-ui/core'
import Loader from 'react-loader-spinner'
import {WordLanguage} from '../../utils/storage'

type Props = {
	word: string
	lang: WordLanguage
	onDelete: () => void
}
type WordCardState = 'loading' | 'error' | 'ready'

const WordCard: React.FC<Props> = ({word, lang, onDelete}) => {
	const [wordData, setWordData] = useState<WordData | null>(null)
	const [wordCardState, setWordCardState] = useState<WordCardState>('loading')
	const [wordAudio, setWordAudio] = useState<HTMLAudioElement | null>(null)

	useEffect(() => {
		fetchWordData(lang, word)
			.then((data) => {
				const audioSrc = data.word.audioSrc
				data.word.audioSrc = audioSrc.startsWith('https://')
					? audioSrc
					: `https://${audioSrc}`
				setWordData(data)
				setWordAudio(new Audio(data.word.audioSrc))
				setWordCardState('ready')
			})
			.catch((err) => {
				setWordCardState('error')
			})
	}, [])

	const handleAudioPlayButtonClick = (): void => {
		wordAudio.play()
	}

	if (wordCardState === 'loading' || wordCardState === 'error') {
		return (
			<Box my={'16px'}>
				<Card elevation={2}>
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
										データの取得に失敗しました。
									</Typography>
								)}
							</CardContent>
						</Grid>
					</Grid>
				</Card>
			</Box>
		)
	}
	return (
		<Box my={'16px'}>
			<Card elevation={2}>
				<Grid container>
					<Grid item xs={9}>
						<CardContent>
							<Grid container alignItems='center' style={{height: '40px'}}>
								<Grid item>
									<Typography style={{fontSize: '24px'}}>{word}</Typography>
								</Grid>
								<Grid item>
									<IconButton onClick={handleAudioPlayButtonClick}>
										<VolumeIcon>
											<audio src={wordData.word.audioSrc}></audio>
										</VolumeIcon>
									</IconButton>
								</Grid>
							</Grid>
							<Typography
								color='textSecondary'
								style={{fontSize: '10px', marginBottom: '10px'}}
							>
								{wordData.word.pronounce}
							</Typography>
							<Typography style={{fontSize: '12px'}}>
								{wordData.word.def}
							</Typography>
						</CardContent>
					</Grid>
					<Grid item xs={3} alignItems='flex-end'>
						<CardActions style={{padding: '0px', paddingTop: '10px'}}>
							<Button
								color='secondary'
								size='small'
								variant='outlined'
								onClick={onDelete}
							>
								<Typography style={{fontSize: '16px'}}>消去</Typography>
							</Button>
						</CardActions>
					</Grid>
				</Grid>
			</Card>
		</Box>
	)
}
export default WordCard
