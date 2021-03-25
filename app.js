var express = require('express');
var path = require('path');


var app = express();


/* SiteTran Dropdowns and Selectboxes */

app.get('/swot-widget-2', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Dropdowns_&_SelectBoxes/swot-widget-2.html'));            
});

app.get('/swot-widget-3', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Dropdowns_&_SelectBoxes/swot-widget-3.html'));            
});


app.get('/globe.jpeg', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Dropdowns_&_SelectBoxes/images/globe.jpeg'));
});


/* SiteTran Homepage */

app.get('/st-homepage', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/index.html'));            
});

app.get('/svg_world_map.js', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/svg_world_map.js'));    
});


app.get('/lang_data.js', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/lang_data.js'));    
});

app.get('/css/styles.css', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/css/styles.css'));    
});
app.get('/css/dropdown_styles.css', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/css/dropdown_styles.css'));    
});

})
app.get('/images/cool_background.svg', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/images/cool_background.svg'));
})
app.get('/images/svg_cursor_1.svg', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/images/svg_cursor_1.svg'));
})
app.get('/images/svg_cursor_2.svg', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/images/svg_cursor_2.svg'));
})
app.get('/images/svg_cursor_3.svg', function(request, response) {
    response.sendFile(path.join(__dirname + '/ST_Homepage/images/svg_cursor_3.svg'));
})


/* V2 */

app.get('/v2.js', function(request, response) {
    response.sendFile(path.join(__dirname + '/V2/v2.js'));
})



app.listen(8000, () => {
	console.log('listening on port 8000 baaaaa');
});
