const $h1 = $("h1")
const $ul = $("ul")
const $ol = $("ol")

const RANDNUM = Math.floor(Math.random()*365) + 1
$h1.text(RANDNUM)

const BASEURL = `http://numbersapi.com/${RANDNUM}`

async function getFacts() {
  const triviaPromise = axios.get(`${BASEURL}/trivia?json`)
  const yearPromise = axios.get(`${BASEURL}/year?json`)
  const datePromise = axios.get(`${BASEURL}/date?json`)
  const mathPromise = axios.get(`${BASEURL}/math?json`)

  try {
    const numberFacts = await Promise.all([triviaPromise, yearPromise, datePromise, mathPromise])
    for (let fact of numberFacts) {
      const $newLI = $("<li>")
      $newLI.text(`${fact.data.type}: ${fact.data.text}`)
      $ul.append($newLI)
    }
  } catch (error) {
    console.log(error)
    alert(`An error has occurred while obtaining facts ${error}`)
  }
}

async function firstFive() {
  try {
    const facts = await axios.get('http://numbersapi.com/1,2,3,4,5/trivia?json')
    for (let i = 1; i <= 5; i++) {
      const $newLI = $("<li>")
      $newLI.text(facts.data[i])
      $ol.append($newLI)
    }
  } catch (error) {
    console.log(error)
    alert(`An error has occurred while obtaining facts ${error}`)
  }
}

getFacts()
firstFive()