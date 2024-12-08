export class Category {
    constructor(data, docId) {
        this.categoryId = data.categoryId;
        this.titleId = data.titleId;
        this.uid = data.uid;
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.docId = docId;
    }

    set_docId(id) {
        this.docId = id;
    }

    toFirestore() {
        return {
            categoryId: this.categoryId,
            titleId: this.titleId,
            content: this.content,
            uid: this.uid,
            timestamp: this.timestamp,
        };
    }
}
