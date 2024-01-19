import type { files } from "dropbox";
import type { DiscordRewindData } from "./rewind";
import { downloadZip, getFilteredFiles, listFolder } from "./dropbox";


interface message_data {
    number: number,
    histogram: {
        [key: string]: number
    }
}

export class DiscordPackage {

    

    

    private static process_messages(path: string) : message_data {
        downloadZip(path).then((zip) => {
            console.log(zip);
        });

        return {
            number: 0,
            histogram: {}
        }
    }

    static getDiscordRewindData(folder: files.FolderMetadataReference | null) : DiscordRewindData | null {
        if (!folder) return null;
    
        const messages = DiscordPackage.process_messages(folder.path_lower as string);
        return null;
    }



}