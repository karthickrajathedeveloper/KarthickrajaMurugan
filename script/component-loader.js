/**
 * Component Loader Script
 * Dynamically loads header and footer HTML components.
 */

async function loadComponent(elementId, componentPath) {
    const placeholder = document.getElementById(elementId);
    if (!placeholder) {
        console.warn(`Placeholder [${elementId}] not found in DOM.`);
        return false;
    }

    try {
        // Fetch the component with no-cache to ensure latest version
        const response = await fetch(componentPath, { cache: 'no-cache' });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        placeholder.innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Failed to load component [${componentPath}]:`, error);
        
        // Check if running via file protocol
        if (window.location.protocol === 'file:') {
            placeholder.innerHTML = `
                <div style="background: #ff5e69; color: white; padding: 20px; text-align: center; font-family: sans-serif; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;">
                    <strong>Security Error:</strong> Browser blocks loading components when opening HTML files directly.<br>
                    Please use a <strong>Local Server</strong> (e.g., VS Code Live Server) to view the site correctly.
                </div>
            `;
        } else {
            placeholder.innerHTML = `
                <div style="text-align: center; padding: 20px; color: red;">
                    Error loading ${componentPath}. Please check if the file exists at the correct path.
                </div>
            `;
        }
        return false;
    }
}

async function initLayout() {
    console.log("Initializing layout components...");
    
    // Use relative paths
    const headerLoaded = await loadComponent('header-placeholder', 'components/header.html');
    const footerLoaded = await loadComponent('footer-placeholder', 'components/footer.html');

    if (headerLoaded) {
        console.log("Header loaded successfully.");
        
        // 1. Highlight active navigation link
        const currentPath = window.location.pathname;
        let currentPage = currentPath.split("/").pop() || 'index.html';
        if (currentPage === '') currentPage = 'index.html';

        const navLinks = document.querySelectorAll('.header, .header2, .footer');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });

        // 2. Initialize header-specific events (defined in script.js)
        if (typeof initHeaderEvents === 'function') {
            initHeaderEvents();
        }

        // 3. Trigger GSAP animation if cinematic.js is loaded
        if (window.gsap && document.querySelector(".desktop-header")) {
            gsap.from(".desktop-header", {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }
    } else {
        console.error("Header failed to load.");
    }
}

// Start loading
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initLayout();
} else {
    document.addEventListener('DOMContentLoaded', initLayout);
}
