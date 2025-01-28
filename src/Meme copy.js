import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImages: [
            "http://i.imgflip.com/1bij.jpg",
            "https://i.imgflip.com/30b1gx.jpg"
        ]
    })
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])


    function getMemeImage() {
        const randomNumber1 = Math.floor(Math.random() * allMemes.length);
        const randomNumber2 = Math.floor(Math.random() * allMemes.length);
        const url1=allMemes[randomNumber1].url;
        const url2=allMemes[randomNumber2].url;
        const randomImages =[url1,url2,url1,url2]
        
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImages: randomImages
        }))

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
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                {meme.randomImages.map((url, index) => (
                    <div key={index} className="meme">
                        <img src={url} className="meme--image" alt="meme" />
                        <h2 className="meme--text top">{meme.topText}</h2>
                        <h2 className="meme--text bottom">{meme.bottomText}</h2>
                    </div>
                ))}
            </div>
        </main>
    )
}

