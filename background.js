chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ sourceLang: 'en', targetLang: 'en' });
    console.log('Default language set to English.');
  });
  