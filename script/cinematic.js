document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Prepare Signature Text for Animation
    const sigText = document.getElementById('loader-sig');
    if (sigText) {
        const letters = sigText.innerText.split("");
        sigText.innerHTML = letters.map(char => `<span class='sig-char' style='display:inline-block; opacity:0; transform:translateY(10px)'>${char === " " ? "&nbsp;" : char}</span>`).join("");
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

    // 1. Luxury Signature Reveal
    gsap.set(".signature-text", { opacity: 1 });
    tl.to(".sig-char", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    })
    .to(".sig-underline", {
        width: "120%",
        duration: 1.2,
        ease: "power1.inOut"
    }, "-=0.5")
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
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.8")
    .from(".name", {
        opacity: 0,
        x: -20,
        duration: 1.5,
        ease: "power2.out"
    }, "-=0.6")
    .from(".detail-para", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .from(".profile button", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.8")
    .from(".profile-picture", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    }, "-=1.2");

    // Optional: Mouse Parallax for Hero Image
    document.addEventListener("mousemove", (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        gsap.to(".profile-picture", {
            rotationY: mouseX * 10,
            rotationX: -mouseY * 10,
            duration: 1,
            ease: "power2.out"
        });
    });
});
