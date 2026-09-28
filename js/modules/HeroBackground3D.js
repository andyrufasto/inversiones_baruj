export class HeroBackground3D {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isMobile = window.innerWidth < 768;
        this.particlesCount = this.isMobile ? 25 : 80;
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particlesGroup = null;
        this.particlesData = [];
        this.clock = null;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentRotX = 0;
        this.currentRotY = 0;
        
        // Exponemos la velocidad globalmente para que GSAP pueda animarla
        window.hero3DSpeed = 1;
        this.isVisible = true;
    }

    init() {
        if (!this.container || !window.THREE) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.z = 400; 
        this.camera.position.y = 20;

        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.pointerEvents = 'none'; 
        this.container.appendChild(this.renderer.domElement);

        const icons = ['fa-bolt', 'fa-droplet', 'fa-paint-roller', 'fa-layer-group', 'fa-fan', 'fa-helmet-safety'];
        this.particlesGroup = new THREE.Group();

        for (let i = 0; i < this.particlesCount; i++) {
            const el = document.createElement('i');
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            el.className = `fa-solid ${randomIcon} text-4xl text-brand-cerulean absolute drop-shadow-[0_0_8px_rgba(37,150,190,0.8)]`;
            el.style.opacity = 0.15 + Math.random() * 0.5;

            const object = new THREE.CSS3DObject(el);
            object.position.x = (Math.random() - 0.5) * 1000;
            object.position.y = (Math.random() - 0.5) * 800;
            object.position.z = (Math.random() - 0.5) * 1000;
            
            object.rotation.y = Math.random() * Math.PI * 2;
            object.rotation.z = (Math.random() - 0.5) * 0.5;

            this.particlesGroup.add(object);
            this.particlesData.push({
                object: object,
                baseX: object.position.x,
                baseY: object.position.y,
                rotSpeed: (Math.random() - 0.5) * 0.02
            });
        }

        this.scene.add(this.particlesGroup);
        this.clock = new THREE.Clock();

        this.addEventListeners();
        this.tick();
    }

    addEventListeners() {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        if (!this.prefersReducedMotion && !this.isMobile) {
            document.addEventListener('mousemove', (event) => {
                this.mouseX = (event.clientX - windowHalfX);
                this.mouseY = (event.clientY - windowHalfY);
            });
        }

        const observer = new IntersectionObserver((entries) => {
            this.isVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        
        const inicioSection = document.getElementById('inicio');
        if(inicioSection) observer.observe(inicioSection);

        window.addEventListener('resize', () => {
            if(!this.camera || !this.renderer) return;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    tick = () => {
        if (!this.isVisible) {
            requestAnimationFrame(this.tick);
            return; 
        }

        const elapsedTime = this.clock.getElapsedTime() * window.hero3DSpeed;
        const currentScroll = window.scrollY; 

        if (!this.prefersReducedMotion) {
            this.particlesData.forEach(p => {
                p.object.position.y = p.baseY + Math.sin(elapsedTime * 0.5 + p.baseX * 0.02) * 20;
                p.object.rotation.y += p.rotSpeed * window.hero3DSpeed; 
            });

            let targetX = this.mouseX * 0.001;
            let targetY = this.mouseY * 0.001;
            this.currentRotX += (targetY - this.currentRotX) * 0.05;
            this.currentRotY += (targetX - this.currentRotY) * 0.05;

            this.particlesGroup.rotation.x = this.currentRotX;
            this.particlesGroup.rotation.y = elapsedTime * 0.05 + currentScroll * 0.001 + this.currentRotY;
            
            this.camera.position.x += (this.mouseX * 0.1 - this.camera.position.x) * 0.05;
            this.camera.position.y += (-this.mouseY * 0.1 - this.camera.position.y + 20 - currentScroll * 0.05) * 0.05;
        }
        
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.tick);
    }
}