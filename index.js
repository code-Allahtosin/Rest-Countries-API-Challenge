let     concat
const   abeg          =     document.getElementById('countries-section')
const   inputSearch   =     document.getElementById('search-input')



// import fetch from "node-fetch"

fetchAll() 

window.onload(inputSearch.addEventListener('keyup', B))



function render(country) {

    concat+=`
    <div class="country-tile"> 
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
           let response= await fetch("https://restcountries.com/v2/all?fields=name,capital,currencies,population,languages,region,flag,borders,subregion,tld")
            let data = await response.json()
            console.log("done")
            concat=''
            data.forEach((D)=>render(D) )
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
                let data = await response.json()
                
                
                concat=''
                data.forEach((D)=>render(D ))
                abeg.innerHTML =concat
    
                return
            }  catch (error) {
                    console.log(error)
                }
            }       

fetchB()
}

