import { homePageView } from "../view/home_page.js";
import { Menu2PageView } from "../view/menu2_page.js";
import { RegisterPageView } from "../view/register.js";
import { signOutFirebase } from "./firebase_auth.js";
import { routePathenames } from "./route_controller.js";
import { VerifyPageView } from "../view/verify.js";
import { UserPageView } from "../view/userinfo.js";
import { EventPageView } from "../view/event_details.js";
import { EventUpdatePageView } from "../view/event_update.js";

export function onClickHomeMenu(e) {
    history.pushState(null, null, routePathenames.HOME);
    homePageView();
}
export function onClickMenu2Menu(e) {
    history.pushState(null, null, routePathenames.MENU2);
    Menu2PageView();
}

export function onClickRegister(e) {
    history.pushState(null, null, routePathenames.REGISTER);
    RegisterPageView();
}

export function onClickEventDetails(e1,e2) {
    history.pushState(null, null, routePathenames.EVENTDETAIL);
    EventPageView(e1,e2);
}


export function onClickEventUpdate(e1,e2) {
    history.pushState(null, null, routePathenames.EVENTUPDATE);
    EventUpdatePageView(e1,e2);
}




export function onClickVerify(e) {
    history.pushState(null, null, routePathenames.VERIFY);
    VerifyPageView();
}

export  function onClickUserInfo(e){
    history.pushState(null, null, routePathenames.USER);
    UserPageView();
}


export async function onClickSignoutMenu(e) {
    await signOutFirebase(e);
}