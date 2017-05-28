export class ClothesItem {
    constructor(
        public Id: number,
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

export class FileExists {
    constructor(
        public ItExists: boolean) { }
}
