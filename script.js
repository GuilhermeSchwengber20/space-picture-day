const btn = document.querySelector("#btnPesquisa");
const content = document.querySelector("#content");
const inputData = document.querySelector("#inputData");
const dataAtual = document.querySelector("#dataAtual");

const date = new Date();

const d = String(date.getDate()).padStart(2, '0');
const m = String(date.getMonth() + 1).padStart(2, '0');
const y = date.getFullYear();

dataAtual.innerText = d + "/" + m + "/" + y;

btn.addEventListener("click", (e) =>{
    e.preventDefault();
    sendApiRequest();
})

async function sendApiRequest() {
    const API_KEY = "NoBJc9mH6gJTZrbuUxyCy2Qj04gxbSleSi8Y7Ua2";
    const startData = inputData.value.split('/').reverse().join('-')

    await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startData}&end_date=${startData}&thumbs=true`).then(r => r.json())
    .then((nasa) =>{
        const objNasa = {...nasa[0]};
        let { hdurl: IMG_URL, copyright, thumbnail_url} = objNasa;
        if(copyright === undefined){
            copyright = "Nasa"
        }else if(IMG_URL === undefined){
            IMG_URL = thumbnail_url;
        }
        setTimeout(async() =>{
            content.innerHTML = `<img src="${IMG_URL}"/><br><p>© ${copyright}</p>`

        }, 1000);
    })
    
}