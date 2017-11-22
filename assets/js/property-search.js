var propertySearchInput = document.querySelector('.search-properties');

var properties = []

document.querySelectorAll('.properties-table tbody tr')
    .forEach(function(row) {
        var nameCell = row.querySelector('.name code')
        var descriptionCell = row.querySelector('.description')

        properties.push({
            name: nameCell ? nameCell.innerHTML : '',
            description: descriptionCell ? descriptionCell.innerHTML : ''
        });
    });

propertySearchInput.addEventListener('input', function(event) {
    var query = event.target.value

    var filteredProperties = [];

    properties.forEach(function(property) {
        if (property.name.indexOf(query) !== -1) {
            filteredProperties.push(property);
        }
    });

    renderResults(filteredProperties, query);
});

function renderResults(results, query) {
    var htmlString = '';

    results.forEach(function(property) {
        var propertyNameHTML = property.name.split(query).join('<strong>' + query + '</strong>');

        htmlString += '<tr>' + '<td class="name"><code>' + propertyNameHTML + '</code></td><td class="description">' + property.description + '</tr>';
    });

    document.querySelector('.properties-table tbody').innerHTML = htmlString;
}
