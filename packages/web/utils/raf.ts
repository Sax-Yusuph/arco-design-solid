const target = typeof window === 'undefined' ? global : window
const vendors = ['webkit', 'ms', 'moz', 'o']

let raf: any = (target as unknown as Window).requestAnimationFrame
let caf: any = (target as unknown as Window).cancelAnimationFrame

if (!raf || !caf) {
  vendors.some(prefix => {
    const rafKey = `${prefix}RequestAnimationFrame` as keyof typeof target
    const cafKey = `${prefix}CancelRequestAnimationFrame` as keyof typeof target
    raf = target[rafKey]
    caf = target[rafKey] || target[cafKey]
    return raf && caf
  })

  if (!raf || !caf) {
    let lastTime = 0
    raf = function (cb: () => void) {
      const currentTime = Date.now()
      const diff = Math.max(0, 16 - (currentTime - lastTime))
      const timer = setTimeout(() => {
        cb()
        lastTime = currentTime + diff
      }, diff)
      return timer
    }

    caf = function (timer: number) {
      clearTimeout(timer)
    }
  }
}

raf = raf.bind(target)
caf = caf.bind(target)

export { caf, raf }
