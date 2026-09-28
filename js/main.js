import { policies } from './data/policies-data.js';
import { PoliciesRenderer } from './modules/PoliciesRenderer.js';
import { ThemeManager } from './modules/ThemeManager.js';
import { HeroBackground3D } from './modules/HeroBackground3D.js';
import { ScrollAnimations } from './modules/ScrollAnimations.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Tema Oscuro/Claro
    const themeManager = new ThemeManager();
    themeManager.init();

    // 2. Renderizar Políticas desde los datos
    const policiesRenderer = new PoliciesRenderer('policies-container', policies);
    policiesRenderer.render();

    // 3. Inicializar Fondo Interactivo en 3D
    const background = new HeroBackground3D('hero-background');
    background.init();

    // 4. Inicializar Animaciones de Scroll con GSAP
    const animations = new ScrollAnimations();
    animations.init();
});