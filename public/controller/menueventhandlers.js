import { homePageView } from "../view/home_page.js";
import { Menu2PageView } from "../view/menu2_page.js";
import { RegisterPageView } from "../view/register.js";
import { signOutFirebase } from "./firebase_auth.js";
import { routePathenames } from "./route_controller.js";
import { VerifyPageView } from "../view/verify.js";

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

export function onClickVerify(e) {
    history.pushState(null, null, routePathenames.VERIFY);
    VerifyPageView();
}

export async function onClickSignoutMenu(e) {
    await signOutFirebase(e);
}