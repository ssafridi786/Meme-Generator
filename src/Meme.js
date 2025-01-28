import React from "react"

export default function Meme() {
    const [Meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        topImage: "http://i.imgflip.com/1bij.jpg",
        bottomImage: "https://i.imgflip.com/1g8my4.jpg"
    })
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage(imageType) {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            [imageType]: url
        })
        )
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    return (
        <main>
            <div className="form">
                <input
                    placeholder="Shut Up"
                    className="form--input"
                    name="topText"
                    value={Meme.topText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={() => getMemeImage("topImage")}
                >
                    Get a new topMeme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={Meme.topImage} alt={Meme} className="meme--image" />
                <h2 className="meme--text top">{Meme.topText}</h2>
            </div>
            <hr className="dashed-hr" />
            <div className="form">
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={Meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={() => getMemeImage("bottomImage")}
                >
                    Get a new bottomMeme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={Meme.bottomImage} alt={Meme} className="meme--image" />
                <h2 className="meme--text bottom">{Meme.bottomText}</h2>
            </div>
        </main>
    )
}

