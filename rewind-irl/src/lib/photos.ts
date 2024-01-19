import type { files } from "dropbox";
import type { DiscordRewindData, PhotosRewindData } from "./rewind";
import { download, downloadZip, getFilteredFiles, listFolder } from "./dropbox";

interface photo {
    name: string,
    file: string,
    date: Date,
}

export class PhotosFolder {

    
    private static process_photos(path: string) : photo[] {


        return getFilteredFiles(path, (entry) => entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('.jpeg')).then((files) => {
            files.forEach((file) => {
                
            });

            download(files[0].path_lower as string).then((file) => {
                [
                    {
                        file: URL.createObjectURL(file.result.fileBlob),
                        name: file.result.name,
                        date: new Date(file.result.client_modified),
                    }
                ];
            });
        });

        return [];
    }



    static getPhotosRewindData(folder: files.FolderMetadataReference | null) : PhotosRewindData | null {
        if (!folder) return null;
        
        const photos = PhotosFolder.process_photos(folder.path_lower as string);
     
        return null;
    }



}