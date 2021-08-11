import {setStoredWords, setStoredLanguageOption} from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
	setStoredWords([])
	setStoredLanguageOption('jp')
})
