function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function createPortalRoot() {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', ' ');

  return portalRoot;
}

function createWrapperAndAppendToBody(wrapperID: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperID);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
}

function isChildOf(elem: HTMLElement, parent: HTMLElement) {
  let e = elem.parentNode as Node | null;
  while (e) {
    if (e === parent) {
      return true;
    }
    e = e.parentNode;
  }

  return false;
}

export { uuidv4, createPortalRoot, createWrapperAndAppendToBody, isChildOf };
