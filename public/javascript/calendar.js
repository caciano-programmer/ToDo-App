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
                $(td).click(function(){
                    current.setDate(parseInt(td.innerText));
                    document.getElementById("popup_form").reset();
                    $("#newPopup").css("visibility", "visible");
                    $("form").submit( () =>
                    {
                        document.getElementById("currentDay").value = current.getDate();
                        document.getElementById("currentMonth").value = current.getMonth();
                        document.getElementById("currentYear").value = current.getYear();
                        $(".popup").css("visibility", "hidden");
                    });
                });
                $(".popup #event-buttons #cancel-popup").click(function(){
                    $(".popup").css("visibility", "hidden");
                    document.getElementById("popup_form").reset();
                });
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
            current.setMonth(current.getMonth() - 1)
            $('#table td').off();
            fillCalendar(current);
        })
    });
    $(document).ready( function()
    {
        $("#right").click(function()
        {
            current.setMonth(current.getMonth() + 1)
            $('#table td').off();
            fillCalendar(current);
        })
    });
} changeMonth();

function listedEvents()
{
    $(".popup #view_events").click( () => {
        $("#newPopup").css("visibility", "hidden");
        document.getElementById("popup_form").reset();
        $("#eventList").css("visibility", "visible");
    })
}listedEvents();

function closeButton()
{
    $("#eventList #close_events").click(() =>
    {
        $("#eventList").css("visibility", "hidden");
    });
}closeButton();




