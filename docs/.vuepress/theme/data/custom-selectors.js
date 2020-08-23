module.exports = [
    {
        name: ":--semantic-element",
        description: "article, aside, dialog, figcaption, figure, footer, header, hgroup, main, nav, section",
    },
    {
        name: ":--touch-action-element",
        description: "a, area, button, [role='button'], input:not([type='range']), label, select, summary, textarea",
    },
    {
        name: ":--heading",
        description: "h1, h2, h3, h4, h5, h6",
    },
    {
        name: ":--user-selection",
        description: "::-moz-selection, ::selection",
    },
    {
        name: ":--list",
        description: "ol, ul",
    },
    {
        name: ":--button",
        description: "button, [role='button'], [type='button'], [type='submit'], [type='reset']",
    },
    {
        name: ":--code-element",
        description: "code, kbd, pre, samp",
    },
    {
        name: ":--media",
        description: "img, embed, object, video",
    },
    {
        name: ":--table-cell",
        description: "th, td",
    },
    {
        name: ":--not-writable",
        description: "&:disabled, &[aria-disabled], &[readonly]",
    },
    {
        name: ":--text-input",
        description: "input[type='text'], input[type='password'], input[type='url'], input[type='email'], input[type='tel'], input[type='search'], input[type='number'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime-local']",
    },
    {
        name: ":--temporal-input",
        description: "input[type='date'], input[type='time'], input[type='month'], input[type='week'], input[type='datetime-local']",
    },
    {
        name: ":--spin-button",
        description: "[type='number']::-webkit-inner-spin-button, [type='number']::-webkit-outer-spin-button",
    },
    {
        name: ":--cancel-button",
        description: "[type='search']::-webkit-search-cancel-button, [type='search']::-webkit-search-decoration",
    }
];
