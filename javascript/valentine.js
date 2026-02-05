
// --- NAVIGATION WITH SIMPLE TRANSITION ---
function proceedNext() {
    // 1. Add the CSS class to the body to start the animation
    document.body.classList.add('fade-out-exit');

    // 2. Wait for 1000ms (1 second) matching the CSS transition time
    setTimeout(() => {
        window.location.href = '/html/mainpage.html';
    }, 1000);
}
// --- CONFIGURATION ---
const flowerTypes = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'];
const flowerColors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093'];
const confettiColors = ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32', '#FF4500'];

// --- RUN AWAY BUTTON LOGIC ---
function runAwayNo(button) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = button.offsetWidth;
    const btnHeight = button.offsetHeight;
    const maxX = windowWidth - btnWidth - 50;
    const maxY = windowHeight - btnHeight - 50;
    const randomX = Math.max(0, Math.random() * maxX);
    const randomY = Math.max(0, Math.random() * maxY);

    button.style.position = 'fixed';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

// --- CELEBRATION LOGIC ---
function celebrate() {
    const celebrationScreen = document.getElementById('celebrationScreen');
    celebrationScreen.classList.add('active');

    // Create lots of confetti and hearts
    const confettiInterval = setInterval(createConfetti, 30);
    const heartInterval = setInterval(createCelebrationHeart, 100);

    // Stop creating after 5 seconds
    setTimeout(() => {
        clearInterval(confettiInterval);
        clearInterval(heartInterval);
    }, 5000);
}

// --- 1. FALLING CONFETTI (Falls OFF Screen) ---
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Properties
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.width = '1px';
    confetti.style.height = '1px';
    confetti.style.borderRadius = '50%';
    
    // Animation
    const duration = Math.random() * 2 + 2; // 2-4 seconds
    confetti.style.animation = `fallOffScreen ${duration}s linear forwards`;

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), duration * 1000);
}

// --- 2. FALLING HEARTS (Falls OFF Screen) ---
function createCelebrationHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-fall';
    heart.textContent = '💖';
    
    // Properties
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    
    // Animation
    const duration = Math.random() * 2 + 3; // 3-5 seconds
    heart.style.animation = `fallOffScreen ${duration}s linear forwards`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}

// --- 3. BACKGROUND FLOWERS (Falls and STAYS at bottom) ---
function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    flower.style.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    flower.style.left = Math.random() * 95 + 'vw'; // Avoid extreme edges
    
    // Animation
    // We calculate fall time, then wait 10 seconds before removing
    const fallDuration = Math.random() * 3 + 4; // 4-7 seconds to fall
    flower.style.animation = `fallAndSit ${fallDuration}s linear forwards`;

    document.body.appendChild(flower);

    // Logic to remove it after it sits for 10 seconds
    const totalLife = (fallDuration * 1000) + 10000;
    
    setTimeout(() => {
        flower.style.transition = "opacity 1s ease";
        flower.style.opacity = "0";
        setTimeout(() => flower.remove(), 1000);
    }, totalLife);
}

// Start creating background flowers immediately
setInterval(createFlower, 300);

// --- NAVIGATION ---
function proceedNext() {
    window.location.href = '/html/mainpage.html';
}