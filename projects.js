function init() {
  const slider = document.querySelector(".slider");
  const nextBtn = document.querySelector(".slider .nav .next");
  const prevBtn = document.querySelector(".slider .nav .prev");
  const items = document.querySelectorAll(".slider .item");
  let current = 0;

  prevBtn.style.opacity = "0";

  // Add event listener to nextBtn to change prevBtn's opacity to 1 when clicked
  nextBtn.addEventListener("click", function () {
    prevBtn.style.opacity = "1";
  });

  items.forEach((item) => {
    const textWrapper = item.querySelector(".wrap");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letters'>$&</span>"
    );
  });

  function anim(current, next, callback) {
    const currentImgs = current.querySelectorAll(".img");
    const currentText = current.querySelectorAll(".content .letter");

    const nextImgs = next.querySelectorAll(".img");
    const nextText = next.querySelectorAll(".content .letters");

    const t = 300; //time
    const offset = "-=" + t * 0.4;
    const imgOffset = t * 0.8;

    const t1 = anime.timeline({
      easing: "easeInOutQuint",
      duration: t,
      complete: callback,
    });

    t1.add({
      targets: currentText,
      translateY: [0, "-2em"],
      opacity: [1, 0],
      easing: "easeInQuint",
      duration: t,
      delay: (el, i) => 30 * (i + 1),
    })
      .add(
        {
          targets: currentImgs[1],
          translateY: -600,
          translateZ: 0,
          translateX: 200,
          rotate: [0, "-45deg"],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        offset
      )
      .add({
        targets: current,
        opacity: 0,
        visibility: "hidden",
        duration: 200,
        easing: "easeInCubic",
      })
      .add(
        {
          targets: next,
          opacity: 1,
          visibility: "visible",
          duration: 100,
        },
        offset
      )
      .add(
        {
          targets: nextImgs[0],
          translateY: [600, -300],
          translateZ: 0,
          translateX: -200,
          rotate: ["45deg", "-10deg"],
          opacity: [0, 1],
          easing: "easeInCubic",
          duration: 200,
        },
        offset
      )
      .add({
        targets: nextText,
        translateY: ["2em", 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeInOutCubic",
        duration: t * 1.5,
      });
  }

  let isPlaying = false;

  function updateSlider(newIndex) {
    const currentItem = items[current];
    const newItem = items[newIndex];

    if (newIndex === 0) {
      prevBtn.style.opacity = "0";
      prevBtn.onclick = null;
    }

    function callback() {
      currentItem.classList.remove("is-active");
      newItem.classList.add("is-active");
      current = newIndex;
      isPlaying = false;
    }

    anim(currentItem, newItem, callback);
  }

  function next() {
    if (isPlaying) return;
    isPlaying = true;
    const newIndex = current === items.length - 1 ? 0 : current + 1;
    updateSlider(newIndex);
  }

  function prev() {
    if (isPlaying) return;
    isPlaying = true;
    const newIndex = current === items.length + 1 ? 0 : current - 1;
    updateSlider(newIndex);
  }
  nextBtn.onclick = next;
  prevBtn.onclick = prev;
}

document.addEventListener("DOMContentLoaded", init);

document.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    const x = event.pageX - 10;
    const y = event.pageY - 10;
    const cursor = document.querySelector("#cursor");
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  }, 50);
});

const cursor = document.querySelector("#cursor");

next.forEach((next) => {
  next.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(0.2)";
  });

  next.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
  });
});
