
$(document).ready(function () {
    $('#myButton').on('click', function(){
        $("#table").show();
        var term = document.getElementById("artist").value;
        var limit = 25;
        // console.log(term);

        $.ajax({
            url: "https://itunes.apple.com/search?term=" + term + "&limit=" + limit,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                console.log(result);
                myFunction(result) },
            error: function() { alert('Failed!'); }
        });

    });
});

function myFunction(json){
    var results = json.results;
    console.log(results);

    var s = "<table border = '1'>";
    s+= ("<tr><td>" + 'Song Name' + "</td>");
    s+= ("<td>" + 'Date Released' + "</td>");
    s+= ("<td>" + 'Artist' + "</td>");
    s+= ("<td>" + 'Album Name' + "</td>");
    s+= ("<td>" + 'Album Cover' + "</td></tr>");
    for(var i=0; i<results.length; i++) {
        s += ("<tr><td>" + results[i].trackCensoredName + "</td>");
        s += ("<td>" + results[i].releaseDate.substring(0,10) + "</td>");
        s += ("<td>" + results[i].artistName + "</td>");
        s += ("<td><a href='#' onclick='runDetail(" + results[i].collectionId + ")'>" + (results[i].collectionName) + "</a></td>");
        s += ("<td>" + '<img src=' + results[i].artworkUrl100 + '>' + "</td></tr>");
    }
    s += "</table>";
    document.getElementById("table").innerHTML = s;

}

function runDetail(collectionId){
    console.log(collectionId);

    $.ajax({
        // findArtist()
        url: "https://itunes.apple.com/lookup?id=" + collectionId,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(result) {
            console.log(result);
            buildAlbumTable(result);
        },
        error: function() { alert('Failed!');
        }
    });

    $("#table").hide();
    document.getElementById("album").innerHTML = ""

    function buildAlbumTable(json){
        var results = json.results;
        var t = "<table border = '1' class='table 'table-bordered'>";
        t+= ("<tr><td>" + 'Collection Name' + "</td>");
        t+= ("<td>" + 'Date Released' + "</td>");
        t+= ("<td>" + 'Album Cover' + "</td></tr>");

        t += ("<tr><td>" + results[0].collectionName + "</td>");
        t += ("<td>" + results[0].releaseDate.substring(0,10) + "</td>");
        t += ("<td>" + '<img src=' + results[0].artworkUrl100 + '>' + "</td></tr>");
        t += "</table>";
        document.getElementById("albumTable").innerHTML = t;
    }




}