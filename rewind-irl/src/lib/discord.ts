import type { files } from "dropbox";
import type { DiscordRewindData } from "./rewind";
import { download, downloadZip, getFilteredFiles, listFolder } from "./dropbox";
import path from 'path-browserify';



interface message_data {
    number: number,
    histogram: any,
}

interface server_data {
    number: number,
    channels: {
        name: string,
        thumbnail: string,
        
    }[],

}


function wordFrequency(str: string) {
    let freq = str.split(' ')
    let number = freq.length;
    freq = freq.reduce((map, word) => {
        // Strip punctuation
        word = word.replace(/[^a-zA-Z]/g, '');
        if (word.length < 4) return map; // Keep it interesting
        map[word] = (map[word] || 0) + 1;
        return map;
    }, {});
    // convert into a sorted list
    let freqList  = Object.keys(freq).map(function(key) {
        return {
            word: key,
            frequency: freq[key]
        
        };
    });
        freqList.sort(function(a, b) {
            return b.frequency - a.frequency;
        });

    return {
        number: number,
        histogram: freqList,
    }
}

export class DiscordPackage {

    

    private static async process_servers(path2: string) : Promise<server_data> {

    
  

        return await download(path.join(path2, "/index.json")).then((file) => {
            return new Promise<server_data>((resolve) => {
                const reader = new FileReader();
                reader.readAsText(file.result.fileBlob);
                
                reader.onload = () => {
                    const data = reader.result as string;
                    let servers = JSON.parse(data);
                    
                    servers = Object.keys(servers).map((server: any) => {
                        return {
                            name: servers[server],
                            thumbnail: `https://cdn.discordapp.com/icons/${server}/guild_icon.png`

                        }
                    });

                    resolve({
                        number: servers.length,
                        channels: servers,
                    });
                };
            });
        });
                
    }


    private static  process_messages(path: string) : message_data {
        return getFilteredFiles(path, (entry) => entry.name.endsWith('.csv')).then(async (files) => {
            let data = {
                number: 0,
                text: '',
            }
    
            for (const file of files.slice(0, 5)) {

                let result = await download(file.path_lower as string).then((file) => {
                    // Get CSV data from file blob
                    return new Promise<{ number: number, text: string }>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsText(file.result.fileBlob);
                        
                        reader.onload = () => {
                            const data = reader.result as string;
                            const lines = data.split('\n');
                            const messages = lines.map((line) => {
                                let message = line.split(',');
                                message = message.slice(2, message.length > 3 ? -1 : undefined);
                                return message
                            });

                    

                            resolve({
                                number: messages.length - 1,
                                text: messages.join(' '),
                            });
                        };
                    });
                });
                
                data.number += result.number;
                data.text += ' ' + result.text;
            }

            
            
        

            const analysis = wordFrequency(data.text);

            

            return {
                number: data.number,
                histogram: analysis,
            }
            
        });


    }

    

    static async getDiscordRewindData(folder: files.FolderMetadataReference | null) : Promise<DiscordRewindData> {
        if (!folder) return {
            messages: {
                number: 0,
                histogram: {},
            },
            channels: {
                number: 0,
                channels: [],
            }
        };
    
        const messages = await DiscordPackage.process_messages(path.join((folder.path_lower as string),"/messages"));
        const servers = await DiscordPackage.process_servers(path.join((folder.path_lower as string), "/servers"));
       
        return {
            messages: messages,
            channels: servers,
        }
    }



}