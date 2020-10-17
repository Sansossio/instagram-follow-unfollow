(async () => {
  const INTERVAL = 30 * 1000
  const likeButton: HTMLButtonElement = document.querySelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.EDfFK.ygqzn > div > div.Nm9Fw > button')
  if (!likeButton) {
    alert('You must be inside an instagram publication')
    return
  }

  function waiter (ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  function scrollParent (to: number) {
    let parentDiv = document.getElementsByClassName('Igw0E IwRSH eGOV_ vwCYk i0EQd')[0]
    if (parentDiv) {
      parentDiv = parentDiv.getElementsByTagName('div')[0]
      parentDiv.scrollTop = to
    }
  }

  function getFollowButton () {
    const buttonText = 'Follow'
    const button = Array.from(document.querySelectorAll('button'))
      .filter(button => button.textContent === buttonText)[0]
    return button
  }

  likeButton.click()

  // Wait 1 second after like button click
  await waiter(1 * 1000)

  console.log(`# Running auto follow script with ${INTERVAL / 1000}s interval between actions`)

  let count = 0

  while (true) {
    const button = getFollowButton()
    if (!button) {
      console.log('No button found')

      // Scroll likes div to end
      scrollParent(10 * 1000 * 1000)

      await waiter(INTERVAL)
      continue
    }
    scrollParent((button.parentNode.parentNode as any).offsetTop)
    button.click()
    console.log(`-> Following new user (${++count})`)
    await waiter(INTERVAL)
  }
})()
