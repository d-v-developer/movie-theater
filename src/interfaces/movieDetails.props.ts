export interface movieDetailsProps {
    short: {
        name: string,
        image: string,
        description: string,
        aggregateRating: {
            ratingValue: number
        }
        '@type': string,
        datePublished: string,
        duration: string,
        genre: string[]
        review: {
            name: string,
            reviewBody: string,
            dateCreated: string
        }
    },
    imdbId: string
}