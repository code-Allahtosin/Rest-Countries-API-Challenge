
const abeg = document.getElementById('countries-section')


// import fetch from "node-fetch"
async function fetchAll() {
    try {   
           let response= await fetch("https://restcountries.com/v2/all?fields=name,capital,currencies,population,languages,region,flag,borders,subregion,tld")
            let data = await response.json()
            // console.log(data)
            console.log("done")

            data.forEach((D)=>A(D) )
            abeg.innerHTML =concat

            return
        }  catch (error) {
             console.log(error)
            }
        }       

fetchAll() 

// let Countries = [
//     {
//     name: {
//       common: 'Ireland',
//       official: 'Republic of Ireland',
//       nativeName: [Object]
//     },
//     tld: [ '.ie' ],
//     currencies: { EUR: [Object] },
//     capital: [ 'Dublin' ],
//     region: 'Europe',
//     subregion: 'Northern Europe',
//     languages: { eng: 'English', gle: 'Irish' },
//     borders: [ 'GBR' ],
//     flag: '🇮🇪',
//     population: 4994724
//   },
//   {
//     name: {
//       common: 'Martinique',
//       official: 'Martinique',
//       nativeName: [Object]
//     },
//     tld: [ '.mq' ],
//     currencies: { EUR: [Object] },
//     capital: [ 'Fort-de-France' ],
//     region: 'Americas',
//     subregion: 'Caribbean',
//     languages: { fra: 'French' },
//     borders: [],
//     flag: '🇲🇶',
//     population: 378243
//   },
//   {
//     name: {
//       common: 'Qatar',
//       official: 'State of Qatar',
//       nativeName: [Object]
//     },
//     tld: [ '.qa', 'قطر.' ],
//     currencies: { QAR: [Object] },
//     capital: [ 'Doha' ],
//     region: 'Asia',
//     subregion: 'Western Asia',
//     languages: { ara: 'Arabic' },
//     borders: [ 'SAU' ],
//     flag: '🇶🇦',
//     population: 2881060
//   },
//   ]
// // console.log(Countries)

var concat=''

// Countries.forEach((D)=>A(D) )
function A(country) {

    concat+=`
    <div class="country-tile"> 
                    <img src="${country.flag}" alt="">
                    <div class="tile-details">
                        <div class="name">${country.name}</div>
                        <div class="population"><span class="bold">Population:</span> ${country.population}</div>
                        <div class="region"><span class="bold">Region:</span> ${country.region}</div>
                        <div class="capital"><span class="bold">Capital:</span> ${country.capital}</div>
                    </div>
                </div>
 `
    
}
// console.log(concat)

