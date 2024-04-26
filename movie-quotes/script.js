const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

const showLoadingSpinner = isLoading => {
  if (isLoading) {
    loader.hidden = false
    quoteContainer.hidden = true
  } else {
    if (!loader.hidden) {
      loader.hidden = true
      quoteContainer.hidden = false
    }
  }
}

const newQuoteRemote = () => {
  showLoadingSpinner(true)
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

  const isAuthor = quote.author !== 'type.fit'

  authorText.textContent = isAuthor
    ? quote.author.split(',').shift()
    : 'Unknown'

  quote.text.length > 50
    ? quoteText.classList.add('quote__text--long')
    : quoteText.classList.remove('quote__text--long')
  quoteText.textContent = quote.text

  showLoadingSpinner(false)
}

const newQuoteLocal = () => {
  showLoadingSpinner(true)
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]

  authorText.textContent = quote.author ? quote.author : 'Unknown'

  quote.text.length > 50
    ? quoteText.classList.add('quote__text--long')
    : quoteText.classList.remove('quote__text--long')
  quoteText.textContent = quote.text

  showLoadingSpinner(false)
}

const getQuotes = async () => {
  showLoadingSpinner(true)
  const apiUrl = 'https://type.fit/api/quotes'

  try {
    const res = await fetch(apiUrl)
    apiQuotes = await res.json()
    newQuoteRemote()
    console.log(apiQuotes)
  } catch (err) {
    // console.log(err)
    newQuoteLocal()
  }
}

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
