export class Category {
    constructor(data, docId) {
        this.categoryName = data.categoryName;
        this.uid = data.uid;
        this.timestamp = data.timestamp;
        this.docId = docId;
    }

    set_docId(id) {
        this.docId = id;
    }

    toFirestore() {
        return {
            categoryName: this.categoryName,
            uid: this.uid,
            timestamp: this.timestamp,
        };
    }
}