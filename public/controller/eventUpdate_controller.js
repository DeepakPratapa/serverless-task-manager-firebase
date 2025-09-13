import { currentUser } from "./firebase_auth.js";
import { updateEventItem,  getEventItemDocId} from "./firestore_controller.js";
import { progressMessage } from "../view/progress_message.js";
import { EventInfo } from "../model/eventInfo.js";
import { DEV } from "../model/constant.js";



export async function onSubmitUpdateEvent(EventDocId) {

    const uid = currentUser.uid;
    const eventId = EventDocId;
    let EventItemDocId = await getEventItemDocId(eventId,uid);
    
    
    const timestamp = Date.now();
    const description = document.getElementById('description').value;
    const relevantAttachment = document.getElementById('attachment').files[0] || null;
    const dueDates = document.getElementById('dueDate').value;
    const notificationMethods = document.getElementById('notificationMethods').value;
    const reminderIntervals = document.getElementById('reminderIntervals').value;

    const update = {
        eventId, uid, timestamp, description, relevantAttachment, dueDates, notificationMethods, reminderIntervals
    };

    const progress = progressMessage('Updating item ...');
    document.getElementById('eventDetailsForm').prepend(progress);

    try {
        await updateEventItem(EventItemDocId,update);
    } catch (e2) {
        if (DEV) console.log('Failed to update item', e2);
        alert('Failed to update item: ' + JSON.stringify(e2));
        progress.remove();
        return;
    }
    progress.remove();
}
