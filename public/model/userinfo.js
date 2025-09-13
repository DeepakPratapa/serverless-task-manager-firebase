export class UserInfo {
    constructor(data, docId) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.dOb = data.dOb;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.uid = data.uid;
        this.timestamp = data.timestamp;
        this.docId = docId;
    }

    set_docId(id) {
        this.docId = id;
    }

    toFirestore() {
        return {
            uid: this.uid,
            timestamp: this.timestamp,
            firstName: this.firstName,
            lastName: this.lastName,
            dOb: this.dOb,
            email: this.email,
            phoneNumber: this.phoneNumber,
        };
    }
}