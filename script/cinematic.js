document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Prepare Signature for Expansion Animation
    const sigText = document.getElementById('loader-sig');
    if (sigText) {
        // Grouping: K | arthick | r | aja
        sigText.innerHTML = `
            <span class="sig-word"><span class="sig-group init-k">K</span><span class="sig-group exp-1">arthick</span></span>
            <span class="sig-word"><span class="sig-group init-r">r</span><span class="sig-group exp-2">aja</span></span>
        `;
        
        // Style these groups for expansion
        gsap.set(".sig-group", { display: "inline-block" });
        gsap.set(".exp-1, .exp-2", { width: 0, opacity: 0, overflow: "hidden", verticalAlign: "bottom" });
    }

    const tl = gsap.timeline();

    // 0. Create Particles for Background
    const particleContainer = document.querySelector(".loader-particles");
    for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = `rgba(191, 149, 63, ${Math.random() * 0.5 + 0.2})`;
        p.style.boxShadow = `0 0 5px rgba(252, 246, 186, 0.5)`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        particleContainer.appendChild(p);
        
        // Ambient floating animation
        gsap.to(p, {
            y: "random(-100, 100)",
            x: "random(-50, 50)",
            opacity: "random(0.1, 0.5)",
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // 1. initials Reveal (K and R)
    gsap.set(".init-k, .init-r", { opacity: 0, y: 10 });
    
    tl.to(".init-k, .init-r", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    })
    // 2. Name Expansion
    .to(".exp-1, .exp-2", {
        width: "auto",
        opacity: 1,
        duration: 1.5,
        ease: "expo.inOut",
        delay: 0.3
    })
    .to(".sig-underline", {
        width: "110%",
        duration: 1.2,
        ease: "power1.inOut"
    }, "-=0.8")
    .to(".sig-tagline", {
        opacity: 1,
        y: -5,
        duration: 1,
        ease: "power2.out"
    }, "-=0.2")
    .to(".loader-line-progress", {
        width: "100%",
        duration: 2.5,
        ease: "power1.inOut"
    }, "-=1")
    .to(".loader-content", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power4.in",
        delay: 0.5
    })
    .to(".panel-left", {
        x: "-100%",
        duration: 1.5,
        ease: "expo.inOut"
    }, "-=0.2")
    .to(".panel-right", {
        x: "100%",
        duration: 1.5,
        ease: "expo.inOut"
    }, "-=1.5")
    .set("#preloader", { display: "none" })

    // 2. Main Content Reveal
    .set("#main-content", { visibility: "visible" })
    .to("#main-content", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .to(".bg-mesh", {
        opacity: 1,
        duration: 2,
        ease: "power2.out"
    }, "-=0.5")

    // 3. Hero Section Staggered Entry
    .from(".desktop-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .from(".detail", {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    }, "-=0.8")
    .from(".profile-picture", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    }, "-=1.5")
    .from(".profile button", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.6");
});
