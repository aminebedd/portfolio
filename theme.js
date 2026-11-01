// Dark by default; the visitor's choice is remembered.
(function () {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    document.documentElement.setAttribute('data-theme', saved === 'light' ? 'light' : 'dark');

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
        });
    });
})();
