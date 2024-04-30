const container = document.getElementById('container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photos = []
let initialLoad = true

const count = initialLoad ? 5 : 25
const accessKey = 'UNSPLASH_ACCESS_KEY'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`

const setAttributes = (el, attrs) => {
  for (const key in attrs) {
    return el.setAttribute(key, attrs[key])
  }
}

const imageLoaded = () => {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
    initialLoad = false
  }
}

const displayPhotos = () => {
  totalImages += photos.length

  photos.forEach(photo => {
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    img.addEventListener('load', imageLoaded)

    item.appendChild(img)
    container.appendChild(item)
  })
}

const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl)
    photos = await res.json()
    displayPhotos()
  } catch (err) {
    console.error(err)
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    // loader.hidden = false
    getPhotos()
  }
})

getPhotos()
