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

  function scrollParent (button: HTMLButtonElement) {
    let parentDiv = document.getElementsByClassName('Igw0E IwRSH eGOV_ vwCYk i0EQd')[0]
    if (parentDiv) {
      parentDiv = parentDiv.getElementsByTagName('div')[0]
      const offsetTop = (button.parentNode.parentNode as any).offsetTop
      parentDiv.scrollTop = offsetTop
    }
  }

  function getFollowButton () {
    const buttonText = 'Follow'
    const button = Array.from(document.querySelectorAll('button'))
      .filter(button => button.textContent === buttonText)[0]
    return button
  }

  likeButton.click()
  await waiter(500)

  console.log(`# Running auto follow script with ${INTERVAL / 1000}s interval between action`)

  let count = 0

  while (true) {
    const button = getFollowButton()
    if (!button) {
      console.log('No button found')
      await waiter(INTERVAL)
      continue
    }
    scrollParent(button)
    button.click()
    console.log(`-> Following new user (${++count})`)
    await waiter(INTERVAL)
  }
})()
