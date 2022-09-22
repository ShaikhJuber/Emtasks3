const searchNews = document.querySelector('.news-search');
const input = document.querySelector('.input');
const newsList = document.querySelector('.list');

// add event on button
searchNews.addEventListener('submit', retrives)

function retrives(e){

    newsList.innerHTML = '';
     e.preventDefault();

/// News Api Key
    const apiKey = '59443656f0e74d46b55070e02da79298';
    let topic = input.value;

//  News api url fatch articals only
    let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`

  fetch(url).then((res) =>{
    return res.json();
  }).then((data) =>{
    //console.log(data);

/// fatch the data elements 
    data.articles.forEach(article => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', article.url);
        a.setAttribute('target', '_blank');
        a.textContent = article.title;
        li.appendChild(a);
        newsList.appendChild(li);
    })
  })
   
    //console.log(topic)

}