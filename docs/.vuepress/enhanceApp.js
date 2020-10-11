export default () => {
    if (typeof window === 'undefined') return;

    const darkTheme =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute(
            'data-theme',
            darkTheme && darkTheme.matches ? 'dark' : 'light'
        );
    }

    darkTheme.addListener(event => {
        const newTheme = event.matches ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        const themeChangeEvent = new CustomEvent('themeChange', {
            detail: newTheme
        });

        document.dispatchEvent(themeChangeEvent);
    });
};
