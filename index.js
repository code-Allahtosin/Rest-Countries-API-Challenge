let     concat
let     concatAll             //Value of all countries saved. No need for looping over all again
let     data
let     dataAll             // JSON for all countries, fetching again minimised
const   regionFilter  =     document.getElementById("Filter-by-Region")
const   abeg          =     document.getElementById('countries-section')
const   inputSearch   =     document.getElementById('search-input')
const   back          =     document.getElementById('back')
const   details       =     document.getElementById('flag-text-container')
const   dark          =     document.getElementById('dark-mode')
const   styleLink     =     document.getElementById('style')
const   moon1         =     document.getElementById('moon1')
const   moon2         =     document.getElementById('moon2')



  
if (localStorage.getItem('mode')=='dark'){
    styleLink.setAttribute('href', 'indexDark.css'); 
    }else{
    styleLink.setAttribute('href', 'index.css');
}
   
     

fetchAll() 
inputSearch.addEventListener('keyup', search)
regionFilter.addEventListener('mouseup', filter)
back.addEventListener('click', ()=>{addClass('details-page', 'hide'); removeClass('countries-section', 'hide');removeClass('filters', 'hide' )})



dark.addEventListener('click',()=>{
    if (styleLink.getAttribute('href')=='index.css'){
    styleLink.setAttribute('href', 'indexDark.css') 
    addClass('moon1', 'hide')
    removeClass('moon2', 'hide')
    localStorage.clear()
    localStorage.setItem('mode', 'dark')
  } else{
    styleLink.setAttribute('href', 'index.css') 
    addClass('moon2', 'hide')
    removeClass('moon1', 'hide')

    localStorage.clear()
    localStorage.setItem('mode', 'light')}
}
)

function run(i) {

    addClass('filters', 'hide' )
    addClass('countries-section', 'hide')
    removeClass('details-page', 'hide')
    let needed = data[i]
    
   
     concat=   `
        <div class="flag-text-container">
        <div class="flag-container"><img src=${ needed.flag ?? 'None' }  alt=""></div>
        <div class="text-container">
        <div class="country-header"><b><span>${  needed.name ?? 'None'  }</span></b></div>
        <div>
                <div>
                    <p><b>Native Name:  </b> <span> ${  needed.nativeName  ?? 'None' }  </span></p>
                </div>
                <div>
                    <p> <b>population:</b>  <span>  ${  formatPop(needed.population) }    </span></p>
                </div>
                <div>
                    <p><b>Region:</b><span> ${ needed.region }    </span></p>
                </div>
                <div>
                    <p><b>Sub-Region:</b> <span>   ${ needed.subregion ?? 'None' }     </span></p>
                </div>
                <div>
                    <p><b>Capital:</b><span>   ${ needed.capital ?? 'No Capital'  }     </span></p>
                </div>
        </div>
        
        <div> 
                <div>
                    <p><b>Top Level Domain:</b> <span> ${  needed.topLevelDomain ?? 'None' }  </span></p>
                </div>
                <div>
                    <p><b>Currencies:</b> <span>  ${  giveMe(needed.currencies) ?? 'None' }   </span></p>
                </div>
                <div>
                    <p><b>Languages:</b><span> ${ giveMe(needed.languages) ?? 'None' }  </span></p>
                </div>
            </div>
            <div class="border-countries"> <b>Border Countries:</b> <span>  ${needed.borders ?? 'No border Countries'  }   </span></div>

        </div>
    </div>`
    details.innerHTML = concat
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
                        <div class="region"><b>Region:</b><span>${country.region ?? 'None'}</span></div>
                        <div class="capital"><b>Capital:</b><span>${country.capital ?? 'No Capital'}</span></div>
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
             console.log(error);  alert("Error Encountered. Please reload the page!")
            }
}       

function search(){
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
                                 console.log(error);  alert("Error Encountered. Please reinput search parameters!")

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
                                     console.log(error);  alert("Error Encountered. Please choose Region again!")

                    }
                }       

    fetchFilter()
    }
}

function formatPop(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function giveMe(source) {
   if (source){ let b=[]
    source.forEach((a)=>{b.push(a.name)})
    
    return b}
    else{ return}
}