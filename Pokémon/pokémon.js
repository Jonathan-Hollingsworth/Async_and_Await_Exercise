const random1 = Math.floor(Math.random() * 500) + 1
let random2 = Math.floor(Math.random() * 500) + 1
while (random2 === random1) {
    random2 = Math.floor(Math.random() * 500) + 1
}
let random3 = Math.floor(Math.random() * 500) + 1
while (random3 === random1 || random3 === random2) {
    random3 = Math.floor(Math.random() * 500) + 1
}

async function getPokémon() {
    const promise1 = axios.get(`https://pokeapi.co/api/v2/pokemon/${random1}`)
    const promise2 = axios.get(`https://pokeapi.co/api/v2/pokemon/${random2}`)
    const promise3 = axios.get(`https://pokeapi.co/api/v2/pokemon/${random3}`)
    
    const pokémonArr = await Promise.all([promise1, promise2, promise3])
    for (let pokémon of pokémonArr) {
        const species = await axios.get(pokémon.data.species.url)
        textEntries = species.data.flavor_text_entries
        for (let entry of textEntries) {
            if (entry.language.name === 'en') {
                console.log(`${pokémon.data.name}: ${entry.flavor_text}`)
            }
        }
        console.log('----------') //Divider
    }
}

getPokémon()