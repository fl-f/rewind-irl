import { Dropbox } from 'dropbox';


var dbx: Dropbox;


export function init(token: string) {
    dbx = new Dropbox({ accessToken: token });
}

export async function listFolder(path: string) {
    return await dbx.filesListFolder({ path: path });
}

export async function download(path: string) {
    return await dbx.filesDownload({ path: path });
} 

export async function getImages(path: string) {
    const files = await listFolder(path);
    const images = files.result.entries.filter((entry) => entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('.jpeg'));
    return images;
}