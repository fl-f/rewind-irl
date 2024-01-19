import { Dropbox, type files } from 'dropbox';

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

export async function listFolder(path: string, recursive: boolean = false) {
    return await dbx.filesListFolder({ path: path, recursive: recursive });
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

export async function getVideos(path: string) {
    const files = await listFolder(path);
    const videos = files.result.entries.filter((entry) => entry.name.endsWith('.mp4'));
    return videos;
}


export async function getFilteredFiles(path: string, filter: (entry: files.FileMetadataReference) => boolean) {
    const files = await listFolder(path, true);
    
    const filtered = (files.result.entries as files.FileMetadataReference[]).filter(filter);
    return filtered;
}

export async function downloadZip(path: string) {
    return await dbx.filesDownloadZip({ path: path });
}


export async function getFiles(path: string) {
    const files = await listFolder(path);
    const filesList = files.result.entries;
    return filesList;
}