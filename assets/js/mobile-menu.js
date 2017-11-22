document.getElementById('mobile-toc-toggle').addEventListener('click', function() {
    document.body.classList.toggle('mobile-toc-visible');
});

const tocLinks = document.querySelectorAll('.toc a');

for (var i = 0; i < tocLinks.length; i++) {
    tocLinks[i].addEventListener('click', function() {
        document.body.classList.remove('mobile-toc-visible');
    });
}
