
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navDropdown = document.getElementById('nav-dropdown');

    hamburgerMenu.addEventListener('click', function () {
        navDropdown.classList.toggle('active');
    });
});

document.querySelector('form').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        e.preventDefault(); // Prevent form submission
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
// Add this to your existing JavaScript

const navigationSystem = {
    currentScreen: 'main',
    currentIndex: 0,
    history: ['main'],
    menuItems: [],

    init() {
        this.updateMenuItems();
        this.highlightCurrentItem();
    },

    updateMenuItems() {
        this.menuItems = document.querySelectorAll('.menu-item');
    },

    highlightCurrentItem() {
        this.menuItems.forEach((item, index) => {
            if (index === this.currentIndex) {
                item.classList.add('menu-item-selected');
            } else {
                item.classList.remove('menu-item-selected');
            }
        });
    },

    navigate(direction) {
        switch(direction) {
            case 'up':
                this.currentIndex = Math.max(0, this.currentIndex - 1);
                break;
            case 'down':
                this.currentIndex = Math.min(this.menuItems.length - 1, this.currentIndex + 1);
                break;
            case 'select':
                this.menuItems[this.currentIndex]?.click();
                break;
        }
        this.highlightCurrentItem();
    },

    goBack() {
        if (this.history.length > 1) {
            this.history.pop();
            const previousScreen = this.history[this.history.length - 1];
            this.showScreen(previousScreen);
        }
    },

    addToHistory(screen) {
        this.history.push(screen);
        this.currentScreen = screen;
        this.currentIndex = 0;
    }
};
