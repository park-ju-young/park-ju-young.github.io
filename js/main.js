/* ==========================================================
   Park Ju Young Portfolio v2
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initHeader();
    initSmoothScroll();
    initProjectFilter();
    initCounter();
    initReveal();
    initCursor();
    initGSAP();

});


/* ==========================================================
   Theme
========================================================== */

function initTheme() {

    const btn = document.querySelector(".theme-btn");

    if (!btn) return;

    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
        document.body.classList.add("dark");
    }

    btn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );

    });

}


/* ==========================================================
   Header
========================================================== */

function initHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* ==========================================================
   Smooth Scroll
========================================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const href = link.getAttribute("href");

            if (href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* ==========================================================
   Project Filter
========================================================== */

function initProjectFilter() {

    const buttons = document.querySelectorAll(".project-filter button");

    const cards = document.querySelectorAll(".project-card");

    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {

                if (
                    filter === "all" ||
                    card.classList.contains(filter)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

}


/* ==========================================================
   Counter
========================================================== */

function initCounter() {

    const items = document.querySelectorAll("[data-count]");

    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;

            const target = Number(el.dataset.count);

            let value = 0;

            const step = Math.max(1, Math.ceil(target / 40));

            const timer = setInterval(() => {

                value += step;

                if (value >= target) {

                    value = target;

                    clearInterval(timer);

                }

                el.textContent = value + "+";

            }, 25);

            observer.unobserve(el);

        });

    });

    items.forEach(item => observer.observe(item));

}

/* ==========================================================
   Reveal Animation 
========================================================== */
function initReveal() {
    // GSAP과 중복되는 .project-card, .timeline-item, .skill-card 제거
    const targets = document.querySelectorAll(
        ".about-grid, .stats article, .contact-box"
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    targets.forEach(target => {
        observer.observe(target);
    });
}


/* ==========================================================
   Custom Cursor
========================================================== */

function initCursor() {

    const cursor = document.querySelector(".cursor");

    if (!cursor) return;

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            cursor.classList.add("active");
            cursor.textContent = "VIEW";

        });

        card.addEventListener("mouseleave", () => {

            cursor.classList.remove("active");
            cursor.textContent = "";

        });

    });

}


/* ==========================================================
   Loading
========================================================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    loader.classList.add("hide");

    setTimeout(() => {

        loader.remove();

    }, 600);

});

/* ==========================================================
   GSAP Animation (수정된 버전)
========================================================== */
function initGSAP() {
    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero 섹션
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
        gsap.from(heroTitle, {
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: "power3.out"
        });
    }

    const heroText = document.querySelector(".hero p");
    if (heroText) {
        gsap.from(heroText, {
            opacity: 0,
            y: 40,
            delay: .25,
            duration: 1,
            ease: "power3.out"
        });
    }

    // Project Card
    document.querySelectorAll(".project-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 95%", // 트리거 시작 지점을 더 아래로 변경 (더 일찍 감지)
                once: true        // 한 번 실행된 후 고정
            },
            opacity: 0,
            y: 60,
            duration: .8,
            ease: "power2.out"
        });
    });

    // Timeline Item
    document.querySelectorAll(".timeline-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 95%",
                once: true
            },
            opacity: 0,
            x: -40,
            duration: .8
        });
    });

    // Skill Card (이 부분 수정)
    document.querySelectorAll(".skill-card").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 95%", // 시작 지점 수정
                once: true
            },
            opacity: 0,
            y: 40,
            duration: .7
        });
    });
}

// ⚠️ 로딩 완료 후 ScrollTrigger 스크롤 위치 재계산
window.addEventListener("load", () => {
    if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
    }
});