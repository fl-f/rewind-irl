
interface DiscordRewindData {
    year: number;
    channels : Array<{
        name: string,
        thumbnail: string,
        messagesSent: number,
    }>,
    friends : Array<{
        name: string,
        avatar: string,
        messagesSent: number,
    }>,
    messagesSent: number,
    messagesReceived: number,
    reactionsSent: number,

}

interface PhotosRewindData {
    year: number;
    photos: Array<{
        name: string,
        file: string,
        date: Date,
    }>,

    videos: Array<{
        name: string,
        file: string,
        date: Date,
    }>,
}


interface YoutubeRewindData {
    year: number;
    videos_watched: {
        amount: number,
        watch_time: number,
        comments: number,
        likes: number,
        sample: Array<{
            url: string,
        }>

    }

    channels_subscribed : {
        amount: number,
        channels: Array<{
            name: string,
            thumbnail: string,
        }>
    }


}


interface InstagramRewindData {
    year: number;
    posts: Array<{
        name: string,
        file: string,
        date: Date,
        likes: number,
        comments: number,
        link: string
    }>,

}



interface Rewind {

    year: number;
    discord: DiscordRewindData | null;
    youtube: YoutubeRewindData | null;
    photos: PhotosRewindData | null;
    instagram: InstagramRewindData | null;

}