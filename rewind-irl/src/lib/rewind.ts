
export interface DiscordRewindData {

    channels : {
        number: number,
        channels: {
            name: string,
            thumbnail: string,
        }[]
    }
    messages: {
        number: number,
        histogram: {
            number: number,
            histogram: {
                frequency: number,
                word: string
            }[],
        },
        
    },


}

export interface PhotosRewindData {
    photos: {
        name: string,
        file: string,
        date: Date,
    }[],

    videos: {
        name: string,
        file: string,
        date: Date,
    }[],
}


export interface YoutubeRewindData {


    subscriptions: {
        amount: number,
        subscriptions: {
            name: string,
            url: string,
        }[]
    }


}


export interface InstagramRewindData {

    posts: {
        file: string,
        date: Date,
    }[],
    profile_picture: string,

}



export interface Rewind {


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

export function blankRewind(): Rewind {
    return {
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

