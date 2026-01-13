document.addEventListener('DOMContentLoaded', () => {
    // --- Mouse Tracking System ---
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
