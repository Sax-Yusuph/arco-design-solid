
export const getIndex = (childRef: HTMLDivElement, selector: string, parentClassName?: string) => {
  const parent = getParent(childRef, parentClassName)

  if (parent && childRef) {
    const index = Array.from(parent.querySelectorAll(selector)).indexOf(childRef)
    return index
  }

  return -1
}

const getParent = (childRef: HTMLDivElement, parentClassName?: string) => {
  let parent = childRef?.parentElement ?? undefined

  if (parentClassName) {
    while (parent && !parent.className.includes(parentClassName)) {
      parent = parent.parentElement ?? undefined
    }
  }

  return parent
}
