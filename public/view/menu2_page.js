import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { getEventItemList, getEventTitleByEventName } from "../controller/firestore_controller.js"; // Adjust the path as necessary

export async function Menu2PageView() {
    if (!currentUser || !currentUser.uid) {
        root.innerHTML = await protectedView();
        return;
    }

    const response = await fetch('/view/templates/eventSearch_page.html', { cache: 'no-store' });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    root.innerHTML = '';
    root.appendChild(divWrapper);

    const searchButton = divWrapper.querySelector('#search-button');
    searchButton.onclick = handleSearchClick;
    const searchInput = divWrapper.querySelector('#search-input');
    const resultContainer = divWrapper.querySelector('#result-container');

    async function handleSearchClick(e) {
        e.preventDefault();
        const eventName = searchInput.value.trim();
        if (!eventName) {
            alert('Please enter an event name to search.');
            return;
        }
        let uid = currentUser.uid;
        let eventList;
        try {
            eventList = await getEventTitleByEventName(eventName, uid);
            console.log('Event list:', eventList);
        } catch (e) {
            console.error('Error fetching event titles:', e);
            alert('Error fetching event titles.');
            return;
        }

        if (eventList.length === 0) {
            resultContainer.innerHTML = 'No events found with the given name.';
            return;
        }

        const event = eventList[0].event;
        let eventDocID = eventList[0].docId;
        let eventItems;
        try {
            eventItems = await getEventItemList(eventDocID, uid);
            console.log('Event items:', eventItems);
        } catch (e) {
            console.error('Error fetching event items:', e);
            alert('Error fetching event items.');
            return;
        }

        if (eventItems.length === 0) {
            resultContainer.innerHTML = 'No event details found.';
            return;
        }

        const eventInfo = eventItems[0]; // Assuming eventItems is an array and you want the first item

        resultContainer.innerHTML = `
            <div class="card mt-4 shadow-sm">
            <div class="card-header bg-primary text-white">
                <h3>${event.eventName}</h3>
            </div>
            <div class="card-body">
                <p><strong>Description:</strong> ${eventInfo.description}</p>
                <p><strong>Due Date:</strong> ${eventInfo.dueDates}</p>
                <p><strong>Notification Method:</strong> ${eventInfo.notificationMethods}</p>
                <p><strong>Notification Intervals:</strong> ${eventInfo.reminderIntervals} Hours</p>
                ${eventInfo.relevantAttachment ? `<p><strong>Relevant Attachments:</strong> ${eventInfo.relevantAttachment}</p>` : ''}
            </div>
            </div>
        `;
    }
}
