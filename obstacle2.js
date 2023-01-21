import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

// ground and obstacle should move at the same speeed
const SPEED2 = 0.03
// min time to spawn obstacle
const OBSTACLE2_INTERVAL_MIN = 1200
// max time to spawn obstacle should be longer than 2000 miliseconds
const OBSTACLE2_INTERVAL_MAX = 7000
// we need this element to add the elements to our game
const worldElem2 = document.querySelector("[data-game]")

let nextObstacle2Time
export function setupObstacle2() {
  // spawn an obstacle quickly once the game starts
  nextObstacle2Time = OBSTACLE2_INTERVAL_MIN
  // remove all obstacles before the game starts again
  document.querySelectorAll("[data-obstacle]").forEach(obstacle2 => {
    obstacle2.remove()
  })
}

export function updateObstacle2(delta, speedScale) {
  document.querySelectorAll("[data-obstacle]").forEach(obstacle2 => {
    incrementCustomProperty(obstacle2, "--left", delta * speedScale * SPEED2 * -1)
    if (getCustomProperty(obstacle2, "--left") <= -100) {
      obstacle2.remove()
    }
  })

  if (nextObstacle2Time <= 0) {
    createObstacle2()
    // speedScale ima tuka za da spawn pobrzo obstacle u igrata za da bide potesko
    nextObstacle2Time =
      randomNumberBetween(OBSTACLE2_INTERVAL_MIN, OBSTACLE2_INTERVAL_MAX) / speedScale
  }
  // make the next obstacle time smaller to eventually reach 0 and spawn new obstacle
  nextObstacle2Time -= delta
}

export function getObstacle2Rects() {
  return [...document.querySelectorAll("[data-obstacle]")].map(obstacle2 => {
    // this getBoundingClientRect gives out the dimensions for our obstacle
    return obstacle2.getBoundingClientRect()
  })
}

function createObstacle2() {
  const obstacle = document.createElement("img")
  obstacle.dataset.obstacle = true
  // todo: set img drugo nft
  obstacle.src = "imgs/obstacle2.png"
  // todo: smeni klasa nft
  obstacle.classList.add("obstacle2")
  setCustomProperty(obstacle, "--left", 100)
  worldElem2.append(obstacle)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}