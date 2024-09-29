const fetchQuote = async () => {
    const result = await fetch('http://localhost:3001/quote', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }});
    const quote = await result.json();

    console.log(quote);
    document.getElementById('info').innerText = `"${quote.quote}"' - Author`;
}

fetchQuote();