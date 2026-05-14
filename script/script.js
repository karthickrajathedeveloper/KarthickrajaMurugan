// Global initialization function for header events
// This is called by component-loader.js after the header is dynamically loaded
function initHeaderEvents() {
    const threeBar = document.getElementById("three-bar");
    const close = document.getElementById("close");
    const mobiledropDown = document.getElementById("mobile-drop-down");

    if (threeBar && close && mobiledropDown) {
        threeBar.addEventListener("click", () => {
            threeBar.style.display = "none";
            close.style.display = "block";
            mobiledropDown.style.display = "flex"; // Changed to flex for mobile menu
        });
        close.addEventListener("click", () => {
            threeBar.style.display = "block";
            close.style.display = "none";
            mobiledropDown.style.display = "none";
        });
    }

    // Add click event for dock items to handle active state
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            dockItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Re-initialize dark mode icons after header load
    initDarkMode();

    // Start clock
    startClock();
}

// Real-time clock functionality
function startClock() {
    const clockDesktop = document.getElementById('header-clock-desktop');
    const clockMobile = document.getElementById('header-clock-mobile');
    
    // Dock clock elements
    const dockTime = document.getElementById('dock-time');
    const dockDate = document.getElementById('dock-date');

    function update() {
        const now = new Date();
        
        // Format for Dock Time: 03:03 PM
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        
        // Format for Dock Date: Thu, May 14, 2026
        const dateOptions = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);

        // General clock format for mobile
        const generalOptions = { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true };
        const generalString = now.toLocaleString('en-US', generalOptions).replace(/,/g, '');
        
        if (dockTime) dockTime.textContent = timeString;
        if (dockDate) dockDate.textContent = dateString;
        
        if (clockDesktop) clockDesktop.textContent = generalString;
        if (clockMobile) clockMobile.textContent = generalString;
    }

    update();
    setInterval(update, 1000);
}

// Darkmode logic
function initDarkMode() {
    const moonIcons = document.querySelectorAll(".moon");
    const sunIcons = document.querySelectorAll(".sun");
    let Isdark = JSON.parse(localStorage.getItem('theme')) ?? false;

    const updateUI = (isDark) => {
        if (isDark) {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
        }

        moonIcons.forEach((moon, idx) => {
            moon.style.display = isDark ? 'none' : 'block';
            if (sunIcons[idx]) sunIcons[idx].style.display = isDark ? 'block' : 'none';
        });
    };

    // Initial setup
    updateUI(Isdark);

    moonIcons.forEach((moon, idx) => {
        moon.addEventListener('click', () => {
            Isdark = true;
            localStorage.setItem('theme', true);
            updateUI(true);
        });
    });

    sunIcons.forEach((sun, idx) => {
        sun.addEventListener('click', () => {
            Isdark = false;
            localStorage.setItem('theme', false);
            updateUI(false);
        });
    });
}

// Initialize components that don't depend on dynamic header
document.addEventListener('DOMContentLoaded', () => {
    // FAQ
    let max = document.querySelectorAll(".max");
    let min = document.querySelectorAll(".min");
    let answer = document.querySelectorAll(".answer");

    max.forEach((element, index) => {
        element.addEventListener("click", () => {
            element.style.display = "none";
            min[index].style.display = "block";
            answer[index].style.display = "block";
        });
    });

    min.forEach((element, index) => {
        element.addEventListener("click", () => {
            max[index].style.display = "block";
            element.style.display = "none";
            answer[index].style.display = "none";
        });
    });

    // Project Filter
    const filterButtons = document.querySelectorAll(".post-filter");
    const filterItems = document.querySelectorAll(".post-box");

    filterButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;

            filterItems.forEach(item => {
                if (filter == 'all') {
                    item.style.display = 'block';
                } else {
                    const boxfilter = item.dataset.item;
                    item.style.display = (filter == boxfilter) ? 'block' : 'none';
                }
            });
        });
    });

    // Scroll to Top
    const toTop = document.querySelector(".top");
    if (toTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                toTop.classList.add("active");
            } else {
                toTop.classList.remove("active");
            }
        });
    }

    // WhatsApp Redirection
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const phoneNumber = "916380528683";

            const whatsappMessage = `*Hi, I'm ${name}*%0A%0A` +
                `*Email:* ${email}%0A` +
                `*Subject:* ${subject}%0A` +
                `*Message:* ${message}`;

            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});
