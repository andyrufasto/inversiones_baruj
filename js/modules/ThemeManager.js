export class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.themeBtns = document.querySelectorAll('.theme-toggle');
        this.themeIcons = document.querySelectorAll('.theme-icon');
    }

    init() {
        this.updateIcon(); 

        this.themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.html.classList.toggle('dark');
                this.updateIcon();
            });
        });
    }

    updateIcon() {
        const isDark = this.html.classList.contains('dark');
        this.themeIcons.forEach(icon => {
            icon.className = isDark ? 'theme-icon fa-solid fa-sun' : 'theme-icon fa-solid fa-moon';
        });
    }
}