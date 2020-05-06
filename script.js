/* import json */

var mjson = {
    "movies": [
    {
        "title": "The Cabin in the Woods",
        "yt": "NsIilFNNmkY",
        "tn": "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/cabin-in-the-woods-review-header.jpg"
    },
    {
        "title": "Midsommar",
        "yt": "1Vnghdsjmd0",
        "tn": "https://i1.wp.com/fullcirclecinema.com/wp-content/uploads/2019/09/fullsizeoutput_b3d.jpeg?resize=960%2C640&ssl=1"
    },
    {
        "title": "Annihilation",
        "yt": "0m3cPEbwwhg",
        "tn": "https://www.kommunikationsforum.dk/log/multimedia/annihilation%20Area%20X.jpg"
    },
    {
        "title": "Let the Right One In",
        "yt": "ICp4g9p_rgo",
        "tn": "https://art-s.nflximg.net/66ad5/02a5e862fe23b114f6963cfb986b1d6378d66ad5.jpg"
    },
    {
        "title": "IT",
        "yt": "FnCdOQsX5kc",
        "tn": "https://www.wwnytv.com/resizer/xZuzmOkY74m2SWvoe_eEXp-J4cw=/1200x600/arc-anglerfish-arc2-prod-raycom.s3.amazonaws.com/public/WQCWCUYTCBEBNOVPMEYPRQJCSI.jpg"
    },
    {
        "title": "Zombieland",
        "yt": "8m9EVP8X7N8",
        "tn": "https://c4.wallpaperflare.com/wallpaper/464/372/1011/zombieland-wallpaper-preview.jpg"
    },
    {
        "title": "Shaun of the Dead",
        "yt": "LIfcaZ4pC-4",
        "tn": "https://images2.alphacoders.com/246/thumb-1920-2462.jpg"
    }
]
}

// Create container for thumbnails and titles
function setContainer(){

    const app = document.getElementById('thumbnail')
    const length = mjson.movies.length;
    let i;

    for(i = 0; i < length; i++){
        const container = document.createElement('div');
        var name = 'movie' + i;

        container.setAttribute('id', name);

        app.appendChild(container);
    }
}

setContainer()

// Load thumbnails and titles
function setContent(){

    let length = mjson.movies.length;
    let i;

    for(i = 0; i < length; ++i){
        const img = document.createElement('img');
        const search = 'movie' + i;
        const app = document.getElementById(search)
        const title = document.createElement('H2');

        // set source and add img element to css
        img.src = mjson.movies[i].tn;
        app.appendChild(img);

        // create unique ID for each img element
        var name = 'img' + i;
        img.setAttribute('id', name);

        // create alt to pass google audit accesability test
        img.setAttribute('alt', 'The movie image has trouble loading')

        // set source and add title element to css
        title.textContent = mjson.movies[i].title;
        app.appendChild(title);

        // add event listener 'on click' to img element
        document.getElementById(name).addEventListener("click", function(){showInfo(title.textContent)});

        // create unique ID for each title element
        name = 'title' + i;
        title.setAttribute('id', name);

        // add event listener 'on click' to title element
        document.getElementById(name).addEventListener("click", function(){showInfo(title.textContent)});
    }
}

setContent()

// Show Youtube trailer, title and info
function showInfo(title) {

    const info = document.getElementById('movieinfo');
    const header = document.getElementById('trailertitle');
    const embed = document.getElementById('youtube');
    const embedID = youtubeID(title);
    const source = "https://www.youtube.com/embed/" + embedID;
    const url = "http://www.omdbapi.com/?t=" + title + "&apikey=7b460699";

    let currentYear = new Date();
    currentYear = currentYear.getFullYear();
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // variables for setting data about the movie
    const year = document.getElementById('year');
    const age = document.getElementById('age');
    const plot = document.getElementById('plot');
    const writer = document.getElementById('writer');
    const actors = document.getElementById('actors');
    const awards = document.getElementById('awards');
    const imdb = document.getElementById('imdb');

    // set source to trailer for the movie the user has clicked on
    embed.setAttribute('src', source)

    // show trailer and info
    info.style.display = "flex";

    // set title to title for the movie the user has clicked on
    header.textContent = title;

    // fetch with API KEY = 7b460699
    // works without proxy locally but not in github
    fetch(url)
        .then((response) => response.json())
        .then((responseJSON)=>{
            // set data in HTML element
            const temp = currentYear - responseJSON.Year;
            year.textContent = 'Year: ' + responseJSON.Year;
            age.textContent = 'The movie is ' + temp + ' years old';
            plot.textContent = 'Description: ' + responseJSON.Plot;
            writer.textContent = 'Writer: ' + responseJSON.Writer;
            actors.textContent = 'Actors: ' + responseJSON.Actors;
            awards.textContent = 'Awards: ' + responseJSON.Awards;
            imdb.textContent = 'IMDB rating: ' + responseJSON.imdbRating;
        });
}

// Get YouTube id from array through title
function youtubeID(title) {

    const length = mjson.movies.length;

    for(i = 0; i < length; i++){
        if(title == mjson.movies[i].title){
            return mjson.movies[i].yt;
        }
    }

}

// modal close button
const modal = document.getElementById('movieinfo');
const span = document.getElementById('close');
const embed = document.getElementById('youtube');

// when the user clicks on X, close the modal
    span.onclick = function() {
        modal.style.display = "none";

        // avoid bug where video keeps playing when modal is closed
        embed.setAttribute('src', "")
    }

// when the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            // avoid bug where video keeps playing when modal is closed
            embed.setAttribute('src', "")
        }
    }



// last updated date (Footer)
var currentDate = new Date()
currentDate = currentDate.toLocaleDateString()
document.getElementById('date').innerHTML =  currentDate.toString()



