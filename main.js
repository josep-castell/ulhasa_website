const backgroundImg = document.getElementById("background-img");
const landingContainer = document.querySelector('.landing-container');
const landingContent = document.querySelector(".landing-content");
const observableSections = document.querySelectorAll(".section-observable");
let scrollTopPosition = true;
let viewportWidth = window.innerWidth;
let sectionObserved;

let rocksOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 1
}

let rocksCallback = (entries, observer) => {
    let card = document.getElementById("shiatsu-card");
    entries.forEach(entry => {
        if(entry.isIntersecting){
            card.style.transform = 'translateX(0)';
        }else{
            if(entry.boundingClientRect.y > 50){
                card.style.transform = 'translateX(-110vw)';
            }
        }
    })
}

let rocksObserver = new IntersectionObserver(rocksCallback, rocksOptions);
let rocksTarget = document.getElementById("shiatsu-section-break");
// rocksObserver.observe(rocksTarget);

let titleOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 1
}

let titleCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            document.getElementById("shiatsu-card").style.transform = 'translateX(110vw)';
        }else{
            if(entry.intersectionRect.y > 100){
                document.getElementById("shiatsu-card").style.transform = 'translateX(0)';
            }
        }
    })
}

let titleTarget = document.querySelector("#shiatsu .section-title");
let titleObserver = new IntersectionObserver(titleCallback, titleOptions);
// titleObserver.observe(titleTarget);

let sectionObserverOptions = {
    root: null,
    rootMargin: '-100px',
    threshold: 0
}

let sectionObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            sectionObserved = entry.target;
        }
    });
}

let sectionObserver = new IntersectionObserver(sectionObserverCallback, sectionObserverOptions);

document.querySelectorAll(".section-observable").forEach(observable => {
    sectionObserver.observe(observable);
})

addEventListener("scroll", () => {
    if(window.scrollY == 0){
        scrollTopPosition = true;
    }else{
        scrollTopPosition = false;
    }
    changeBackgroundLogoOpacity();
    changeToTopBtnOpacity();
    // parallax();
});

addEventListener("load", () => {
    load();
});

function load(){
  backgroundImg.style.opacity = '1';
  landingContainer.style.transition = '1s';
  setTimeout(() => {
    changeBackgroundLogoOpacity();
  }, 700);
  setTimeout(() => {
    landingContent.style.transform = "scale(1)";
  }, 1000);
  // setTimeout(() => {
  //   landingContainer.style.backgroundColor = 'var(--primary-color-lighter)';
  // }, 1500);
}

function changeBackgroundLogoOpacity(){
    if(scrollTopPosition){
        backgroundImg.style.opacity = '0.1';
    }else{
        backgroundImg.style.opacity = '0.8';
    }
}

function changeToTopBtnOpacity(){
    let btn = document.getElementById("to-top-btn");
    if(scrollY > (innerHeight / 3) * 2){
        btn.style.opacity = '1';
    }else{
        btn.style.opacity = '0';
    }
}

document.getElementById("to-top-btn").addEventListener("click", () => {
    toTop();
})

document.getElementById("to-next-btn").addEventListener("click", () => {
    toNext();
})

function toNext(){
    let nextSection = checkNextSection();
    if(nextSection){
        if(nextSection.dataset.sectionid === '3'){
            nextSection.scrollIntoView({block: "center"});
        }else{
            nextSection.scrollIntoView({block: "start"});
        }
    }
}

function checkNextSection(){
    for(let section of observableSections){
        if(Number.parseInt(section.dataset.sectionid) - 1 == Number.parseInt(sectionObserved.dataset.sectionid)){
            return section;
        }
    }
}

function toTop(){
    scrollTo(0,0);
}
