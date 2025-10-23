fetch("../componentes/header.html")
  .then(res => res.text())
  .then(data => {
    // Insertar el header
    document.getElementById("header").innerHTML = data;

    // === Activar el enlace actual ===
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll("nav .menu a");

    links.forEach(link => {
      const href = link.getAttribute("href").split("/").pop();
      if (href === currentPage) {
        link.classList.add("activo");
      }
    });
  })
  .finally(() => {
    document.body.style.visibility = "visible";
  });
