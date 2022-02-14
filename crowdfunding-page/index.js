document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector("#hamburger");
  const navlist = document.querySelector("nav ul");

  const selectRewardButton = document.querySelectorAll(".about a");

  const backModal = document.querySelector(".backerModal"); // the modal for the selections

  const openIcon = "./images/icon-hamburger.svg";
  const closeIcon = "./images/icon-close-menu.svg";

  // to format number to USD currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const navToggle = () => {
    const src = burger.getAttribute("src");
    src != closeIcon //is the present menu icon the one to close the menu?
      ? burger.setAttribute("src", closeIcon) // change the icon to the close icon
      : burger.setAttribute("src", openIcon); // change the icon back to the usual hamburger

    navlist.classList.toggle("close"); // open or close the nav menu

    document.querySelector("nav .modal").classList.toggle("modal-open"); //toggle the modal
  };

  const mainModalToggle = (selection) => {
    backModal.classList.toggle("modal-open");
    backModal.classList.toggle("close");
    let availableArray = [];

    const availables = Array.from(
      document.querySelectorAll(".about .available")
    );
    // the array of the available units of pledges
    for (let item of availables)
      availableArray.push(item.innerText.split(" ")[0]);

    const edits = Array.from(backModal.querySelectorAll(".available")); //the number available showing on the modal
    edits.forEach((pledge) => {
      const figure = availableArray[edits.indexOf(pledge)];
      // put the respective numbers from the home page
      pledge.innerHTML = `${figure} <span> left<span>`;

      if (figure == 0) pledge.parentNode.classList.add("completed"); //disable selection if number is complete

      if (selection) {
        // if a pledge was clicked from the home page
        backModal.querySelectorAll(".card").forEach((card) => {
          card.classList.remove("checked"); // cancel other selection
        });
        backModal.querySelectorAll(".card")[selection].classList.add("checked"); // preselect the pledge in the modal
        backModal.scrollTo(0, selection * 350); // scroll to the pledge in the modal
      }
    });
  };

  const successToggle = () => {
    document.querySelector(".successModal").classList.toggle("modal-open");
    document.querySelector(".successModal").classList.toggle("close");
  };

  // toggling the nav menu on mobile
  burger.addEventListener("click", (e) => {
    if (window.visualViewport.width < 768) {
      navToggle();
    }
  });

  // toggle the nav menu when a link from the nav is clicked
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // if not on mobile or tablet device
      if (window.visualViewport.width < 768) {
        navToggle();
      }
    });
  });

  // changing the bookmark button text when clicked
  const bookmark = document.querySelectorAll(".large")[0];
  bookmark.addEventListener("click", (e) => {
    bookmark.innerText = "Bookmarked";
  });

  // progress bar functionality
  // const progressBar = document.getElementsByClassName("progress-bar")[0];
  // progressBar.addEventListener("click", (e) => {
  //   const computedStyle = getComputedStyle(progressBar);
  //   const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;

  //   console.log(width);
  //   progressBar.style.setProperty("--width", width + 1);
  // });

  // back this project modal functionality
  document.querySelector(".back").addEventListener("click", (e) => {
    mainModalToggle();
  });

  // show the modal if "Get started" is clicked from the nav
  document.querySelector("#start").addEventListener("click", (e) => {
    mainModalToggle();
    if (window.visualViewport.width < 768) {
      navToggle();
    }
  });

  // closing the modal if the close icon is pressed
  document.querySelector(".closeModal").addEventListener("click", (e) => {
    mainModalToggle();
  });

  // simulating click on radio when header is clicked
  document.querySelectorAll(".card h3").forEach((heading) => {
    heading.addEventListener("click", (e) => {
      //if the pledge is not out
      if (!heading.parentNode.parentNode.classList.contains("completed")) {
        const radio = e.target.parentNode.querySelector(".check");
        radio.click(); // simulate a click event on the associated radio
      }
    });
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
      const pledgeCard = e.target.parentNode.parentNode; // grab the pledge

      const amount = Number(
        e.target.parentNode.querySelectorAll(".price")[0].innerText // the associated pledge amount
      );

      const availableElement = pledgeCard.querySelector(".available");

      //if it's not the first card which isn't tracked
      if (availableElement) {
        const available = availableElement.innerText.split(" ")[0] - 1 || 0;

        const index =
          Array.from(backModal.querySelectorAll(".card")).indexOf(pledgeCard) -
          1; // get the index of the pledge

        const homeCard = document.querySelectorAll(".selection")[index]; // the pledge in the home page
        homeCard.querySelector(
          ".available"
        ).innerHTML = `${available} <span> left<span>`; // edit the available at home

        // update the amount raised
        const raised = Number(
          document
            .querySelectorAll(".raised")[0]
            .innerText.replace(/[^0-9.-]+/g, "") //convert to number and remove non-numeric
        );

        document.querySelectorAll(".raised")[0].innerText = `${
          formatter.format(raised + amount) //add the new pledge amount to the raised total
        }`;
      }

      // increment the total backers
      const backers = Number(
        document
          .querySelectorAll(".backers")[0]
          .innerText.replace(/[^0-9.-]+/g, "")
      );
      document.querySelectorAll(
        ".backers"
      )[0].innerText = `${new Intl.NumberFormat("en-US").format(backers + 1)}`;

      // close the main modal
      mainModalToggle();

      //show the success modal
      successToggle();
    });
  });

  // closing the success modal when 'Got it' is pressed
  document.querySelector(".done").addEventListener("click", (e) => {
    successToggle();
  });

  // displaying the success modal when a pledge is made from the page without the modal
  selectRewardButton.forEach((pledge) => {
    pledge.addEventListener("click", (e) => {
      const card = pledge.parentNode; // the pledge div
      const availableNumber = card.querySelector(".available"); // the p element inidcating the available
      const available = availableNumber.innerText.split(" ")[0];

      let selection = Array.from(selectRewardButton).indexOf(pledge) + 1; // the position of the clicked pledge

      if (available == 0) e.preventDefault();
      //if the option is out
      else {
        mainModalToggle(selection);
      }
    });
  });
});
