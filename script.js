const container = document.getElementById("container");

document.addEventListener("mousemove", (e) => {

  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  container.style.transform = `translate(${x}px, ${y}px)`;

});
