// let retainMsg = document.getElementsByClassName("content__main-column--article")[0]
// let retainImg = document.getElementsByClassName("content__main-column--article")[0]
// let detailMsg = document.body.children
// console.log(retainMsg,"ss")
const childNodesArray = document.getElementById("top").childNodes;
const footer = document.getElementsByTagName("footer")[0];
const content_footer = document.getElementsByClassName("content-footer")[0];
const content_secondary_column = document.getElementsByClassName("content__secondary-column")[0];
const meta__extras = document.getElementsByClassName("meta__extras")[0];
const submeta__share = document.getElementsByClassName("submeta__share")[0];
const advertisement = document.getElementById("dfp-ad--top-above-nav");
const removeAside = document.getElementsByTagName("aside")[0];

const arr = [content_footer,footer,content_secondary_column, removeAside, meta__extras, submeta__share]
const removeThis = (thisNode)=>{
    thisNode.parentNode.removeChild(thisNode)
}
for(x in arr){
    removeThis(arr[x])
}
// let removeAdvertisement = ()=>{
//     for(x in advertisement){
//         // advertisement[x].parentNode.removeChild(advertisement[x])
//         // console.log(advertisement[x])
//         if (typeof advertisement[x] == 'object'&& advertisement[x].className !== undefined) {
//             if (advertisement[x].className == 'js-ad-slot') {
//                 // document.getElementsByClassName("content__main-column--article")
//             }
//             else {
//                 advertisement[x].parentNode.removeChild(advertisement[x]);
//             }
//         }
//     }
// }
let removeAdvertisement = ()=>{

}

removeAdvertisement()

let removeRough = ()=>{
    for (x in childNodesArray){
        if (typeof childNodesArray[x] == 'object'&& childNodesArray[x].className !== undefined) {
            if (childNodesArray[x].className == 'l-side-margins') {
                return true;
            }
            else {
                childNodesArray[x].parentNode.removeChild(childNodesArray[x]);
            }
        }
    }
}
removeRough()


/*分页器*/
let logDiv = document.createElement("div");
document.body.appendChild(logDiv);
let createBtn = (name, cb) => {
    const a = document.createElement("button");
    a.innerText = name;
    a.onclick = cb;
    a.classList.add("sorter")
    document.body.appendChild(a);
}

const viewportWidth = document.body.clientWidth;
let pageNumberAll;
if (viewportWidth>319 && viewportWidth<375) {
     pageNumberAll = 6;

}
if (viewportWidth>374 && viewportWidth<414) {
     pageNumberAll = 4;

}
if (viewportWidth>413) {
     pageNumberAll = 3;
}

for (i = 0; i < pageNumberAll; i++) {
    (function(i){
        createBtn(`${i+1}`, function() {
            // console.log(`${pageNumber}`)
            sorter(`${i+1}`)
        });
    })(i)

}

let sorter = (pageNumber)=>{
    let page = pageNumber;
    const number = Math.ceil(12/pageNumberAll);
    let content = document.getElementsByClassName("content__article-body")[0].childNodes;
    let count = 0;
    let arr = [];
    for(x in content){
        if (content[x].nodeName == "P" ||content[x].nodeName == "UL" ) {
            arr.push(content[x])
        }
    }
    for(n in arr){
        if (n < page*number && n > (page-1)*number-1) {
            arr[n].style.display="block"
        }
        else{
            arr[n].style.display="none"
        }
    }
}
sorter(1)








