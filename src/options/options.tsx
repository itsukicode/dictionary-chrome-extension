import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from '@material-ui/core'
import {
	setStoredWords,
	getStoredLanguageOption,
	setStoredLanguageOption,
	WordLanguage
} from '../utils/storage'

type SavingState = 'ready' | 'saving'
const App: React.FC<{}> = () => {
	const [lang, setLang] = useState<WordLanguage | null>(null)
	const [prevLang, setPrevLang] = useState<WordLanguage | null>(null)
	const [savingState, setSavingState] = useState<SavingState>('ready')

	useEffect(() => {
		getStoredLanguageOption().then((lang) => {
			setLang(lang)
			setPrevLang(lang)
		})
	}, [])

	const handleChange = (e: React.ChangeEvent<{value: unknown}>) => {
		setPrevLang((lang) => lang)
		setLang(e.target.value as WordLanguage)
	}
	const handleSaveButtonClick = () => {
		setSavingState('saving')
		setStoredWords([]).then(() => {
			setStoredLanguageOption(lang).then(() => {
				setTimeout(() => {
					setPrevLang(lang)
					setSavingState('ready')
				}, 1000)
			})
		})
	}
	if (!lang) {
		return null
	}

	const isButtonDisabled = savingState === 'saving' || lang === prevLang

	return (
		<Box mx='10%' my='2%'>
			<Card>
				<CardContent>
					<Grid container direction='column' spacing={4}>
						<Grid item>
							<Typography variant='h4'>Options</Typography>
						</Grid>
						<Grid item>
							<FormControl style={{width: '150px'}}>
								<InputLabel id='lang-label'>言語設定</InputLabel>
								<Select
									labelId='lang-label'
									value={lang}
									onChange={handleChange}
								>
									<MenuItem value={'jp'}>日本語</MenuItem>
									<MenuItem value={'en'}>英語</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								style={{
									backgroundColor: '#009818',
									color: '#fff'
								}}
								onClick={handleSaveButtonClick}
								disabled={isButtonDisabled}
							>
								{savingState === 'ready' ? '保存' : '保存中'}
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
