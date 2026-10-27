const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");
const year = document.getElementById("year");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("open");
    menuBtn.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
    });
});

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

document.addEventListener("mousemove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, .skill-card, .project-card").forEach(element => {
    element.addEventListener("click", () => {
        element.style.transform = "scale(0.96)";

        setTimeout(() => {
            element.style.transform = "";
        }, 120);
    });
});

document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -5;
        const rotateY = ((x / rect.width) - 0.5) * 5;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

document.querySelectorAll(".primary-btn, .secondary-btn, .outline-btn, .contact-action").forEach(button => {
    button.addEventListener("click", event => {
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();

        ripple.style.position = "absolute";
        ripple.style.width = "10px";
        ripple.style.height = "10px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,0.45)";
        ripple.style.left = `${event.clientX - rect.left - 5}px`;
        ripple.style.top = `${event.clientY - rect.top - 5}px`;
        ripple.style.pointerEvents = "none";
        ripple.style.animation = "rippleEffect 0.6s linear";

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const style = document.createElement("style");

style.innerHTML = `
@keyframes rippleEffect {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(25);
        opacity: 0;
    }
}
`;

document.head.appendChild(style);

year.textContent = new Date().getFullYear();

const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach(link => {
    link.addEventListener("click", () => {
        const message = encodeURIComponent(
            "Hello Ameer Hamza, I would like to know more about your web development services."
        );

        link.href = `https://wa.me/923718101756?text=${message}`;
    });
});
