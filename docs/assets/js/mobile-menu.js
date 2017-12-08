var mobileMenuToggle = document.getElementById('mobile-toc-toggle');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        document.body.classList.toggle('mobile-toc-visible');
    });

    var tocLinks = document.querySelectorAll('.toc a');

    for (var i = 0; i < tocLinks.length; i++) {
        tocLinks[i].addEventListener('click', function() {
            document.body.classList.remove('mobile-toc-visible');
        });
    }

}
