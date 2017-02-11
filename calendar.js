/**
 * Created by Caciano on 2/10/2017.
 */

date = new Date();
month = date.getMonth();
year = date.getYear();


var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
document.getElementById("month").innerHTML = months[month];

function fillCalendar() {
    for (var row = 1, day = 1, index = 0; row < 7; row++)
        for (let cell = 0; cell < 7; cell++, index++) {
            if (firstDay <= index && day <= lastDay) {
                let td = document.getElementById("table").rows[row].cells[cell];
                $(td).append(day++);
                $(td).css("background-color", "#dcecef");
                $(td).hover(function () {
                    $(td).css("background-color", "#b1eded");
                }, function () {
                    $(td).css("background-color", "#dcecef");
                });
            }
            else {
                let td = document.getElementById("table").rows[row].cells[cell];
                $(td).css("background-color", "#dbdbd6");
            }
        }
}
fillCalendar();
