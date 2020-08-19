export function sliderEvent(e: Event) {
  // 去除事件默认行为
  e.stopPropagation();
  e.preventDefault();
}

export function getElementOffset(
  el: HTMLElement
): { top: number; left: number } {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }
  const { top, left } = el.getBoundingClientRect();

  //   替换window，回头要查一下
  const win = el.ownerDocument!.defaultView;
  return {
    top: top + win.pageYOffset,
    left: left + win.pageXOffset
  };
}
