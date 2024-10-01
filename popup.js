document.getElementById('save').addEventListener('click', () => {
  const selectedLanguage = document.getElementById('language').value;

  chrome.storage.sync.set({ preferredLanguage: selectedLanguage }, () => {
      document.getElementById('message').innerText = 'Settings saved successfully!';
      setTimeout(() => {
          document.getElementById('message').innerText = '';
      }, 3000);
  });
});

// Load the saved language on popup open
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('preferredLanguage', (data) => {
      if (data.preferredLanguage) {
          document.getElementById('language').value = data.preferredLanguage;
      }
  });
});
