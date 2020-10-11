const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const algoliasearch = require('algoliasearch');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

init();

async function init() {
    const client = algoliasearch(
        process.env.ALGOLIA_APPLICATION_ID,
        process.env.ALGOLIA_ADMIN_API_KEY
    );

    const index = client.initIndex('hiq_docs');

    const guideRecords = generateGuideRecords();
    await indexRecords(index, guideRecords);
}

function generateGuideRecords() {
    const guidePath = path.join(__dirname, '/.vuepress/dist/guide')
    const files = readDirectory(guidePath);

    let records = [];

    files.forEach(filename => {
        records = [
            ...records,
            ...createRecordsFromFile(
                filename,
                `${guidePath}/${filename}`
            )
        ]
    });

    return records;
}

function createRecordsFromFile(filename, filepath) {
    let records = [];

    const html = readFileContents(filepath);
    const $ = parseHTML(html);

    const pageTitle = $('h1').text().replace('# ', '');
    let baseUrl = '/guide';
    baseUrl += filename === 'index.html' ? '/' : `/${filename}`;

    records.push({
        type: 'page',
        pageTitle,
        url: baseUrl,
        boosted: true
    });

    const headings = [];
    const paragraphs = [];

    if ($) {
        const content = $('.content__default');

        $('> h2,> h3,> h4,> h5,> h6', content).each(function(index, element) {
            let url = baseUrl;

            if (element.name !== 'h1') {
                const anchor = $('.header-anchor', this);
                if (anchor) url += anchor.attr('href');
            }

            headings.push({
                type: 'heading',
                text: $(this).text().replace('# ', ''),
                pageTitle,
                url
            });
        });

        $('.content__default > p').each(function() {
            let url = baseUrl;

            let heading;
            const previousHeading = $(this).prevAll('h2,h3,h4,h5,h6').first();

            if (previousHeading) {
                heading = previousHeading.text().replace('# ', '');

                const anchor = $('.header-anchor', previousHeading);
                if (anchor) url += anchor.attr('href');
            }

            paragraphs.push({
                type: 'paragraph',
                text: $(this).text(),
                heading,
                pageTitle,
                url
            });
        });
    }

    return [...records, ...headings, ...paragraphs];
}

function indexRecords(index, records) {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await index.replaceAllObjects(records, {
                autoGenerateObjectIDIfNotExist: true
            });

            resolve(response);
        } catch(error) {
            console.error(error);
            reject(error);
        }
    })
}

function readDirectory(path) {
    try {
        return fs.readdirSync(path);
    } catch(error) {
        console.error(error);
        return [];
    }
}

function readFileContents(file) {
    try {
        return fs.readFileSync(file, 'utf8');
    } catch(error) {
        console.error(error);
        return '';
    }
}

function parseHTML(html) {
    try {
        return cheerio.load(html);
    } catch(error) {
        console.error(error);
    }
}
