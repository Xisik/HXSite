(function () {
    function detectedPlatform() {
        var platform = "";

        if (navigator.userAgentData && navigator.userAgentData.platform) {
            platform = navigator.userAgentData.platform;
        } else if (navigator.platform) {
            platform = navigator.platform;
        }

        var userAgent = navigator.userAgent || "";
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

    var platform = detectedPlatform();

    if (!platform || platform.isWindows) {
        return;
    }

    var button = document.querySelector("[data-download-button]");
    var message = document.querySelector("[data-platform-download-message]");

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
