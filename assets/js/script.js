$(document).ready(function () {
    const timezone = (Intl.DateTimeFormat().resolvedOptions().timeZone).split("/");
    console.log(timezone[1]);
    let localdate = new Date().toLocaleString().split(",");
    let localmonth = localdate[0].split("/")[0];
    let localday = localdate[0].split("/")[1];
    let localyear = localdate[0].split("/")[2];
    $.ajax({
        url: `https://api.aladhan.com/v1/calendarByAddress/${localyear}/${localmonth}?address=${timezone[1]}&method=2`,
        method: "get",
        success: function (data) {
            data.data.forEach(element => {
                
                
                    if (element.date.readable.slice(0, 2) == localday) {
                        
                        $(".fdate").text(element.timings.Fajr.slice(0, 6));
                        $(".sdate").text(element.timings.Sunrise.slice(0, 6));
                        $(".ddate").text(element.timings.Dhuhr.slice(0, 6));
                        $(".adate").text(element.timings.Asr.slice(0, 6));
                        $(".mdate").text(element.timings.Maghrib.slice(0, 6));
                        $(".idate").text(element.timings.Isha.slice(0, 6));
                    }
                
                

                let tr =
                    `
                    <tr>
                        <td>${element.date.readable}</td>
                        <td>${element.timings.Fajr.slice(0, 6)}</td>
                        <td>${element.timings.Sunrise.slice(0, 6)}</td>
                        <td>${element.timings.Dhuhr.slice(0, 6)}</td>
                        <td>${element.timings.Asr.slice(0, 6)}</td>
                        <td>${element.timings.Maghrib.slice(0, 6)}</td>
                        <td>${element.timings.Isha.slice(0, 6)}</td>
                   </tr>
                   `
                $("tbody").append(tr);

            });

        }
    });

    $("button").click(function (e) {
        e.preventDefault();
        let month = (new Date($("#date").val()).getMonth())+ 1;
        let year = new Date($("#date").val()).getFullYear();
        let city = $("#city").val();
        $.ajax({
            url: `https://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${city}&method=2`,
            method: "get",
            success: function (data) {
                $("tbody").html("");
                localTime(city);
                data.data.forEach(element => {
                    

                    if (element.date.readable.slice(0, 2) == localday) {
                        
                        $(".fdate").text(element.timings.Fajr.slice(0, 6));
                        $(".sdate").text(element.timings.Sunrise.slice(0, 6));
                        $(".ddate").text(element.timings.Dhuhr.slice(0, 6));
                        $(".adate").text(element.timings.Asr.slice(0, 6));
                        $(".mdate").text(element.timings.Maghrib.slice(0, 6));
                        $(".idate").text(element.timings.Isha.slice(0, 6));
                    }
                   
                    let tr =
                        `
                        <tr>
                            <td>${element.date.readable}</td>
                            <td>${element.timings.Fajr.slice(0, 6)}</td>
                            <td>${element.timings.Sunrise.slice(0, 6)}</td>
                            <td>${element.timings.Dhuhr.slice(0, 6)}</td>
                            <td>${element.timings.Asr.slice(0, 6)}</td>
                            <td>${element.timings.Maghrib.slice(0, 6)}</td>
                            <td>${element.timings.Isha.slice(0, 6)}</td>
                       </tr>
                       `
                    $("tbody").append(tr);

                });

            }
        });

    })
    
    function localTime(city){
        $.ajax({
            url: `https://api.aladhan.com/v1/calendarByAddress/${localyear}/${localmonth}?address=${city}&method=2`,
            method: "get",
            success: function (data) {
                data.data.forEach(element => {
                    
                    
                    if (element.date.readable.slice(0, 2) == localday) {

                        $(".fdate").text(element.timings.Fajr.slice(0, 6));
                        $(".sdate").text(element.timings.Sunrise.slice(0, 6));
                        $(".ddate").text(element.timings.Dhuhr.slice(0, 6));
                        $(".adate").text(element.timings.Asr.slice(0, 6));
                        $(".mdate").text(element.timings.Maghrib.slice(0, 6));
                        $(".idate").text(element.timings.Isha.slice(0, 6));
                    }

                    
    
    
                });
    
            }
        });
    }
    


});