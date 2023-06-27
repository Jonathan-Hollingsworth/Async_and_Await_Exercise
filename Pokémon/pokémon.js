async function getCount() {
    try {
        const pokémonData = await axios.get("https://pokeapi.co/api/v2/pokemon")
        console.log(pokémonData.data.count)
        return pokémonData.data.count
    } catch (error) {
        alert(`An error has occurred while collecting data: ${error}`)
    }
}

async function getResults(count) {
    try {
        const foundPokémon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${count}`)
        console.log(foundPokémon.data.results)
        return foundPokémon.data.results
    } catch (error) {
        alert(`An error has occurred while collecting data: ${error}`)
    }
}

async function getPokémon() {
    const pokéCount = await getCount()
    const allPokémon = await getResults(pokéCount)
    const random1 = Math.floor(Math.random() * pokéCount)
    let random2 = Math.floor(Math.random() * pokéCount)
    while (random2 === random1) {
        random2 = Math.floor(Math.random() * pokéCount)
    }
    let random3 = Math.floor(Math.random() * pokéCount)
    while (random3 === random1 || random3 === random2) {
        random3 = Math.floor(Math.random() * pokéCount)
    }

    const url1 = allPokémon[random1].url
    const url2 = allPokémon[random2].url
    const url3 = allPokémon[random3].url
    try {
        const promise1 = axios.get(url1)
        const promise2 = axios.get(url2)
        const promise3 = axios.get(url3)
    
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
    } catch (error) {
        console.log(error)
        alert(`An error has occurred while collecting data: ${error}`)
    }
}

getPokémon()