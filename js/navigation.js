class Navigation {
    constructor() {
        this.currentMenuIndex = 0;
        this.menuItems = [];
        this.currentScreen = 'main';
        this.history = ['main'];
        this.setupKeyListeners();
    }

    setupKeyListeners() {
        // Physical button clicks
        document.querySelectorAll('.key').forEach(key => {
            key.addEventListener('click', (e) => {
                e.preventDefault();
                const keyType = key.dataset.key;
                this.handleKeyPress(keyType);
            });
        });
    }

    handleKeyPress(keyType) {
        switch(keyType) {
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
            case 'back':
                this.goBack();
                break;
            case 'right':
            case 'hire':
                this.sendHireEmail();
            case 'select':
                this.selectCurrent();
                break;
            case 'menu':
                this.showMainMenu();
                break;
            case 'options':
                this.showOptions();
                break;
        }
    }

    moveUp() {
        if (this.currentMenuIndex > 0) {
            this.currentMenuIndex--;
            this.highlightCurrentItem();
        }
    }

    moveDown() {
        if (this.currentMenuIndex < this.menuItems.length - 1) {
            this.currentMenuIndex++;
            this.highlightCurrentItem();
        }
    }

    selectCurrent() {
        const selectedItem = this.menuItems[this.currentMenuIndex];
        if (selectedItem) {
            const screenId = selectedItem.dataset.id;
            App.showScreen(screenId);
        }
    }

    goBack() {
        if (this.history.length > 1) {
            this.history.pop();
            const previousScreen = this.history[this.history.length - 1];
            App.showScreen(previousScreen);
        }
    }

    showMainMenu() {
        App.showMainMenu();
    }

    updateMenuItems() {
        this.menuItems = document.querySelectorAll('.menu-item');
        this.currentMenuIndex = 0;
        this.highlightCurrentItem();
    }

    highlightCurrentItem() {
        this.menuItems.forEach((item, index) => {
            item.classList.toggle('selected', index === this.currentMenuIndex);
        });
    }

    sendHireEmail() {
    const subject = "Interview Request - Full Stack Developer Position";
    const body = `Dear Thoriso,

I came across your portfolio and would like to discuss potential opportunities with our team. Could you please let me know your availability for an interview?

Looking forward to your response.

Best regards,`;

    const mailtoLink = `mailto:thoriso2motaung@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}}