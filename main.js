const backgroundImg = document.getElementById('background-img');
const landingContent = document.querySelector('.landing-content');
const observableSections = document.querySelectorAll('.section-observable');
let scrollTopPosition = true;
let viewportWidth = window.innerWidth;
let sectionObserved;

const rocksOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 1,
};

const rocksCallback = (entries, observer) => {
  const card = document.getElementById('shiatsu-card');
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      card.style.transform = 'translateX(0)';
    } else if (entry.boundingClientRect.y > 50) {
      card.style.transform = 'translateX(-110vw)';
    }
  });
};

const rocksObserver = new IntersectionObserver(rocksCallback, rocksOptions);
const rocksTarget = document.getElementById('shiatsu-section-break');
// rocksObserver.observe(rocksTarget);

const titleOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 1,
};

const titleCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById('shiatsu-card').style.transform =
        'translateX(110vw)';
    } else if (entry.intersectionRect.y > 100) {
      document.getElementById('shiatsu-card').style.transform = 'translateX(0)';
    }
  });
};

const titleTarget = document.querySelector('#shiatsu .section-title');
const titleObserver = new IntersectionObserver(titleCallback, titleOptions);
// titleObserver.observe(titleTarget);

const sectionObserverOptions = {
  root: null,
  rootMargin: '-100px',
  threshold: 0,
};

const sectionObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) sectionObserved = entry.target;
  });
};

const sectionObserver = new IntersectionObserver(
  sectionObserverCallback,
  sectionObserverOptions
);

document.querySelectorAll('.section-observable').forEach((observable) => {
  sectionObserver.observe(observable);
});

addEventListener('scroll', () => {
  scrollTopPosition = window.scrollY === 0;
  changeBackgroundLogoOpacity();
  changeToTopBtnOpacity();
  // parallax();
});

addEventListener('load', () => {
  load();
});

function load() {
  backgroundImg.style.opacity = '1';
  landingContainer.style.transition = '1s';
  setTimeout(() => {
    changeBackgroundLogoOpacity();
  }, 700);
  setTimeout(() => {
    landingContent.style.transform = 'scale(1)';
  }, 1000);
  // setTimeout(() => {
  //   landingContainer.style.backgroundColor = 'var(--primary-color-lighter)';
  // }, 1500);
}

function changeBackgroundLogoOpacity() {
  backgroundImg.style.opacity = scrollTopPosition ? '0.1' : '0.5';
}

function changeToTopBtnOpacity() {
  const btn = document.getElementById('to-top-btn');
  btn.style.opacity = checkScrollYToShowToTopButton() ? '1' : '0';
}

function checkScrollYToShowToTopButton() {
  return scrollY > (innerHeight / 3) * 2;
}

document.getElementById('to-top-btn').addEventListener('click', () => {
  toTop();
});

document.getElementById('to-next-btn').addEventListener('click', () => {
  toNext();
});

function toNext() {
  let nextSection = checkNextSection();
  if (!nextSection) return;
  nextSection.scrollIntoView({
    block: isNextSectionBreak(nextSection) ? 'center' : 'start',
  });
}

function isNextSectionBreak(nextSection) {
  return nextSection.dataset.sectionid === '3';
}

function checkNextSection() {
  return Array.from(observableSections).find(
    (section) =>
      Number.parseInt(sectionObserved.dataset.sectionid) ===
      Number.parseInt(section.dataset.sectionid) - 1
  );
}

function toTop() {
  scrollTo(0, 0);
}
