/**
 * Created by OWNER on 2/4/2016.
 */
(function(){
    $(init);

    var $movieTitle;
    var $searchBtn;
    var $searchResults;
    var $detailsTitle;
    var $detailsDirector;
    var $detailsPoster;
    var $detailsPlot;
    var $detailsActors;
    var searchUrl = "http://www.omdbapi.com/?s=TITLE";
    var DETAILS_URL = "http://www.omdbapi.com/?s=TITLE"

    function init() {
        $movieTitle = $("#movieTitle");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");

        $detailsTitle = $("#detailsTitle");;
        $detailsDirector = $("#detailsDirector");;
        $detailsPoster = $("#detailsPoster");;
        $detailsPlot = $("#detailsPlot");;
        $detailsActors = $("#detailsActors");;

        $searchBtn.click(searchMovie);
    }

    function searchMovie() {
        var title = $movieTitle.val();
        var url = searchUrl.replace("TITLE", title);

        alert("URL " + url);
        $.ajax({
            url: url,
            success: renderSearchResults;
        });

        alert("Searching for " + title);
    }

    function renderSearchResults(response) {
        $searchResults.empty();

        console.log(response);
        var totalResults = response.totalResults;
        var movies = response.Search;
        for(var m=0; m<movies.length; m++) {
            var movie = movies[m];
            var title = movie.Title;
            var year = movie.Year;
            var imdbID = movie.imdbID;
            var posterUrl = movie.Poster;

            var $tr = $("<tr>");

            // create image and make its src attribute equal to posterUrl
            var $img = $("<img>")
                .attr("id", imdbID)
                .attr("src", posterUrl)
                //adds class .thumb-poster
                .addClass("thumb-poster")
                // when you click on image, run function fetchMovieDetails
                .click(fetchMovieDetails);

            // create column
            var $td = $("<td>");
            // fill it in
            $td.append(posterUrl);
            // append it to the table
            $td.append($td);

            $td = $("<td>")
                // appending title text
                .append(title)
                //appending whole td to the row
                .appendTo($tr);

            $td = $("<td>")
            // appending year text
                .append(year)
                //appending whole td to the row
                .appendTo($tr);

            $td = $("<td>")
            // appending title text
                .append(imdbID)
                //appending whole td to the row
                .appendTo($tr);

            $searchResults.append($tr);

        }
    }

    function fetchMovieDetails(event) {
        alert("fetchMovieDetails");
        // shows us the event object in console
        console.log(event);

        // the image we're currently clicking; the raw image
        // when we add $() we are making it a jQuery object
        var $img = $(event.currentTarget);
        var imdbid = $img.attr("id");
        var url = DETAILS_URL.replace("IMDBID", imdbid);
        // do this in the url, if successful then alert me in renderMovieDetails
        $.ajax({
            url: url,
            success: renderMovieDetails
        })
    }

    function renderMovieDetails {
        console.log(response);

        var title = response.Title;
        var actors = response.Actors;
        var actorArray = actors.split(",");
        var director = response.Director;
        var plot = response.Plot;
        var posterUrl = response.PosterUrl;

        $detailsTitle.html(title);
        $detailsDirector.html(director);
        $detailsPlot.html(plot);
        $detailsPosterUrl.attr("src", posterUrl);

        for(var a in actorArray) {
            var actorName = actorArray[a];

            var $li = $("<li>");
        }
    }
})