document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector("#hamburger");
  const navlist = document.querySelector("nav ul");

  const openIcon = "./images/icon-hamburger.svg";
  const closeIcon = "./images/icon-close-menu.svg";

  const navToggle = () => {
    const src = burger.getAttribute("src");
    src != closeIcon //is the present menu icon the one to close the menu?
      ? burger.setAttribute("src", closeIcon) // change the icon to the close icon
      : burger.setAttribute("src", openIcon); // change the icon back to the usual hamburger

    navlist.classList.toggle("close"); // open or close the nav menu

    document.querySelector("nav .modal").classList.toggle("modal-open"); //toggle the modal
  };

  const mainModalToggle = () => {
    backModal.classList.toggle("modal-open");
    backModal.classList.toggle("close");
  };

  // toggling the nav menu on mobile
  burger.addEventListener("click", (e) => {
    navToggle();
  });

  // toggle the nav menu when a link from the nav is clicked
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      navToggle();
    });
  });

  // progress bar functionality
  const progressBar = document.getElementsByClassName("progress-bar")[0];
  progressBar.addEventListener("click", (e) => {
    const computedStyle = getComputedStyle(progressBar);
    const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;

    console.log(width);
    progressBar.style.setProperty("--width", width + 1);
  });

  // back this project modal functionality
  const backModal = document.querySelector(".backerModal");
  document.querySelector(".back").addEventListener("click", (e) => {
    mainModalToggle();
  });

  // show the modal if "Get started" is clicked from the nav
  document.querySelector("#start").addEventListener("click", (e) => {
    mainModalToggle();
    navToggle();
  });

  // closing the modal if the close icon is pressed
  document.querySelector(".closeModal").addEventListener("click", (e) => {
    mainModalToggle();
  });

  // selecting a pledge from the modal
  document.querySelectorAll(".check").forEach((pledge) => {
    pledge.addEventListener("click", (e) => {
      // remove the checked style and classname from all other pledges
      document.querySelectorAll(".modalContent div").forEach((others) => {
        others.classList.remove("checked");
      });

      // go up 2 levels and add the classname to the main card for the pledge
      pledge.parentNode.parentNode.classList.add("checked");
    });
  });

  // displaying the success message after the confirmation
  document.querySelectorAll(".confirm a").forEach((submit) => {
    submit.addEventListener("click", (e) => {
      // close the main modal
      mainModalToggle();

      //show the success modal
      document.querySelector(".successModal").classList.toggle("modal-open");
      document.querySelector(".successModal").classList.toggle("close");
    });
  });
});
