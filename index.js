let     concat
let     concatAll             //Value of all countries saved. No need for refetching
let     data
let     dataAll
const   regionFilter  =     document.getElementById("Filter-by-Region")
const   abeg          =     document.getElementById('countries-section')
const   inputSearch   =     document.getElementById('search-input')
const   back          =     document.getElementById('back')
const   details       =     document.getElementById('flag-text-container')

fetchAll() 
inputSearch.addEventListener('keyup', B)
regionFilter.addEventListener('mouseup', filter)
back.addEventListener('click', ()=>{addClass('details-page', 'hide'); removeClass('countries-section', 'hide');removeClass('filters', 'hide' )})





function run(i) {

    addClass('filters', 'hide' )
    addClass('countries-section', 'hide')
    removeClass('details-page', 'hide')
    let needed = data[i]
    
   
     concat=   `
        <div class="flag-text-container">
        <div class="flag-container"><img src=${ needed.flag }  alt=""></div>
        <div class="text-container">
        <div class="country-header"><b><span>${  needed.name   }</span></b></div>
        <div>
                <div>
                    <p><b>Native Name:  </b> <span> ${  needed.nativeName   }  </span></p>
                </div>
                <div>
                    <p> <b>population:</b>  <span>  ${  formatPop(needed.population) }    </span></p>
                </div>
                <div>
                    <p><b>Region:</b><span> ${ needed.region }    </span></p>
                </div>
                <div>
                    <p><b>Sub-Region:</b> <span>   ${ needed.subregion  }     </span></p>
                </div>
                <div>
                    <p><b>Capital:</b><span>   ${ needed.capital  }     </span></p>
                </div>
        </div>
        
        <div> 
                <div>
                    <p><b>Top Level Domain:</b> <span> ${  needed.topLevelDomain }  </span></p>
                </div>
                <div>
                    <p><b>Currencies:</b> <span>  ${  needed.currencies  }   </span></p>
                </div>
                <div>
                    <p><b>Languages:</b><span> ${ needed.languages  }  </span></p>
                </div>
            </div>
            <div class="border-countries"> <b>Border Countries:</b> <span>  ${needed.borders  }   </span></div>

        </div>
    </div>`
    details.innerHTML = concat

    //{
    // "name": "Afghanistan",
    // "topLevelDomain": [
    //     ".af"
    // ],
    // "alpha3Code": "AFG",
    // "capital": "Kabul",
    // "subregion": "Southern Asia",
    // "region": "Asia",
    // "population": 40218234,
    // "borders": [
    //     "IRN",
    //     "PAK",
    //     "TKM",
    //     "UZB",
    //     "TJK",
    //     "CHN"
    // ],
    // "nativeName": "افغانستان",
    // "currencies": [
    //     {
    //         "code": "AFN",
    //         "name": "Afghan afghani",
    //         "symbol": "؋"
    //     }
    // ],
    // "languages": [
    //     {
    //         "iso639_1": "ps",
    //         "iso639_2": "pus",
    //         "name": "Pashto",
    //         "nativeName": "پښتو"
    //     },
    //     {
    //         "iso639_1": "uz",
    //         "iso639_2": "uzb",
    //         "name": "Uzbek",
    //         "nativeName": "Oʻzbek"
    //     },
    //     {
    //         "iso639_1": "tk",
    //         "iso639_2": "tuk",
    //         "name": "Turkmen",
    //         "nativeName": "Türkmen"
    //     }
    // ],
    // "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
    // "independent": false }




}


function addClass(elementId,className){document.getElementById(elementId).classList.add(className)}
function removeClass(elementId,className){document.getElementById(elementId).classList.remove(className)}

function render(country,index) {

    concat+=`
    <div class="country-tile" id="${index}" onclick="run(${index})" tabindex="0"> 
                    <img loading="lazy" src="${country.flag}" alt="">
                    <div class="tile-details">
                        <div class="name">${country.name}</div>
                        <div class="population"><b>Population:</b><span>${formatPop(country.population)}</span></div>
                        <div class="region"><b>Region:</b><span>${country.region}</span></div>
                        <div class="capital"><b>Capital:</b><span>${country.capital}</span></div>
                    </div>
                </div>
 `
    
}

async function fetchAll() {
    try {   
           let response= await fetch("https://restcountries.com/v2/all?fields=name,capital,currencies,population,languages,region,flag,borders,subregion,topLevelDomain,nativeName,alpha3Code")
            data = await response.json()
            dataAll=data
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
        data=dataAll
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

function formatPop(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
