let deckID
let drawURL

const $button = $("button")
const $drawn = $("#drawn")

async function getDeck() {
  try {
    const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle')
    deckID = deck.data.deck_id
    drawURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw`
  } catch (error) {
    console.log(error)
    alert(`An error has occurred while generating the deck ${error}`)
  }
}

async function drawCard() {
  try {
    const draw = await axios.get(drawURL)
    const $newImage = $(`<img src="${draw.data.cards[0].image}">`)
          $drawn.append($newImage)
          if (draw.data.remaining <= 0) {
              $button.remove()
          }
  } catch (error) {
    console.log(error)
    alert(`An error has occurred while drawing a card ${error}`)
  }
}

$button.on("click", drawCard)

getDeck()