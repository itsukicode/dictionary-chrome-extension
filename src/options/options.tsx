import React, {useState} from 'react'
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
	Typography,
} from '@material-ui/core'

const App: React.FC<{}> = () => {
	const [lang, setLang] = useState<string>('日本語')
	const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
		setLang(event.target.value as string)
	}
	return (
		<Box mx='10%' my='2%'>
			<Card>
				<CardContent>
					<Grid container direction='column' spacing={4}>
						<Grid item>
							<Typography variant='h4'>Dictionary Extension Options</Typography>
						</Grid>
						<Grid item>
							<FormControl style={{width: '150px'}}>
								<InputLabel id='lang-label'>言語設定</InputLabel>
								<Select
									labelId='lang-label'
									value={lang}
									onChange={handleChange}
								>
									<MenuItem value={'日本語'}>日本語</MenuItem>
									{/* <MenuItem value={'英語'}>英語</MenuItem> */}
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								style={{
									backgroundColor: '#009818',
									color: '#fff',
								}}
								// onClick={handleSaveButtonClick}
								// disabled={isFieldsDisabled}
							>
								保存
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
