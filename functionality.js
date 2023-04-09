const track = document.getElementById("image-track");

const down = e => {
  track.dataset.mouseDownAt = e.clientX;
  
  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      width: `30vmax`,
      opacity: "1"
    }, {duration: 300, fill: "forwards"});
  }
  track.animate({
    transform: `translate(${nextPerc}%, -20%)`
  }, {duration: 600, fill:"forwards"});
}
const up = () => {
  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      width: `25vmax`,
      opacity: "0.25"
    }, {duration: 150, fill: "forwards"});
  }

  track.animate({
    transform: `translate(${track.dataset.percent}%, -10%)`
  }, {duration: 600, fill:"forwards"});

  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percent;
}
const move = e => {
    if (track.dataset.mouseDownAt === "0") return;
        
    const mousedelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxdelta = window.innerWidth / 2;

    const perc = (mousedelta / maxdelta) * -100,
    nextUncPerc = parseFloat(track.dataset.prevPercentage) + perc,
    nextPerc = Math.max(Math.min(nextUncPerc, 0), -100);

    track.dataset.percent = nextPerc;

    for (const image of track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPerc}% 50%`
      }, {duration: 1200, fill: "forwards"});
    }

    track.animate({
      transform: `translate(${nextPerc}%, -20%)`
    }, {duration: 1200, fill: "forwards"});
}

document.getElementById("image-track").addEventListener('mousedown', function(e){down(e)})
document.getElementById("image-track").addEventListener('touchstart', function(e){down(e.touches[0])})

document.getElementById("image-track").addEventListener('mouseup', up)
document.getElementById("image-track").addEventListener('touchend', up)

document.getElementById("image-track").addEventListener('mousemove', function(e){move(e)})
document.getElementById("image-track").addEventListener('touchmove', function(e){move(e.touches[0])})