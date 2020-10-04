const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const algoliasearch = require('algoliasearch');
const customProperties = require('./.vuepress/theme/data/custom-properties');
const customSelectors = require('./.vuepress/theme/data/custom-selectors');
const mixins = require('./.vuepress/theme/data/mixins');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

init();

async function init() {
    const guideRecords = generateGuideRecords();
    // const customPropertyRecords = generateCustomPropertyRecords();
    // const customSelectorRecords = generateCustomSelectorRecords();
    // const mixinRecords = generateMixinRecords();

    const client = algoliasearch(
        process.env.ALGOLIA_APPLICATION_ID,
        process.env.ALGOLIA_ADMIN_API_KEY
    );

    const index = client.initIndex('hiq_test_index');

    await indexRecords(index, [
        ...guideRecords,
        // ...customPropertyRecords,
        // ...customSelectorRecords,
        // ...mixinRecords
    ]);
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

function generateCustomPropertyRecords() {
    return customProperties.map(property => {
        const propertyType = property.type.charAt(0).toUpperCase() + property.type.substr(1).toLowerCase();

        return {
            type: 'customProperty',
            heading: property.name,
            text: property.description,
            pageTitle: 'Custom Properties',
            propertyType,
            url: `/reference/#${property.name.replace('--', '')}`
        }
    });
}

function generateCustomSelectorRecords() {
    return customSelectors.map(selector => {
        return {
            type: 'customSelector',
            heading: selector.name,
            text: selector.description,
            pageTitle: 'Custom Selectors',
            url: `/reference/utilities.html#${selector.name.replace(':--', '')}-selector`
        }
    });
}

function generateMixinRecords() {
    return mixins.map(mixin => {
        return {
            type: 'mixin',
            heading: mixin.name,
            text: mixin.description,
            pageTitle: 'Mixins',
            url: `/reference/utilities.html#${mixin.name.replace(':--', '')}-mixin`
        }
    });
}
