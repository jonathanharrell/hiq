// Algolia results

var client = algoliasearch('G1GBQM2KE5', '3cedd81441774e2f4c262ecfc4d16732');
var index = client.initIndex('hiq_docs');

autocomplete('#search-input', { hint: false }, [
    {
        source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
        displayKey: 'hiq',
        templates: {
            suggestion: function(suggestion) {
                var result = '';

                var hasTitleResult = suggestion._highlightResult.title.matchedWords.length > 0;
                var hasH2Result = suggestion._highlightResult.h2 && suggestion._highlightResult.h2.matchedWords.length > 0;
                var hasH3Result = suggestion._highlightResult.h3 && suggestion._highlightResult.h3.matchedWords.length;
                var hasTextResult = suggestion._highlightResult.text && suggestion._highlightResult.text.matchedWords.length > 0;
                var hasH2 = suggestion.h2;

                if (hasTitleResult) {
                    result += '<span class="title">' + suggestion._highlightResult.title.value + '</span>'
                } else {
                    result += '<span class="title">' + suggestion.title + '</span>'
                }

                if (hasH2Result) {
                    result += '<span class="breadcrumb">' + suggestion._highlightResult.h2.value + '</span>';
                }

                if (!hasH2Result && (hasH3Result || hasTextResult) && hasH2) {
                    result += '<span class="breadcrumb">' + suggestion.h2 + '</span>';
                }

                if (hasH3Result) {
                    result += '<span class="breadcrumb">' + suggestion._highlightResult.h3.value + '</span>';
                } else if (suggestion.h3) {
                    result += '<span class="breadcrumb">' + suggestion.h3 + '</span>';
                }

                if (hasTextResult) {
                    result += '<span class="text">' + suggestion._snippetResult.text.value + '</span>';
                }

                return '<div class="result-content">' + result + '</div>';
            }
        }
    }
]).on('autocomplete:selected', function(event, suggestion, dataset) {
    var url = suggestion.url;

    if (suggestion.css_selector_parent) {
        url += suggestion.css_selector_parent;
    } else {
        url += '#' + suggestion.text;
    }

    document.location.href = url;
});
