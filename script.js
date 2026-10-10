var menuIcon = document.getElementById("menuIcon");
var menu = document.getElementById("menu");

if (menuIcon && menu) {
    menuIcon.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("active");
        });
    });
}

/* PROJECT FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function (card) {
            const category = card.getAttribute("data-category");

            if (filter === "all" || filter === category) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

/* DARK / LIGHT MODE */

(function () {
    const themeButton = document.getElementById("themeToggle");

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    } catch (error) {
        savedTheme = "dark";
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.body.classList.toggle("dark-theme", isDark);
        document.body.classList.toggle("light-mode", !isDark);

        if (themeButton) {
            themeButton.innerHTML = isDark
                ? '<i class="ri-moon-line" aria-hidden="true"></i>'
                : '<i class="ri-sun-line" aria-hidden="true"></i>';

            themeButton.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeButton.setAttribute("aria-pressed", String(isDark));
            themeButton.title = isDark ? "Switch to light mode" : "Switch to dark mode";
        }
    }

    applyTheme(savedTheme);

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            const isDark = !document.body.classList.contains("light-mode");
            const nextTheme = isDark ? "light" : "dark";

            applyTheme(nextTheme);

            try {
                localStorage.setItem("portfolio-theme", nextTheme);
            } catch (error) {
                // Theme will still work until the page is refreshed.
            }
        });
    }
})();

/* SCROLL AND HEADING ANIMATIONS */

(function () {
    const headings = document.querySelectorAll(
        "section h1, section h2, section h3, .projects-heading, .contact-heading"
    );

    const revealItems = document.querySelectorAll(
        ".home-left, .home-right, .about .a-left, .a-card, .skill-box, .tools-box, .project-card, .contact-info, .contact-form, .contact-item"
    );

    headings.forEach(function (heading) {
        heading.classList.add("heading-reveal");
    });

    revealItems.forEach(function (item) {
        item.classList.add("reveal-on-scroll");
    });

    if (!("IntersectionObserver" in window)) {
        headings.forEach(function (item) {
            item.classList.add("is-visible");
        });

        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });

        return;
    }

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
        function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    headings.forEach(function (item) {
        observer.observe(item);
    });

    revealItems.forEach(function (item, index) {
        item.style.transitionDelay = (index % 4) * 80 + "ms";
        observer.observe(item);
    });
})();