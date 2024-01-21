class UtilsService {
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    createPortalRoot() {
        const portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'portal-root');

        return portalRoot;
    }

    createWrapperAndAppendToBody(wrapperID: string) {
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('id', wrapperID);
        document.body.appendChild(wrapperElement);

        return wrapperElement;
    }
}
export const utilsService = new UtilsService();
