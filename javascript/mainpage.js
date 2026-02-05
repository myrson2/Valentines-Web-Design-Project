document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Navigation Logic
    new SlidingNav();
    // 2. Initialize Carousel Logic
    new FocusScaleCarousel();
});

/* --- SLIDING NAVIGATION CLASS --- */
class SlidingNav {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.slider = document.getElementById('slider');
        this.homeBtn = document.getElementById('homeBtn');
        this.isManualScrolling = false;
        
        this.sections = [
            document.querySelector('#header'),
            document.querySelector('#section-1'),
            document.querySelector('#section-2'),
            document.querySelector('#section-3')
        ];

        this.init();
    }

    init() {
        this.updateUI(0); // Start at Home

        // Nav Item Click
        this.navItems.forEach((item, index) => {
            item.closest('a').addEventListener('click', () => {
                this.isManualScrolling = true;
                this.updateUI(index + 1);
                setTimeout(() => { this.isManualScrolling = false; }, 800);
            });
        });

        // Home Button Click
        this.homeBtn.closest('a').addEventListener('click', () => {
            this.isManualScrolling = true;
            this.updateUI(0);
            setTimeout(() => { this.isManualScrolling = false; }, 800);
        });

        // Scroll Observer
        const observer = new IntersectionObserver((entries) => {
            if (this.isManualScrolling) return;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = this.sections.indexOf(entry.target);
                    if (index !== -1) this.updateUI(index);
                }
            });
        }, { threshold: 0.3 }); // Lower threshold for better mobile detection

        this.sections.forEach(sec => sec && observer.observe(sec));
        window.addEventListener('resize', () => this.refreshSlider());
    }

    updateUI(index) {
        if (index === 0) {
            this.homeBtn.classList.add('active');
            this.slider.classList.add('hidden');
            this.navItems.forEach(item => item.classList.remove('active'));
        } else {
            this.homeBtn.classList.remove('active');
            this.slider.classList.remove('hidden');
            this.navItems.forEach(item => item.classList.remove('active'));
            
            const activeIndex = index - 1;
            const activeItem = this.navItems[activeIndex];
            if(activeItem) {
                activeItem.classList.add('active');
                this.slider.style.width = `${activeItem.offsetWidth}px`;
                this.slider.style.left = `${activeItem.offsetLeft + 5}px`; // Use left instead of transform for simplicity
            }
        }
    }

    refreshSlider() {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            this.slider.style.width = `${activeItem.offsetWidth}px`;
            this.slider.style.left = `${activeItem.offsetLeft}px`;
        }
    }
}

/* --- CAROUSEL CLASS --- */
class FocusScaleCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.init();
    }

    init() {
        this.updateCarousel();
        this.prevBtn.addEventListener('click', () => this.move(-1));
        this.nextBtn.addEventListener('click', () => this.move(1));
        
        // Add Dots
        const indicators = document.querySelector('.carousel-indicators');
        this.slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = i === 0 ? 'indicator active' : 'indicator';
            dot.addEventListener('click', () => {
                this.currentIndex = i;
                this.updateCarousel();
            });
            indicators.appendChild(dot);
        });
    }

    move(direction) {
        this.currentIndex = (this.currentIndex + direction + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    updateCarousel() {
        // Remove Classes
        this.slides.forEach(slide => {
            slide.classList.remove('prev', 'active', 'next');
            slide.style.zIndex = '0';
        });

        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;

        // Add Classes
        this.slides[prevIndex].classList.add('prev');
        this.slides[this.currentIndex].classList.add('active');
        this.slides[nextIndex].classList.add('next');

        // Update Dots
        const dots = document.querySelectorAll('.indicator');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }
}   