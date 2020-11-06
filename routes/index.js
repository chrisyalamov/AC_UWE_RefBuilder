fs = require('fs');

module.exports = function (app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/ref', (req, res) => {
        return res.render('reference', { data: JSON.parse(req.param('schema')).data, type: JSON.parse(req.param('schema')).type.tooltips.join("-")})
    })

    app.get('/builder', (req, res) => {
        return res.render('builder', {})
    })

    app.get('/myMacro', addon.authenticate(), function (req, res) {

        // Get the macro variables passed in via the URL
        const pageId = req.query['pageId'],
            pageVersion = req.query['pageVersion'],
            macroId = req.query['macroId'];

        // Get the clientKey and use it to create an HTTP client for the REST API call
        const clientKey = req.context.clientKey;
        const httpClient = addon.httpClient({
            clientKey: clientKey
        });

        // Call the REST API: Get macro body by macro ID
        httpClient.get(
            '/rest/api/content/' + pageId +
            '/history/' + pageVersion +
            '/macro/id/' + macroId,
            function (err, response, contents) {
                if (err || (response.statusCode < 200 || response.statusCode > 299)) {
                    console.log(err);
                    res.render('<strong>An error has occurred : ' + response.statusCode + '</strong>');
                }
                contents = JSON.parse(contents);
                console.log(contents);

                // Render the view, passing in the {{{body}}}
                res.render('myMacro', {
                    body: contents.body
                });
            });
    });

    // Add additional route handlers here...
}
