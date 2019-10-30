const url = "https://mobi-server.herokuapp.com/hackathons"

axios.get(url)
    .then(function (response) {
        // handle success
        const events = response.data
        let row = null
        for (let i = 0; i < events.length; i++) {
            if (i % 3 == 0) {
                row = document.createElement('div')
                row.className += "row"
                row.className += " justify-content-between"
                row.style.marginBottom = "32px"
            }

            let card = document.createElement('div')
            card.className += "card"
            card.className += " col-sm-3"
            card.style.padding = "15px"
            row.appendChild(card)

            let cardImg = document.createElement('img')
            cardImg.className += 'card-img-top'
            cardImg.style.maxWidth = '75%'
            cardImg.style.height = 'auto'
            cardImg.style.margin = 'auto'
            cardImg.src = events[i].imageWrap
            card.appendChild(cardImg)

            let cardBody = document.createElement('div')
            cardBody.className += 'card-body'
            let title = document.createElement('h5')
            title.className += 'card-title'
            title.textContent = events[i].title
            cardBody.appendChild(title)

            let date = document.createElement('p')
            date.className += 'card-text'
            date.textContent = events[i].eventDate
            cardBody.appendChild(date)

            let location = document.createElement('p')
            location.className += 'card-text'
            location.textContent = events[i].city + ", " + events[i].state
            cardBody.appendChild(location)

            card.appendChild(cardBody)

            document.getElementById('hackathons').appendChild(row)
        }
        console.log(response.data);
    })