const body = document.getElementsByTagName('body')[0];
const burguerMenuIcon = document.getElementById('burguer-menu-icon');
const topLine = burguerMenuIcon.querySelector('#top');
const midLine = burguerMenuIcon.querySelector('#mid');
const botLine = burguerMenuIcon.querySelector('#bot');

let mobileMenuExpanded = false;

burguerMenuIcon.addEventListener('click', () => {
  mobileMenuExpanded = !mobileMenuExpanded;
  if (mobileMenuExpanded) {
    body.className = 'mobile-menu-expanded';
    burguerToCross();
  } else {
    body.className = '';
    crossToBurguer();
  }
});

function burguerToCross() {
  midLine.style.opacity = '0';
  topLine.style.transform = 'translateY(10px)';
  botLine.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    topLine.style.transform = 'translateY(10px) translateX(2px) rotate(45deg)';
    botLine.style.transform =
      'translateY(-10px) translateX(2px) rotate(-45deg)';
  }, 300);
}

function crossToBurguer() {
  topLine.style.transform = 'translateY(10px) rotate(0)';
  botLine.style.transform = 'translateY(-10px) rotate(0)';
  setTimeout(() => {
    midLine.style.opacity = '1';
    topLine.style.transform = 'translate(0)';
    botLine.style.transform = 'translateY(0)';
  }, 300);
}
