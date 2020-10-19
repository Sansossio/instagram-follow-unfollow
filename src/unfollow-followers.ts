(async () => {
  const INTERVAL = 20 * 1000
  const followersButton: HTMLButtonElement =
    document.querySelector('#react-root > section > main > div > header > section > ul > li:nth-child(2) > a')

  if (!followersButton) {
    alert('You must be inside your instagram profile')
    return
  }

  function waiter (ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  function scrollParent (to: number) {
    let parentDiv = document.querySelector('body > div.RnEpo.Yx5HN > div > div > div.isgrP')
    if (parentDiv) {
      parentDiv.scrollTop = to || parentDiv.scrollHeight
    }
  }

  function getFollowButton () {
    const buttonText = 'Following'
    const button = Array.from(document.querySelectorAll('button'))
      .filter(button => button.textContent === buttonText)[0]
    return button
  }

  followersButton.click()

  // Wait 1 second after like button click
  await waiter(1 * 1000)

  console.log(`# Running auto unfollow-followers script with ${INTERVAL / 1000}s interval between actions`)

  let count = 0

  while (true) {
    const button = getFollowButton()
    if (!button) {
      console.log('No button found')

      // Scroll likes div to end
      scrollParent(0)

      await waiter(INTERVAL)
      continue
    }

    scrollParent((button.parentNode.parentNode as any).offsetTop)
    button.click()

    // Confirmation modal
    await waiter(300)

    const confirmationModal: any = document.querySelector('body > div:nth-child(18) > div > div > div > div.mt3GC > button.aOOlW.-Cab_')
    confirmationModal?.click()

    console.log(`-> Unfollowing user (${++count})`)

    await waiter(INTERVAL)
  }
})()
