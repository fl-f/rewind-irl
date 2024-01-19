import { Dropbox } from 'dropbox';

let dbx: Dropbox;


export async function init(token: string) {
    dbx = new Dropbox({ accessToken: token });

}

export async function getAccount() {
    return await dbx.usersGetCurrentAccount();
}

export function getDBX() {
    return dbx;
}

export async function listFolder(path: string) {
    return await dbx.filesListFolder({ path: path });
}

export async function download(path: string) {
    return await dbx.filesDownload({ path: path });
} 

export async function getFolderByName(path: string, name: string) {
    const files = await listFolder(path);
    const folder = files.result.entries.filter((entry) => entry.name === name);
    return folder ? folder[0] : null;
}

export async function getImages(path: string) {
    const files = await listFolder(path);
    const images = files.result.entries.filter((entry) => entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('.jpeg'));
    return images;
}