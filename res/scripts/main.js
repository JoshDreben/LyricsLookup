/**
 * Author: Josh Dreben
 * Date: 2020 March 4
 */

// This Script Use JQuery
const $ = require("jquery");

// Base Musixmatch end point for getting lyrics with apikey only
var url = 'http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=976739c49eb4466263098a5e597cfd63&';

// Proxy server that allows cross domain api calls
const proxy = 'https://cors-anywhere.herokuapp.com/';

// JQuery logic
$(function() {    

    /**
     * This function is run when the 'Get Lyrics' button is called,
     * getting the artist and track names from the input fields,
     * and calling an AJAX GET request to get the lyrics of the 
     * specified song
     */
    $("button").click(function(){
        var artist = $("#artist-input").val();
        var track = $("#track-input").val();

        // Turns any space character into '%20' for API search purposes
        artist = encodeURIComponent(artist.toLowerCase().trim());
        track = encodeURIComponent(track.toLowerCase().trim());

        // Completes full url for the API call
        url += 'q_track='+track+'&q_artist='+artist;
        

        /**
         * AJAX function call GET request that returns a JSON
         * object as the message, parses the message, checks if
         * the status is 404 i.e. song not in database, then
         * adds HTML to lyrics tag accordingly
         */
        $.ajax({
            url: proxy+url,
            dataType: 'json',
            type: 'GET',
            success: function(response) {
                if(response.message.header.status_code != 404){ // Error Handling
                    var lyrics = response.message.body.lyrics.lyrics_body;
                    lyrics = lyrics.replace(/\n/g, "<br>");
                    $("#lyrics").html("<style>#lyrics{margin-top:5%;}</style>"+lyrics);
                } else {
                    $("#lyrics").html("<br><br><style>#lyrics{margin-top:30%};</style>Whoops! Looks like Musixmatch<br>doesn't have the lyrics to that song!");
                }
            },
        });

        // Set URL back to basic form for future searches 
        url ='https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=976739c49eb4466263098a5e597cfd63&'; 
    });

});
