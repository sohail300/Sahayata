"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayDate = getTodayDate;
function getTodayDate() {
    const Currdate = new Date();
    let currentDay1 = String(Currdate.getDate()).padStart(2, "0");
    let currentMonth1 = String(Currdate.getMonth() + 1).padStart(2, "0");
    let currentYear1 = Currdate.getFullYear();
    let date = `${currentDay1}-${currentMonth1}-${currentYear1}`;
    return date;
}
