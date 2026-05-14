
document.addEventListener("DOMContentLoaded", () => {

    // 1. BOOT SEQUENCE
    const bootScreen = document.getElementById('boot-screen');
    const lines = [
        document.getElementById('boot-1'),
        document.getElementById('boot-2'),
        document.getElementById('boot-3'),
        document.getElementById('boot-4')
    ];

    let delay = 0;
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, delay);
        delay += 600;
    });

    setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 1000);
    }, delay + 500);

    // 2. STAR PARTICLES
    const starsContainer = document.getElementById('stars-container');
    const numStars = 100;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        // Random position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        // Random size (1px to 3px)
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        // Random animation duration (2s to 6s)
        star.style.animationDuration = `${Math.random() * 4 + 2}s`;
        // Random opacity
        star.style.opacity = Math.random();

        fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);

    // 3. NAVIGATION (Smooth scroll & active state)
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navBtns.forEach(btn => btn.classList.remove('active'));
                const activeBtn = document.querySelector(`.nav-btn[data-target="${entry.target.id}"]`);
                if (activeBtn) activeBtn.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));

    // 4. SKILLS ANIMATION
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-progress');
                bar.style.width = targetWidth;
                observer.unobserve(bar); // Animate only once
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        skillsObserver.observe(bar);
    });

    // 5. AI ANALYSIS TYPEWRITER EFFECT
    const aiRawText = `INITIATING SUBJECT ANALYSIS...

<span class="ai-label">IDENTIFIER:</span>      DANIEL DAVID HENRIQUEZ JULIO
<span class="ai-label">ROLE:</span>            FULL STACK ENGINEER · CTO
<span class="ai-label">LOCATION:</span>        CARTAGENA, COLOMBIA (REMOTE-READY)
<span class="ai-label">STACK:</span>           NEXT.JS · NESTJS · REACT · DJANGO · POSTGRESQL
<span class="ai-label">EDUCATION:</span>       SYSTEMS ENGINEERING – TECNOLÓGICO COMFENALCO
<span class="ai-label">DEGREE:</span>          SOFTWARE DEVELOPMENT TECHNOLOGIST (GRADUATED)

CORE COMPETENCIES:
<div class="ai-divider">────────────────────────────────────────────────</div>
→ End-to-end SaaS architect: from DB design to production deploy
→ Multi-tenant platform builder (auth, billing, real-time features)
→ API design specialist: REST, WebSockets, queue-based architectures
→ AI-augmented development workflows & autonomous coding pipelines
→ Product-minded engineer: ships fast, iterates with user data

ACTIVE DEPLOYMENTS:
<div class="ai-divider">────────────────────────────────────────────────</div>
<span class="ai-label">FE VIVA</span>       Live faith-tech platform · CTO & Lead Engineer
<span class="ai-label">            </span>  Next.js · Prisma · PostgreSQL · Real-time dashboards
<span class="ai-label">ALDEOR</span>        Multi-tenant restaurant SaaS · Enterprise-grade
<span class="ai-label">            </span>  NestJS · Redis · BullMQ · DIAN e-invoicing
<span class="ai-label">HASSLEFREEPAY</span> Fintech digital wallet · Multi-bank aggregation
<span class="ai-label">            </span>  React · Django · Belvo API · Colombia banking

ASSESSMENT: HIGH-IMPACT FULL STACK ENGINEER
<div class="ai-divider">────────────────────────────────────────────────</div>
SHIPS PRODUCTION CODE · LEADS TECHNICAL TEAMS
BUILDS ZERO-TO-ONE PRODUCTS · STARTUP-READY OPERATOR
CLEARANCE: ALPHA-1 ████████ GRANTED`;

    const aiLines = aiRawText.split('\n');
    const aiContainer = document.querySelector('.ai-content');
    let typingStarted = false;

    const typeWriter = async () => {
        for (let i = 0; i < aiLines.length; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.innerHTML = aiLines[i] || '<br>'; // Preserve empty lines
            aiContainer.appendChild(lineDiv);

            // Delay between lines (quicker for empty lines)
            await new Promise(r => setTimeout(r, aiLines[i] ? 150 : 50));
        }
    };

    const aiSectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !typingStarted) {
            typingStarted = true;
            typeWriter();
        }
    }, { threshold: 0.5 });

    aiSectionObserver.observe(document.getElementById('about'));

    // 6. CONTACT FORM — EMAILJS INTEGRATION
    const EMAILJS_SERVICE_ID = 'service_hcnhe9a';
    const EMAILJS_TEMPLATE_ID = 'template_kp46jo8';   // ← Reemplaza con tu Template ID de EmailJS
    const EMAILJS_PUBLIC_KEY = 'UHQYUBnQuE5mR52ar';      // ← Reemplaza con tu Public Key de EmailJS

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const form = document.getElementById('comm-form');
    const formMsg = document.getElementById('form-msg');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // UX: disable button & show sending state
        submitBtn.style.opacity = '0.5';
        submitBtn.disabled = true;
        formMsg.style.color = "var(--cyan)";
        formMsg.style.opacity = '1';
        formMsg.innerText = "SIGNAL ACQUIRED...";

        setTimeout(() => {
            formMsg.innerText = "ENCODING PAYLOAD...";

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                .then(() => {
                    formMsg.style.color = "#00ff88";
                    formMsg.innerText = "TRANSMISSION SUCCESSFUL ✓";
                    form.reset();

                    setTimeout(() => {
                        formMsg.style.opacity = '0';
                        submitBtn.style.opacity = '1';
                        submitBtn.disabled = false;
                    }, 3000);
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    formMsg.style.color = "#ff4444";
                    formMsg.innerText = "TRANSMISSION FAILED ✗";

                    setTimeout(() => {
                        formMsg.style.opacity = '0';
                        submitBtn.style.opacity = '1';
                        submitBtn.disabled = false;
                    }, 3000);
                });
        }, 800);
    });

});

