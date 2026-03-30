import './style.css'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Page setup
document.body.style.height = "300vh"
document.body.style.background = "#111"
document.body.style.color = "white"
document.body.style.fontFamily = "Arial"

// COOLER (center)
const cooler = document.createElement("img")
cooler.src = "https://via.placeholder.com/250?text=COOLER"
cooler.style.position = "fixed"
cooler.style.top = "50%"
cooler.style.left = "50%"
cooler.style.transform = "translate(-50%, -50%)"
cooler.style.width = "250px"

document.body.appendChild(cooler)

// TRACTOR (start from left)
const tractor = document.createElement("img")
tractor.src = "https://search.brave.com/images?q=tractor"
tractor.style.position = "fixed"
tractor.style.top = "50%"
tractor.style.left = "-300px"
tractor.style.width = "300px"

document.body.appendChild(tractor)

// TEXT (hidden initially)
const text = document.createElement("div")
text.innerText = "UNBREAKABLE COOLER 💪\nShock Resistant | Heavy Duty | Premium Build"
text.style.position = "fixed"
text.style.top = "70%"
text.style.left = "50%"
text.style.transform = "translateX(-50%)"
text.style.opacity = "0"
text.style.textAlign = "center"
text.style.fontSize = "24px"

document.body.appendChild(text)

// TIMELINE (main animation)
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
})

// Tractor moves → hits cooler
tl.to(tractor, {
  left: "40%",
  duration: 2
})

// Impact effect (shake cooler)
.to(cooler, {
  x: 20,
  repeat: 5,
  yoyo: true,
  duration: 0.1
})

// Tractor stops
.to(tractor, {
  left: "45%",
  duration: 1
})

// Show specs text
.to(text, {
  opacity: 1,
  duration: 1
})
