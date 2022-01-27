export class UserId {
    id: string;

    constructor(id: string) {
        this.id = id.trim();
    }

    public toString(): string {
        return this.id;
    }
}
