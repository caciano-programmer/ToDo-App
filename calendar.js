/**
 * Created by Caciano on 2/10/2017.
 */

current = new Date();

var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function fillCalendar(date)
{
    document.getElementById("month").innerHTML = months[date.getMonth()];
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    for (var row = 1, day = 1, index = 0; row < 7; row++)
        for (let cell = 0; cell < 7; cell++, index++) {
            if (firstDay <= index && day <= lastDay) {
                let td = document.getElementById("table").rows[row].cells[cell];
                td.innerText = "";
                $(td).append(day++);
                $(td).css("background-color", "#dcecef");
                $(td).hover(function () {
                        $(td).css("background-color", "#b1eded");
                }, function () {
                    $(td).css("background-color", "#dcecef");
                });
                $(td).click(function(){ $("#popup").css("visibility", "visible"); });
                $("#popup #event-buttons #cancel-popup").click(function(){ $("#popup").css("visibility", "hidden") });
            }
            else {
                let td = document.getElementById("table").rows[row].cells[cell];
                td.innerText = "";
                $(td).css("background-color", "#dbdbd6");
            }
        }
}fillCalendar(current);

function changeMonth()
{
    $(document).ready( function()
    {
        $("#left").click(function()
        {
            let month = new Date();
            month.setMonth(current.getMonth() - 1);
            current = month;
            $('#table td').off();
            fillCalendar(month);
        })
    });
    $(document).ready( function()
    {
        $("#right").click(function()
        {
            let month = new Date();
            month.setMonth(current.getMonth() + 1);
            current = month;
            $('#table td').off();
            fillCalendar(month);
        })
    });
} changeMonth();
