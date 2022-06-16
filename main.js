const options = {
  root: document.querySelector(".landing-img"),
  rootMargin: "0px",
  threshold: 0,
};

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry);
  });
};

let observer = new IntersectionObserver(callback, options);

let target = document.getElementById("whoAmI");

observer.observe(target);
