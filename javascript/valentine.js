 const flowerColors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093', '#C71585'];
        const flowerTypes = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'];

        function createFlower() {
            const flower = document.createElement('div');
            flower.className = 'flower';
            
            // Random flower type and color
            const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            
            flower.textContent = flowerType;
            flower.style.color = flowerColor;
            flower.style.left = Math.random() * 100 + '%';
            
            // Random duration between 4-7 seconds
            const duration = 4 + Math.random() * 3;
            flower.style.animationDuration = duration + 's';
            
            document.body.appendChild(flower);
            
            // Remove flower after falling + staying time
            setTimeout(() => {
                flower.style.animation = 'fadeOut 1s forwards';
                setTimeout(() => {
                    flower.remove();
                }, 1000);
            }, (duration * 1000) + 10000); // Falls + stays 10 seconds
        }

        // Create flowers at intervals
        setInterval(createFlower, 500);
        
        // Create initial flowers
        for (let i = 0; i < 5; i++) {
            setTimeout(createFlower, i * 300);
        }

           // Run Away No Button Function
      // Run Away No Button Function
// Run Away No Button Function - FIXED to stay within screen
        function runAwayNo(button) {
            // Get current button size
            const currentWidth = button.offsetWidth;
            const currentHeight = button.offsetHeight;
            
            // Calculate new smaller size (reduce by 20% each click)
            const newWidth = currentWidth * 0.8;
            const newHeight = currentHeight * 0.8;
            
            // If button is too small, make it disappear
            if (newWidth < 20 || newHeight < 20) {
                button.style.opacity = '0';
                setTimeout(() => {
                    button.style.display = 'none';
                }, 300);
                return;
            }
            
            // Set new size
            button.style.width = newWidth + 'px';
            button.style.height = newHeight + 'px';
            button.style.fontSize = (newHeight * 0.4) + 'px';
            
            // Make button position fixed to move anywhere on screen
            button.style.position = 'fixed';
            
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calculate safe boundaries (button stays fully visible)
            const margin = 10;
            const maxX = viewportWidth - newWidth - margin;
            const maxY = viewportHeight - newHeight - margin;
            
            // Calculate random position within safe boundaries
            const randomX = Math.max(margin, Math.random() * maxX);
            const randomY = Math.max(margin, Math.random() * maxY);
            
            // Apply the new position
            button.style.left = randomX + 'px';
            button.style.top = randomY + 'px';
        }

        // Create floating hearts on page load
        function createFloatingHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = '💕';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '50%';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }

        // Create sparkles on page load
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = '✨';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }

        // Trigger cute effects on page load
        window.addEventListener('load', function() {
            // Create initial hearts
            setTimeout(() => createFloatingHeart(), 1000);
            setTimeout(() => createFloatingHeart(), 1200);
            setTimeout(() => createFloatingHeart(), 1400);
            
            // Create sparkles around the page
            for (let i = 0; i < 8; i++) {
                setTimeout(() => createSparkle(), 1000 + (i * 200));
            }
        });

         // Celebrate function when YES is clicked
        function celebrate() {
            const main = document.querySelector('main');
            const celebrationScreen = document.getElementById('celebrationScreen');
            
            // Blur background
            main.classList.add('blurred');
            
            // Show celebration screen
            celebrationScreen.classList.add('active');
            
            // Create confetti
            createConfetti();
            
            // Create celebration hearts
            for (let i = 0; i < 20; i++) {
                setTimeout(() => createCelebrationHeart(), i * 100);
            }
        }

        function proceedNext() {
            window.location.href = '/html/mainpage.html'; // Change this to your next page
        }