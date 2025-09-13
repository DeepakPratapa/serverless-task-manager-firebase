import {    getFirestore,collection,addDoc,orderBy,getDocs,where,query,updateDoc,deleteDoc,doc,getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const CATEGORY_TITLE_COLLECTION='category_titles';
const EVENT_TITLE_COLLECTION='event_titles';
const EVENT_ITEM_COLLECTION='event_items';
const USER_INFO_COLLECTION='user_info';


import {app} from "./firebase_core.js";

import { Category } from "../model/category.js";
import { Events } from "../model/events.js";
import { EventInfo } from "../model/eventInfo.js";
import { UserInfo } from "../model/userinfo.js";

const db=getFirestore(app);

export async function addCategoryTitle(categoryTitle){
    const docRef= await addDoc(collection(db,CATEGORY_TITLE_COLLECTION),categoryTitle.toFirestore());
    return docRef.id;
}

export async function addEventTitle(eventTitle){
    const docRef= await addDoc(collection(db,EVENT_TITLE_COLLECTION),eventTitle.toFirestore());
    return docRef.id;
}

export async function addEventItem(eventItem){
    const docRef= await addDoc(collection(db,EVENT_ITEM_COLLECTION),eventItem.toFirestore());
    return docRef.id;
}




export async function getCategoryTitleList(uid){
    let CategoryList=[];
    const q=query(collection(db,CATEGORY_TITLE_COLLECTION),
    where('uid','==',uid),
    orderBy('timestamp','desc'));
    const snapShot=await getDocs(q);
    snapShot.forEach(doc=>{
        const t=new Category(doc.data(),doc.id);
        CategoryList.push(t);
    });
    return CategoryList;
    

}

export async function getEventTitleList(CategoryDocId,uid){
    let EventList=[];
    const q=query(collection(db,EVENT_TITLE_COLLECTION),
    where('uid','==',uid),
    where('categoryId','==',CategoryDocId),
    orderBy('timestamp','desc'));
    const snapShot=await getDocs(q);
    snapShot.forEach(doc=>{
        const t=new Events(doc.data(),doc.id);
        EventList.push(t);
    });
    return EventList;
    

}
export async function getEventTitleListByEventDocId(EventDocId, uid) {
    let EventList = [];
    const q = query(collection(db, EVENT_TITLE_COLLECTION),
        where('uid', '==', uid),
        where('eventId', '==', EventDocId),
        orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const t = new Events(doc.data(), doc.id);
        EventList.push(t);
    });
    return EventList;
}

export async function getEventItemList(EventDocId,uid){
    let EventItemList=[];
    const q=query(collection(db,EVENT_ITEM_COLLECTION),
    where('uid','==',uid),
    where('eventId','==',EventDocId),
    orderBy('timestamp'),
    );
    const snapShot=await getDocs(q);
    snapShot.forEach(doc=>{
        const item=new EventInfo(doc.data(),doc.id);
        EventItemList.push(item);
    });
    return EventItemList;
}




export async function updateEventTitle(docId,update){
    const docRef=doc(db,EVENT_TITLE_COLLECTION,docId);
    await updateDoc(docRef,update);
}

export async function deleteEventTitle(itemId){
    const docRef=doc(db,EVENT_TITLE_COLLECTION,itemId);
    await deleteDoc(docRef);
}





export async function updateEventItem(docId,update){
    const docRef=doc(db,EVENT_ITEM_COLLECTION,docId);
    await updateDoc(docRef,update);
}

export async function deleteEventItem(itemId){
    const docRef=doc(db,EVENT_ITEM_COLLECTION,itemId);
    await deleteDoc(docRef);
}


export async function getEventItemDocId(eventId, uid) {
    const q = query(collection(db, EVENT_ITEM_COLLECTION),
        where('uid', '==', uid),
        where('eventId', '==', eventId));
    const snapShot = await getDocs(q);
    if (!snapShot.empty) {
        return snapShot.docs[0].id;
    } else {
        return null;
    }
}


export async function addUserInfo(userInfo) {
    const docRef = await addDoc(collection(db, USER_INFO_COLLECTION), userInfo.toFirestore());
    return docRef.id;
}



export async function updateUserInfo(docId, update) {
    const docRef = doc(db, USER_INFO_COLLECTION, docId);
    await updateDoc(docRef, update);
}

export async function deleteUserInfo(itemId) {
    const docRef = doc(db, USER_INFO_COLLECTION, itemId);
    await deleteDoc(docRef);
}

export async function getUserInfoList(uid) {
    let UserInfoList = [];
    const q = query(collection(db, USER_INFO_COLLECTION),
        where('uid', '==', uid),
        orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const t = new UserInfo(doc.data(), doc.id);
        UserInfoList.push(t);
    });
    return UserInfoList;
}


export async function getEventTitleByEventName(eventName, uid) {
    let EventList = [];
    const q = query(collection(db, EVENT_TITLE_COLLECTION),
        where('uid', '==', uid),
        where('eventName', '==', eventName),
        orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const t = new Events(doc.data(), doc.id);
        EventList.push({ event: t, docId: doc.id });
    });
    return EventList;
}