$(document).ready(function () {
    const timezone = (Intl.DateTimeFormat().resolvedOptions().timeZone).split("/");

    let localdate = new Date().toLocaleString().split(",");
    let localmonth = localdate[0].split("/")[0];
    let localday = localdate[0].split("/")[1];
    let localyear = localdate[0].split("/")[2];
    $.ajax({
        url: `https://api.aladhan.com/v1/calendarByAddress/${localyear}/${localmonth}?address=${timezone[1]}&method=2`,
        method: "get",
        success: function (data) {
            data.data.forEach(element => {
                $(".todayDate").text(`${Number(localday) + 1}/${localmonth}/${localyear}`)
                $("h3").text(`Prayer Times in ${timezone[1]}`);
                if (element.date.readable.slice(0, 2) == localday) {

                    $(".fdate").text(element.timings.Fajr.slice(0, 6));
                    $(".sdate").text(element.timings.Sunrise.slice(0, 6));
                    $(".ddate").text(element.timings.Dhuhr.slice(0, 6));
                    $(".adate").text(element.timings.Asr.slice(0, 6));
                    $(".mdate").text(element.timings.Maghrib.slice(0, 6));
                    $(".idate").text(element.timings.Isha.slice(0, 6));
                    console.log(timezone[1]);

                    abc(element, localday, localmonth, localyear);



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

        let month = (new Date($("#date").val()).getMonth()) + 1;
        let year = new Date($("#date").val()).getFullYear();
        let city = $("#city").val();
        $.ajax({
            url: `https://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${city}&method=2`,
            method: "get",
            success: function (data) {
                $("tbody").html("");
                localTime(city);

                $("h3").text(`Prayer Times in ${city.charAt(0).toUpperCase() + city.slice(1)}`);
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

    function localTime(city) {
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
                    console.log("salam");
                    abc(element, localday, localmonth, localyear, 1);






                });

            }
        });
    }

    function abc(element, localday, localmonth, localyear, num = 0) {
        if ((new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Isha.slice(0, 5)}:00`)) - new Date() < 0) {
            var countDownDate = new Date(`${localmonth}/${Number(localday) + 1}/${localyear} ${element.timings.Fajr.slice(0, 5)}:00`);
            $("#prayerTimeName").text('Fajr');
            Counter(countDownDate, num);

        }
        else if ((new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Maghrib.slice(0, 5)}:00`)) - new Date() < 0) {
            var countDownDate = new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Isha.slice(0, 5)}:00`);
            $("#prayerTimeName").text('Isha');
            Counter(countDownDate);

        }
        else if ((new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Asr.slice(0, 5)}:00`)) - new Date() < 0) {
            var countDownDate = new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Maghrib.slice(0, 5)}:00`);
            $("#prayerTimeName").text('Maghrib');
            Counter(countDownDate);

        }
        else if ((new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Dhuhr.slice(0, 5)}:00`)) - new Date() < 0) {
            var countDownDate = new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Asr.slice(0, 5)}:00`);
            $("#prayerTimeName").text('Asr');
            Counter(countDownDate);

        }
        else if ((new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Fajr.slice(0, 5)}:00`)) - new Date() < 0) {
            var countDownDate = new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Dhuhr.slice(0, 5)}:00`);
            $("#prayerTimeName").text('Dhuhr');
            console.log(num);
            Counter(countDownDate, num);

        }
        else {
            var countDownDate = new Date(`${localmonth}/${Number(localday)}/${localyear} ${element.timings.Fajr.slice(0, 5)}:00`);
            console.log(countDownDate);
            $("#prayerTimeName").text('Fajr');
            console.log(num);
            Counter(countDownDate, num);


        }
    }

    function Counter(countDownDate, num) {



        let myInterval = setInterval(function () {


            var now = new Date().getTime();
            var distance = countDownDate - now;

            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            document.getElementById("neqederqalib").innerHTML = (hours + " : " + minutes + " : " + seconds);


         



        }, 1000);











    }



});