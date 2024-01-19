
export interface DiscordRewindData {
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

export interface PhotosRewindData {
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


export interface YoutubeRewindData {
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


export interface InstagramRewindData {
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



export interface Rewind {

    year: number;
    discord: DiscordRewindData | null;
    youtube: YoutubeRewindData | null;
    photos: PhotosRewindData | null;
    instagram: InstagramRewindData | null;
    general_stats: {
        amount_of_messages: number,
        amount_of_photos: number,
        amount_of_videos: number,
        amount_of_posts: number,
        amount_of_videos_watched: number,
        amount_of_comments: number,
        amount_of_likes: number,
        amount_of_reactions: number,
        amount_of_channels_subscribed: number,
    } | null;
    
}

export function blankRewind(year: number): Rewind {
    return {
        year: year,
        discord: null,
        youtube: null,
        photos: null,
        instagram: null,
        general_stats: null,
    }
}

export function populateGeneral(rewind: Rewind) {
    return rewind;
}

