class UtilsService {
    uuidv4() {
        return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        );
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
