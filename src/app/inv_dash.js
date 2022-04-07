// animating the sidebar (open) for mobile / narrow displays

const sideBar = document.querySelector("aside");
const menuBtn = document.querySelector("#toggle-sidebar");
const closeBtn = document.querySelector("#close-btn");
//added check for menuBtn if it is null
if(menuBtn){
  menuBtn.addEventListener('click', () => {
    sideBar.style.display = 'block';
  })
}
//added check for clsoseBtn if it is null
if(closeBtn){
  closeBtn.addEventListener('click', () => {
    sideBar.style.display = 'none';
  })
}
//toggling between dark mode and light mode
const themeToggler = document.querySelector(".toggle-theme");
//added check for themeToggler if it is null
if(themeToggler!==null){
  themeToggler.addEventListener('click', () => {
    document.body.classList.toggle("dark-theme");

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
  });
}

//auto-resizing notes

let noteSize = document.getElementById('notes');
//added check for notesize if it is null
if(noteSize){
  noteSize.style.height = noteSize.scrollHeight + "px";
  noteSize.style.overflowY = "hidden";
  noteSize.addEventListener("input", adjust);
  function adjust() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + "px";
  }
}

