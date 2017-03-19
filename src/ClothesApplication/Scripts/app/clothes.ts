export class ClothesItem {
    constructor(
        public Type: number,
        public Description: string,
        public Shop: string,
        public LastWornDate: Date,
        public LastWornDateString: String,
        public WornCount: number,
        public CreatedDate: Date,
        public LastModifiedDate: Date
    ) { }
}
