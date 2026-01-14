document.addEventListener('DOMContentLoaded', () => {
    // --- Mouse Tracking System ---
    // Only enable custom cursor and mouse glow on devices with a fine pointer (mouse)
    const isDesktop = window.matchMedia("(pointer: fine)").matches;

    if (isDesktop) {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        const mouseGlow = document.getElementById('mouse-glow');

        // Only run if elements exist (safety check)
        if (cursorDot && cursorOutline && mouseGlow) {
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });

                mouseGlow.style.left = `${posX}px`;
                mouseGlow.style.top = `${posY}px`;
            });

            const interactiveElements = document.querySelectorAll('a, button, .card, input, textarea');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.borderColor = 'var(--accent-color)';
                    mouseGlow.style.opacity = '0.3';
                });
                el.addEventListener('mouseleave', () => {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.borderColor = 'var(--accent-glow)';
                    mouseGlow.style.opacity = '0.15';
                });
            });
        }
    } else {
        // Hide these elements on mobile/touch devices to be safe
        const elementsToHide = document.querySelectorAll('[data-cursor-dot], [data-cursor-outline], #mouse-glow');
        elementsToHide.forEach(el => {
            if (el) el.style.display = 'none';
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');

            // Toggle Icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinksContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- Active Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
