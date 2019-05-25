const queryString = new URLSearchParams(window.location.search)
const showName = queryString.get('show')
//console.log(showName)


fetch(` http://api.tvmaze.com/singlesearch/shows?q=${showName}`)
    .then(function(res){
        return res.json()
    })
    .then(function(gotinfo){
        //console.log(gotinfo)
        updateShowHtml(gotinfo)
    })

function updateShowHtml(showdata) {
    //console.log(showdata)

    const show = {
        genres: showdata.genres,
        image: showdata.image.medium,
        name: showdata.name,
        site: showdata.officialSite,
        rating: showdata.rating.average,
        schedule: `${showdata.schedule.time} on ${showdata.schedule.days[0]}`,
        summary: showdata.summary,
    }
    //console.log(show)
    // document.querySelector('h1').innerHTML = show.name
    document.querySelector('.ironThrone').src = show.image
    let genreHtml = ""
    show.genres.forEach(function(genre){
        genreHtml += `<button class="type"> ${genre} </button>`
    })
    document.getElementById('name').innerHTML = show.name
    //console.log(show.name)
    document.querySelector('.types').innerHTML = genreHtml
    document.querySelector('.rating').innerHTML = show.rating
    document.querySelector('.summary').innerHTML = show.summary
    document.getElementById('schedule').innerHTML = show.schedule
    document.querySelector('.site').innerHTML = show.site

    
}

const input = document.querySelector('.seriesSearch')
//console.log(input)

input.addEventListener('input',function(event){
    const searchquery = event.target.value
    if(searchquery.length > 2) {
        fetch(`http://api.tvmaze.com/search/shows?q=${searchquery}`)
        .then(function(res){
            return res.json()
        })
        .then(function(showlist){
            showSearchResultsOverlay()
            showSearchResults(showlist)
        })
    
    }
    
})



const searchResults = document.querySelector('.searchResults')
console.log(searchResults)

function showSearchResults(showlist) {
    
    let html = ''
    console.log(showlist)
    showlist.forEach(function(show){
        console.log(show)
        console.log(show.show.name)
        showSearchResultsOverlay()
        html += `<li><a href="/?show=${show.show.name}"> ${show.show.name} </a></li>`
    })
    searchResults.innerHTML = html
    
}

const overlay = document.querySelector('.overlay')

function showSearchResultsOverlay() {
    document.body.classList.add('overlayVisible','results-visible')
    overlay.addEventListener('click',function(event){
        document.body.classList.remove('overlayVisible','results-visible')
    })


}

