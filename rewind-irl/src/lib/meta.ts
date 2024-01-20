import path from "path-browserify";
import { download, getFilteredFiles } from "./dropbox";
import type { InstagramRewindData, YoutubeRewindData } from "./rewind";

export class MetaDataDownload {

    private static get_date_from_path(path: string) : Date {
        const date = path.split("/")[path.split("/").length - 2].split(".")[0];
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        return new Date(`${year}-${month}-01`);
    }

    private static async getPosts(path: string) : Promise<{file: string, date: Date}[]> {
        return getFilteredFiles(path, (entry) => entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('.jpeg')).then(async (files) => {
            console.log(files)
            return Promise.all(files.map(async (file) => {

                    return download(file.path_lower as string).then((file) => {
                        console.log(MetaDataDownload.get_date_from_path(file.result.path_display as string))
                        return {
                                file: URL.createObjectURL(file.result.fileBlob),
                                date: MetaDataDownload.get_date_from_path(file.result.path_display as string),
                            };
                    });
                }));
        });
    }
    
    static async getInstagramRewindData(folder: files.FolderMetadataReference | null) : Promise<InstagramRewindData> {
        if (!folder) return {
            posts: [],
        }
        const posts = MetaDataDownload.getPosts(path.join((folder.path_lower as string), "/media/posts"));
        return {
            posts: await posts,
        }
    }



}