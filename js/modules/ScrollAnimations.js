export class ScrollAnimations {
    init() {
        if (!window.gsap) return;

        gsap.registerPlugin(ScrollTrigger);

        this.initRevealAnimations();
        this.initServiceSVGAnimations();
        this.initCardInteractions();
        this.initHeaderScroll();
    }

    initRevealAnimations() {
        gsap.utils.toArray('.gs-reveal-up').forEach(elem => {
            gsap.fromTo(elem, { y: 60, opacity: 0 }, { scrollTrigger: { trigger: elem, start: "top 85%" }, y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
        });
        gsap.utils.toArray('.gs-reveal-left').forEach(elem => {
            gsap.fromTo(elem, { x: -60, opacity: 0 }, { scrollTrigger: { trigger: elem, start: "top 80%" }, x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
        });
        gsap.utils.toArray('.gs-reveal-right').forEach(elem => {
            gsap.fromTo(elem, { x: 60, opacity: 0 }, { scrollTrigger: { trigger: elem, start: "top 80%" }, x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
        });

        gsap.fromTo('.gs-stagger-card', { y: 50, opacity: 0 }, { scrollTrigger: { trigger: ".gs-stagger-card", start: "top 75%" }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" });
        gsap.fromTo('.gs-stagger-value', { scale: 0.9, opacity: 0 }, { scrollTrigger: { trigger: ".gs-stagger-value", start: "top 85%" }, scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" });
        gsap.fromTo('.gs-stagger-policy', { y: 30, opacity: 0 }, { scrollTrigger: { trigger: "#politicas", start: "top 75%" }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" });
    }

    initServiceSVGAnimations() {
        const tlElectricidad = gsap.timeline({ scrollTrigger: { trigger: ".trigger-electricidad", start: "top 80%" } });
        tlElectricidad.to('.svg-anim-filament', { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
                      .to('.svg-anim-glow', { opacity: 0.8, duration: 0.5, ease: "power2.out" }, "-=0.5");

        const tlGasfiteria = gsap.timeline({ scrollTrigger: { trigger: ".trigger-gasfiteria", start: "top 80%" } });
        tlGasfiteria.to('.svg-anim-pipe', { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" })
                    .to('.svg-anim-drop', { opacity: 1, y: 10, duration: 0.5, yoyo: true, repeat: 3 }, "-=0.2");

        const tlPintura = gsap.timeline({ scrollTrigger: { trigger: ".trigger-pintura", start: "top 80%" } });
        tlPintura.fromTo('.svg-anim-brush', 
            { x: 10, y: 50, rotation: -20 },
            { x: 90, y: 50, rotation: 20, duration: 1.5, ease: "power2.inOut" }, 0
        ).to('.svg-anim-paint', { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0);

        const tlDrywall = gsap.timeline({ scrollTrigger: { trigger: ".trigger-drywall", start: "top 80%" } });
        tlDrywall.to('.svg-anim-panel', { opacity: 1, y: -5, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" });

        const tlAC = gsap.timeline({ scrollTrigger: { trigger: ".trigger-ac", start: "top 80%" } });
        tlAC.to('.svg-anim-ac-led', { opacity: 1, duration: 0.3 })
            .fromTo('.svg-anim-wind', 
                { x: -10, opacity: 0 }, 
                { x: 10, opacity: 0.8, duration: 1.2, stagger: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true }
            );
    }

    initCardInteractions() {
        const serviceCards = document.querySelectorAll('.trigger-service');
        serviceCards.forEach(card => {
            const iconWrapper = card.querySelector('.icon-3d-wrapper');
            if(!iconWrapper) return;

            gsap.to(iconWrapper, {
                y: -10,
                rotationZ: (Math.random() - 0.5) * 4,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            card.addEventListener('mouseenter', () => {
                gsap.to(window, { hero3DSpeed: 0.1, duration: 0.5 });
                gsap.to('#hero-background', { opacity: 0.3, duration: 0.5 }); 
                
                gsap.killTweensOf(iconWrapper, "rotationX,rotationY,scale");
                gsap.to(iconWrapper, {
                    rotationY: 25,
                    rotationX: -15,
                    scale: 1.15,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(window, { hero3DSpeed: 1, duration: 0.5 }); 
                gsap.to('#hero-background', { opacity: 1, duration: 0.5 });
                
                gsap.killTweensOf(iconWrapper, "rotationX,rotationY,scale");
                gsap.to(iconWrapper, {
                    rotationY: 0,
                    rotationX: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    initHeaderScroll() {
        const header = document.getElementById('header');
        if(!header) return;

        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                header.classList.add('shadow-md', 'border-b', 'border-brand-textLight/10', 'dark:border-brand-bone/10');
            } else {
                header.classList.remove('shadow-md', 'border-b', 'border-brand-textLight/10', 'dark:border-brand-bone/10');
            }
        });
    }
}