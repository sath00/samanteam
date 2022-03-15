// animating the sidebar (open) for mobile / narrow displays

const sideBar = document.querySelector("aside");
const menuBtn = document.querySelector("#toggle-sidebar");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
  sideBar.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
  sideBar.style.display = 'none';
})

//toggling between dark mode and light mode

const themeToggler = document.querySelector(".toggle-theme");

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle("dark-theme");

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

//auto-resizing notes

let noteSize = document.getElementById('notes');

noteSize.style.height = noteSize.scrollHeight + "px";
noteSize.style.overflowY = "hidden";
noteSize.addEventListener("input", adjust);
function adjust(){
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + "px";
}

//filling inventory table

Products.forEach(product => {
  const tr = document.createElement('tr');
  const trContent = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                `
  tr.innerHTML = trContent;
  document.querySelector('table tbody').appendChild(tr);
})
