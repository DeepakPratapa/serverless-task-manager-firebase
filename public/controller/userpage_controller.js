import { auth,currentUser } from "./firebase_auth.js";

import { UserInfo } from "../model/userinfo.js";
import { addUserInfo , getUserInfoList } from "./firestore_controller.js";
import { progressMessage } from "../view/progress_message.js";

export async function onSubmitCreateUserDetails() {
    const uid = currentUser.uid;
    const timestamp = Date.now();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dOb = document.getElementById('dOb').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const userInfo = new UserInfo({
        uid, timestamp, firstName, lastName, dOb, email, phoneNumber
    });

    const progress = progressMessage('Adding user details ...');
    document.querySelector('form').prepend(progress);

    try {
        const docId = await addUserInfo(userInfo);
        userInfo.set_docId(docId);
    } catch (e) {
        console.log('Failed to add user details', e);
        alert('Failed to save user details ' + JSON.stringify(e));
        progress.remove();
        return;
    }
    progress.remove();
}


export async function getUserInfoDetails() {

    const uid = currentUser.uid;
    try {
        const userInfoList = await getUserInfoList(uid);
        if (userInfoList.length > 0) {
            const userInfo = userInfoList[0];
            document.getElementById('firstName').value = userInfo.firstName || '';
            document.getElementById('lastName').value = userInfo.lastName || '';
            document.getElementById('dOb').value = userInfo.dOb || '';
            document.getElementById('email').value = userInfo.email || '';
            document.getElementById('phoneNumber').value = userInfo.phoneNumber || '';
        }
    } catch (e) {
        console.log('Failed to retrieve user details', e);
        alert('Failed to retrieve user details ' + JSON.stringify(e));
    }




}

