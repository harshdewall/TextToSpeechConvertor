// Get references to HTML elements
const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const downloadButton = document.getElementById('downloadButton');
const accentSelect = document.getElementById('accentSelect');
const rateSlider = document.getElementById('rate');
const pitchSlider = document.getElementById('pitch');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');

// Populate the accent select options dynamically
let voices = [];
function populateVoices() {
    voices = speechSynthesis.getVoices();
    accentSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = voice.name + ' (' + voice.lang + ')';
        accentSelect.appendChild(option);
    });
}

// Initialize voices when they are loaded
speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();

// Update the rate and pitch values as the sliders change
rateSlider.addEventListener('input', () => {
    rateValue.textContent = rateSlider.value;
});
pitchSlider.addEventListener('input', () => {
    pitchValue.textContent = pitchSlider.value;
});

// Function to speak the input text
function speakText() {
    const text = textInput.value;
    if (text === '') {
        alert('Please enter some text!');
        return;
    }

    const selectedVoice = voices[accentSelect.value];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = parseFloat(rateSlider.value);
    utterance.pitch = parseFloat(pitchSlider.value);

    speechSynthesis.speak(utterance);
}

// Function to download the speech as an audio file
function downloadSpeech() {
    const text = textInput.value;
    if (text === '') {
        alert('Please enter some text!');
        return;
    }

    const selectedVoice = voices[accentSelect.value];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = parseFloat(rateSlider.value);
    utterance.pitch = parseFloat(pitchSlider.value);

    // Create a temporary SpeechSynthesisUtterance to record audio (this requires a backend service)
    // Unfortunately, Web APIs don't support saving audio directly to file for download without a backend.
    alert('Download functionality is not fully implemented as Web Speech API does not provide direct audio file saving.');
}

// Event listeners for buttons
speakButton.addEventListener('click', speakText);
downloadButton.addEventListener('click', downloadSpeech);
