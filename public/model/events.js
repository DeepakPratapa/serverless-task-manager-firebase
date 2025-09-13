export class Events {
    constructor(data, docId) {
        this.categoryId = data.categoryId;
        this.uid = data.uid;
        this.timestamp = data.timestamp;
        this.eventName = data.eventName;
        this.docId = docId;
    }

    set_docId(id) {
        this.docId = id;
    }

    toFirestore() {
        return {
            categoryId: this.categoryId,
            uid: this.uid,
            timestamp: this.timestamp,
            eventName: this.eventName,
            
            
        };
    }
}