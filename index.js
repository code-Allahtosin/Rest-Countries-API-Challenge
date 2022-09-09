let     concat
let     concatAll             //Value of all countries saved. No need for refetching
let data
const   regionFilter        =     document.getElementById("Filter-by-Region")
const   abeg          =     document.getElementById('countries-section')
const   inputSearch   =     document.getElementById('search-input')



fetchAll() 
inputSearch.addEventListener('keyup', B)
regionFilter.addEventListener('mouseup', filter)






function run(i) {

    addClass('filters', 'hide' )
    addClass('countries-section', 'hide')
    removeClass('details-page', 'hide')
    let needed = data[i]







    function addClass(elementId,className){document.getElementById(elementId).classList.add(className)}
    function removeClass(elementId,className){document.getElementById(elementId).classList.remove(className)}

}


function render(country,index) {

    concat+=`
    <div class="country-tile" id="${index}" onclick="run(${index})" tabindex="0"> 
                    <img loading="lazy" src="${country.flag}" alt="">
                    <div class="tile-details">
                        <div class="name">${country.name}</div>
                        <div class="population"><span class="bold">Population:</span> ${country.population}</div>
                        <div class="region"><span class="bold">Region:</span> ${country.region}</div>
                        <div class="capital"><span class="bold">Capital:</span> ${country.capital}</div>
                    </div>
                </div>
 `
    
}

async function fetchAll() {
    try {   
           let response= await fetch("https://restcountries.com/v2/all?fields=name,capital,currencies,population,languages,region,flag,borders,subregion,topLevelDomain,nativeName,alpha3Code")
            data = await response.json()
            console.log("done")
            concat=''
            data.forEach((D,I)=>render(D,I) )
            concatAll=concat
            abeg.innerHTML =concat

            return
        }  catch (error) {
             console.log(error)
            }
}       

function B(){
    let Query=inputSearch.value
    let B = `https://restcountries.com/v2/name/${Query}`
    async function fetchB() {
        try {   
                let response= await fetch(B)
                data = await response.json()
                
                
                concat=''
                data.forEach((D,I)=>render(D,I ))
                abeg.innerHTML =concat
    
                return
            }  catch (error) {
                    console.log(error)
                }
            }       

fetchB()
}

function filter(){
    let Query=regionFilter.value
    if (Query=='all'||Query == 'none'){
        abeg.innerHTML =concatAll
    } else{
        let Filter = `https://restcountries.com/v2/region/${Query}`
        async function fetchFilter() {
            try {   
                    let response= await fetch(Filter)
                    data = await response.json()
                    
                    
                    concat=''
                    data.forEach((D,I)=>render(D,I))
                    abeg.innerHTML =concat
        
                    return
                }  catch (error) {
                        console.log(error)
                    }
                }       

    fetchFilter()
    }
}


