(function () {
    function setupMobileMenu() {
        var toggles = document.querySelectorAll("[data-menu-toggle], .menu-toggle");

        toggles.forEach(function (toggle) {
            var nav = toggle.closest(".site-nav");

            if (!nav) {
                return;
            }

            toggle.addEventListener("click", function () {
                var expanded = toggle.getAttribute("aria-expanded") === "true";
                toggle.setAttribute("aria-expanded", String(!expanded));
                nav.classList.toggle("is-open", !expanded);
            });

            nav.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    toggle.setAttribute("aria-expanded", "false");
                    nav.classList.remove("is-open");
                });
            });
        });
    }

    function detectedPlatform() {
        var navigatorInfo = typeof navigator === "undefined" ? null : navigator;
        var platform = "";

        if (!navigatorInfo) {
            return null;
        }

        if (navigatorInfo.userAgentData && navigatorInfo.userAgentData.platform) {
            platform = navigatorInfo.userAgentData.platform;
        } else if (navigatorInfo.platform) {
            platform = navigatorInfo.platform;
        }

        var userAgent = navigatorInfo.userAgent || "";
        var source = (platform + " " + userAgent).trim();

        if (!source) {
            return null;
        }

        if (/Windows|Win32|Win64|WOW64/i.test(source)) {
            return { isWindows: true, label: "Windows" };
        }

        if (/Android/i.test(source)) {
            return { isWindows: false, label: "Android" };
        }

        if (/iPhone|iPad|iPod/i.test(source)) {
            return { isWindows: false, label: "iOS or iPadOS" };
        }

        if (/Mac/i.test(source)) {
            return { isWindows: false, label: "macOS" };
        }

        if (/Linux/i.test(source)) {
            return { isWindows: false, label: "Linux" };
        }

        return { isWindows: false, label: platform || "this platform" };
    }

    setupMobileMenu();

    var platform = detectedPlatform();
    var button = document.querySelector("[data-download-button]");
    var message = document.querySelector("[data-platform-download-message]");

    if (!platform || platform.isWindows) {
        if (button) {
            button.hidden = false;
        }

        if (message) {
            message.hidden = true;
        }

        return;
    }

    if (button) {
        button.hidden = true;
    }

    if (message) {
        var detail = message.querySelector("span");

        if (detail) {
            detail.textContent = "HXPainter currently supports Windows 10 or later only. Your browser reports " + platform.label + ".";
        }

        message.hidden = false;
    }
}());
