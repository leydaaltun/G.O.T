fetch('http://api.tvmaze.com/singlesearch/shows?q=lost')
    .then(function(res){
        return res.json()
    })
    .then(function(gotinfo){
        //console.log(gotinfo)
        updateShowHtml(gotinfo)
    })

function updateShowHtml(showdata) {
    console.log(showdata)

    const show = {
        genres: showdata.genres,
        image: showdata.image.medium,
        name: showdata.name,
        site: showdata.officialSite,
        rating: showdata.rating.average,
        schedule: `${showdata.schedule.time} on ${showdata.schedule.days[0]}`,
        summary: showdata.summary,
    }
    console.log(show)
    // document.querySelector('h1').innerHTML = show.name
    document.querySelector('img').src = show.image
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