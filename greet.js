const greetings = [
  "Hello", "Bonjour", "Hola", "Ciao", "こんにちは", "안녕하세요",
  "你好", "Olá", "Guten Tag", "नमस्ते", "Salam", "Hej", "สวัสดี", "Halo"
];

let greetIndex = 0;
const greetSpan = document.querySelector(".greeting");


// Robot greeting animation
greetSpan.textContent = greetings[greetIndex];
setInterval(() => {
  greetIndex = (greetIndex + 1) % greetings.length;
  greetSpan.textContent = greetings[greetIndex];
}, 500); 

const robot = document.getElementById('robot-chatbot');
const chatBubble = document.getElementById('chat-bubble');
const welcomeText = " Thanks for visiting my portfolio. Please feel free to explore and connect.";

function getFemaleVoice() {
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      const femaleVoices = voices.filter(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.toLowerCase().includes('female') ||
           v.name.toLowerCase().includes('woman') ||
           v.name.toLowerCase().includes('zira') ||
           v.name.toLowerCase().includes('samantha') ||
           v.name.toLowerCase().includes('google us english'))
      );
      resolve(femaleVoices[0] || voices[0]);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        const femaleVoices = voices.filter(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('female') ||
             v.name.toLowerCase().includes('woman') ||
             v.name.toLowerCase().includes('zira') ||
             v.name.toLowerCase().includes('samantha') ||
             v.name.toLowerCase().includes('google us english'))
        );
        resolve(femaleVoices[0] || voices[0]);
      };
    }
  });
}

robot.addEventListener('click', async () => {
  if (chatBubble.classList.contains('visible')) {
    // Hide bubble and stop speaking
    chatBubble.classList.remove('visible');
    chatBubble.classList.add('hidden');
    window.speechSynthesis.cancel();
  } else {
    chatBubble.classList.remove('hidden');
    chatBubble.classList.add('visible');
    chatBubble.textContent = "";

    const voice = await getFemaleVoice();

    let index = 0;
    const speed = 40; // typing speed in ms

    const msg = new SpeechSynthesisUtterance(welcomeText);
    msg.voice = voice;
    msg.lang = 'en-US';
    msg.rate = 1;

    msg.onend = () => {
      clearInterval(typingInterval);
      chatBubble.textContent = welcomeText;
      setTimeout(() => {
        chatBubble.classList.remove('visible');
        chatBubble.classList.add('hidden');
      }, 4000);
    };

    window.speechSynthesis.speak(msg);

    const typingInterval = setInterval(() => {
      if (index < welcomeText.length) {
        chatBubble.textContent += welcomeText.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
  }
});

