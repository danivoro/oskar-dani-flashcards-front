export default interface IFlashcard {
    card_id: number;
    front: string;
    back: string;
    next_review: Date;
    streak: number;
}
