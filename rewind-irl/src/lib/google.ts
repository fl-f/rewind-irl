import path from "path-browserify";
import { download, getFilteredFiles } from "./dropbox";
import type { YoutubeRewindData } from "./rewind";


export class GoogleTakeout {

    private static async getSubscriptionData(path: string) : Promise<{name: string, url: string}[]> {
        return getFilteredFiles(path, (entry) => entry.name.endsWith('.csv')).then(async (files) => {
            return await download(files[0].path_lower as string).then((file) => {
                return new Promise<{ name: string, url: string }>((resolve) => {
                    const reader = new FileReader();
                    reader.readAsText(file.result.fileBlob);
                    
                    reader.onload = () => {
                        const data = reader.result as string;
                        const lines = data.split('\n');
                        const subscriptions = lines.slice(1).map((line) => {
                            const data = line.split(',');
                            return {
                                name: data[2],
                                url: data[1],
                            }
                        });

                

                        resolve(subscriptions);
                    };
                });
                
            });
            
        });
    }

    


    static async getYoutubeRewindData(folder: files.FolderMetadataReference | null) : Promise<YoutubeRewindData> {
        const subscriptions = GoogleTakeout.getSubscriptionData(path.join((folder.path_lower as string), "/YouTube and YouTube Music/subscriptions"));
      

        return {
            subscriptions: {
                subscriptions: await subscriptions,
                amount: (await subscriptions).length,
            }
        }
    }
}