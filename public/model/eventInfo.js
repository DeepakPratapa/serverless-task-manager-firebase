export class EventInfo {
    constructor(data, docId) {
        this.eventId = data.eventId;
        this.uid = data.uid;
        this.timestamp = data.timestamp;
        this.description = data.description;
        this.relevantAttachment = data.relevantAttachment;
        this.dueDates = data.dueDates;
        this.notificationMethods = data.notificationMethods;
        this.reminderIntervals = data.reminderIntervals;
        this.docId = docId;
    }

    set_docId(id) {
        this.docId = id;
    }

    toFirestore() {
        return {
            eventId: this.eventId,
            uid: this.uid,
            timestamp: this.timestamp,
            description: this.description,
            relevantAttachment: this.relevantAttachment,
            dueDates: this.dueDates,
            notificationMethods: this.notificationMethods,
            reminderIntervals: this.reminderIntervals,
        };
    }
}