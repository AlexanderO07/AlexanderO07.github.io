let windowWidth = window.innerWidth;

window.addEventListener("load", function() {
  console.log("Window width:", windowWidth);

  if (windowWidth === 1280) {
    // console.log(`The window is perfectly sized at ${windowWidth}`);
  } else if (windowWidth < 1280) {
    const homeCbox = document.querySelector(".home__menu-link");
    const newWidth = homeCbox.offsetWidth - (windowWidth * 0.1);
    homeCbox.style.width = `${newWidth}px`;
  }
});

// fixing a clickable div that is gets to small on larger screens 
window.addEventListener("resize", function() {
  windowWidth = window.innerWidth;
  
  
  // console.log("Window width:", windowWidth); //clogs up console when resizing (WARNING)

  if (windowWidth === 1280) {
    console.log(`The window is perfectly sized at ${windowWidth}`); 
  } else if (windowWidth < 1280) {
    const homeCbox = document.querySelector(".home__menu-link"); //home
    const newWidth1 = homeCbox.offsetWidth - (windowWidth - 270);
    homeCbox.style.width = `${newWidth1}px`;
    const projectsCbox = document.querySelector(".projects__menu-link"); //projects
    const newWidth2 = projectsCbox.offsetWidth - (windowWidth - 370);
    projectsCbox.style.width = `${newWidth2}px`;
    const aboutCbox = document.querySelector(".about__menu-link"); //about
    const newWidth3 = aboutCbox.offsetWidth - (windowWidth - 330);
    aboutCbox.style.width = `${newWidth3}px`;
    const contactCbox = document.querySelector(".contact__menu-link"); //contact
    const newWidth4 = contactCbox.offsetWidth - (windowWidth - 340);
    contactCbox.style.width = `${newWidth4}px`;
  }
  
  this.window.location.reload(); // odd but simple fix for menu sizing issue
});

  // 2nd Attempt to fix resizing isssue by creating a new IntersectionObserver instance to detect whether 
  //white background of the nav element is accidently show after resizing the window from small to large.
  let observer;

  const createObserver = () => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          entry.target.style.transform = "translateX(-100%)";
          observer.unobserve(entry.target);
        }
      });
    });
  };
  
  const handleResize = () => {
    observer.disconnect();
    createObserver();
    observer.observe(target);
  };
  
  const target = document.querySelector(".nav-container");
  createObserver();
  observer.observe(target);
window.addEventListener("resize", handleResize);

