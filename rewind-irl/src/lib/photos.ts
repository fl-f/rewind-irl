import type { files } from "dropbox";
import type { DiscordRewindData, PhotosRewindData } from "./rewind";
import { download, downloadZip, getFilteredFiles, listFolder } from "./dropbox";

interface photo {
    name: string,
    file: string,
    date: Date,
}

export class PhotosFolder {

    
    private static async process_photos(path: string) : Promise<photo[]> {


        return getFilteredFiles(path, (entry) => entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('.jpeg')).then(async (files) => {
            // return Promise.all(files.map(async (file) => {
            //     return download(file.path_lower as string).then((file) => {
            //         return {
            //                 file: URL.createObjectURL(file.result.fileBlob),
            //                 name: file.result.name,
            //                 date: new Date(file.result.media_info.metadata.time_taken),
            //             };
            //     });
            // }));

            
            return download(files[0].path_lower as string).then((file) => {
                    console.log(file)
                    return [{
                             file: URL.createObjectURL(file.result.fileBlob),
                             name: file.result.name,
                             date: new Date(file.result.media_info.metadata.time_taken),
                         }];
                 });
            
        });

        return [];
    }



    static async getPhotosRewindData(folder: files.FolderMetadataReference | null) : PhotosRewindData | null {
        if (!folder) return null;
        
        const photos = await PhotosFolder.process_photos(folder.path_lower as string);
        return {
            photos: photos,
            videos: [],
        }
    }



}