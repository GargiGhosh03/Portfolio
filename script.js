
// ---- CUSTOM AI-LIKE CURSOR ----
 const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);
cursor.style.position = "fixed";
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.border = "2px solid #60a5fa";
cursor.style.borderRadius = "50%";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = 1000;
cursor.style.transition = "transform 0.2s ease";
cursor.style.transform = "translate(-50%, -50%)";
cursor.style.boxShadow = "0 0 8px #60a5fa";

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
    cursor.style.boxShadow = "0 0 15px #3b82f6, 0 0 25px #60a5fa";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.boxShadow = "0 0 8px #60a5fa";
  });
});

// ---- TEXT SCRAMBLER FOR LOGO ----
  class TextScrambler {
    constructor(el, finalText, loop = true) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.finalText = finalText;
      this.frame = 0;
      this.queue = [];
      this.loop = loop;
      this.update = this.update.bind(this);
      this.start();
    }

    start() {
      this.init();
    }

    init() {
      const text = this.finalText;
      this.queue = [];

      for (let i = 0; i < text.length; i++) {
        const from = "";
        const to = text[i];
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 60); // ⬅ slows down transition
        this.queue.push({ from, to, start, end, char: "" });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
    }

    update() {
      let output = "";
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.2) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span style="opacity:0.6;">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        if (this.loop) {
          setTimeout(() => this.init(), 2500); // ⬅ loop delay after complete
        }
        return;
      }

      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("logo");
    new TextScrambler(el, "GARGI GHOSH", true); 
  });

  // Optional: Regenerate every few seconds for randomness
  setInterval(() => {
    textContainer.innerText = generateHackString();
  }, 8000);


 // Background effect 
  const canvas = document.getElementById("bouncing-ball-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 18,
    dx: 3,
    dy: 2.5,
    color: "rgba(0, 255, 229, 0.3)",
    glow: "#00ffe5"
  };

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = ball.glow;
    ctx.fill();
    ctx.closePath();
  }

  function update() {
    // Clear canvas using transparency for trails, without dark background
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = "rgba(0, 0, 0, 0.92)"; // keep trails but clear slowly
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx *= -1;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy *= -1;
    }

    drawBall();
    requestAnimationFrame(update);
  }

  update();

//Navigation Bar
 const hamburger = document.getElementById("hamburger");
  const extraMenu = document.getElementById("extraMenu");

  hamburger.addEventListener("click", () => {
    extraMenu.style.display = extraMenu.style.display === "block" ? "none" : "block";
  });

// About Me Box
  document.addEventListener('DOMContentLoaded', () => {
  const aboutBox = document.createElement('div');
  aboutBox.className = 'about-box';

  aboutBox.innerHTML = `
    <div class="window-bar">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <p>
      An organized and motivated student specializing in Artificial Intelligence and Machine Learning (AIML) with a
 strong foundation in creative solutions and problem solving. Passionate about advancing technology, I have explored
 cutting-edge topics such as Large Language Models (LLMs), Natural Language Processing (NLP), Deep Learning
 (DL), and Machine Learning. With a proactive attitude and a collaborative mindset, I am eager to contribute to innovative
 research and real-world applications that make a meaningful impact. I aim to leverage my technical expertise and
 curiosity to solve complex challenges and drive progress in computer science.
    </p>
  `;

  document.getElementById('about-box-container').appendChild(aboutBox);
});
  
// Project Section
const projectCards = document.querySelectorAll('.project-card');
let currentIndex = 0;

function updateCards() {
  projectCards.forEach((card, i) => {
    card.classList.remove('active', 'left', 'right');
    card.style.opacity = 0;
  });

  const total = projectCards.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  projectCards[prevIndex].classList.add('left');
  projectCards[prevIndex].style.opacity = 0.7;

  projectCards[currentIndex].classList.add('active');
  projectCards[currentIndex].style.opacity = 1;

  projectCards[nextIndex].classList.add('right');
  projectCards[nextIndex].style.opacity = 0.7;

  currentIndex = (currentIndex + 1) % total;
}

setInterval(updateCards, 2000);
updateCards();

// Skill Cards Animation text
document.querySelectorAll('.cyberpunk-box').forEach(box => {
  box.addEventListener('click', () => {
    box.style.transition = 'box-shadow 0.1s ease';
    box.style.boxShadow = '0 0 40px #00ffff, 0 0 70px #00ffff, inset 0 0 30px #00ffff';
    setTimeout(() => {
      box.style.boxShadow = '';
    }, 150);
  });
});

// Skill Cards Animation Box
 const skillCards = document.querySelectorAll('.skill-card');
const container = document.querySelector('.skills-grid');
const columns = 4;
const spacingX = 160;
const spacingY = 180;

function stackCards() {
  const centerX = container.clientWidth / 2;
  const centerY = container.clientHeight / 2;

  skillCards.forEach((card, index) => {
    card.style.position = 'absolute';
    card.style.left = `${centerX - 70}px`;
    card.style.top = `${centerY - 70}px`;
    card.style.zIndex = skillCards.length - index;
    card.style.opacity = '1';
    card.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
  });
}

function shuffleCards() {
  skillCards.forEach((card, index) => {
    const shuffleX = (Math.random() - 0.5) * 20;
    const shuffleY = (Math.random() - 0.5) * 20;

    card.animate([
      { transform: card.style.transform },
      { transform: `translate(${shuffleX}px, ${shuffleY}px) rotate(${Math.random() * 20 - 10}deg)` },
      { transform: card.style.transform }
    ], {
      duration: 400,
      delay: index * 50,
      easing: 'ease-in-out',
    });
  });
}

function spreadCards() {
  skillCards.forEach((card, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const targetX = col * spacingX;
    const targetY = row * spacingY;

    card.animate([
      {
        left: card.style.left,
        top: card.style.top,
        opacity: 1
      },
      {
        left: `${targetX}px`,
        top: `${targetY}px`,
        opacity: 1
      }
    ], {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards',
      delay: 400 + index * 200
    });
    setTimeout(() => {
      card.style.left = `${targetX}px`;
      card.style.top = `${targetY}px`;
    }, 400 + index * 200 + 1000);
  });
}

function runAnimationLoop() {
  stackCards();

  setTimeout(() => {
    shuffleCards();

    setTimeout(() => {
      spreadCards();
      setTimeout(runAnimationLoop, 10000); // spread duration + delay + wait
    }, 600);
  }, 400);
}

window.addEventListener('load', runAnimationLoop);


  // Publication 
 const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  setInterval(showNextSlide, 5000);

  document.querySelectorAll('.stars-bg').forEach(canvas => {
  const ctx = canvas.getContext('2d');
  let stars = [], w, h, mouseX = 0, mouseY = 0;

  function init() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.2 + 0.05
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate() {
    stars.forEach(star => {
      const dx = (mouseX - w / 2) * star.speed * 0.05;
      const dy = (mouseY - h / 2) * star.speed * 0.05;
      star.x += dx;
      star.y += dy;

      // Wrap around screen edges
      if (star.x < 0) star.x = w;
      if (star.x > w) star.x = 0;
      if (star.y < 0) star.y = h;
      if (star.y > h) star.y = 0;
    });
    draw();
    requestAnimationFrame(animate);
  }

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', init);
  init();
  animate();
});

// Contact Form
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    this.reset();
    alert("Message sent successfully! (This is a mock submission.)");
  });

