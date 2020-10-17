export function waiter (ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
