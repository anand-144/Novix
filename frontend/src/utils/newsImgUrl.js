function newsImgUrl (name) {
    return new URL(`../assets/news/${name}` , import.meta.url)
}

export  {newsImgUrl}