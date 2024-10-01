async function translateText(text, targetLang) {
  const url = `https://libretranslate.com/translate`;

  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          q: text,
          source: 'en', // Assuming the source is English; change as needed
          target: targetLang,
          format: 'text'
      })
  });

  const data = await response.json();
  return data.translatedText;
}

// Wait for the message box to be available
const messageBox = document.querySelector('div[contenteditable="true"]');

if (messageBox) {
  const sendButton = document.querySelector('button[data-testid="compose-btn-send"]');

  sendButton.addEventListener('click', async () => {
      const preferredLanguage = await new Promise((resolve) => {
          chrome.storage.sync.get('preferredLanguage', (data) => {
              resolve(data.preferredLanguage || 'en'); // Default to English if not set
          });
      });

      const originalMessage = messageBox.innerText;
      const translatedMessage = await translateText(originalMessage, preferredLanguage);
      
      // Set the message box to the translated message
      messageBox.innerText = translatedMessage;

      // Optionally, simulate the send button click if you want to send the translated message
      sendButton.click();
  });
}
