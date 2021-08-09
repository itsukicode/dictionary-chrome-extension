import {setStoredWords} from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
	setStoredWords(['食物', '心'])
})
