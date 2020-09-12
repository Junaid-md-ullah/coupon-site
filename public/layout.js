
        var data = '';
        var uri = 'https://devallorshathiapi.azurewebsites.net//api/faqvideo/getall';
        $(document).ready(function () {

            $.getJSON(uri)

                .done(function (data) {

                    $.each(data, function (key, item) {



                    });
                    var coun = [];

                    var video = '';
                    debugger;
                    for (var i = 0; i < data.data.length; i++) {

                    
                        var counter = data.data[i];

                        video = ["/videos/1.mp4", "/videos/2.m4v", "/videos/3.m4v", "/videos/4.m4v", "/videos/5.m4v", "/videos/6.m4v", "/videos/7.m4v", "/videos/8.m4v", "/videos/9.mp4", "/videos/10.mp4", "/videos/11.mp4", "/videos/12.mp4", "/videos/13.mp4", "/videos/14.mp4"];

                        if (coun.length <= video.length) {

                            coun.push(counter);

                        }

                        else {


                            break;

                        }



                    }


                    var uniqueItems = Array.from(new Set(coun));

                    if (video.length == uniqueItems.length - 1) {


                        for (var i = 0; i < 1; i++) {
                          
                            var text0 = $(uniqueItems[0].name).text();

                            var parts0 = text0.split('(');
                            var answer0 = parts0[parts0.length - 1];
                            var t0 = "১. " + answer0.substr(0, answer0.indexOf(')'));


                            $('#Model0').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[0] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_1\">" + t0 + "</h6>");


                            var text = $(uniqueItems[1].name).text();



                            var parts = text.split('(');
                            var answer = parts[parts.length - 1];
                            var t = "২. " + answer.substr(0, answer.indexOf(')'));


                            $('#Model').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[1] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_2\">" + t + "</h6>");

                            var text1 = $(uniqueItems[2].name).text();

                            var parts1 = text1.split('(');
                            var answer1 = parts1[parts1.length - 1];
                            var t1 = "৩. " + answer1.substr(0, answer1.indexOf(')'));

                            $('#Model1').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[2] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_3\">" + t1 + "</h6>");

                            var text2 = $(uniqueItems[3].name).text();

                            var parts2 = text2.split('(');
                            var answer2 = parts2[parts2.length - 1];
                            var t2 = "৪. " + answer2.substr(0, answer2.indexOf(')'));

                            $('#Model2').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[3] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_4\">" + t2 + "</h6>");

                            var text3 = $(uniqueItems[4].name).text();

                            var parts3 = text3.split('(');
                            var answer3 = parts3[parts3.length - 1];
                            var t3 = "৫. " + answer3.substr(0, answer3.indexOf(')'));

                            $('#Model3').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[4] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_5\">" + t3 + "</h6>");



                            var text4 = $(uniqueItems[5].name).text();

                            var parts4 = text4.split('(');
                            var answer4 = parts4[parts4.length - 1];
                            var t4 = "৬. " + answer4.substr(0, answer4.indexOf(')'));


                            $('#Model4').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[5] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_6\">" + t4 + "</h6>");


                            var text5 = $(uniqueItems[6].name).text();

                            var parts5 = text5.split('(');
                            var answer5 = parts5[parts5.length - 1];
                            var t5 = "৭. " + answer5.substr(0, answer5.indexOf(')'));



                            $('#Model5').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[6] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_7\">" + t5 + "</h6>");


                            var text6 = $(uniqueItems[7].name).text();

                            var parts6 = text6.split('(');
                            var answer6 = parts6[parts6.length - 1];
                            var t6 = "৮. " + answer6.substr(0, answer6.indexOf(')'));

                            $('#Model6').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[7] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_8\">  <br>" + t6 + "</h6>");


                            var text7 = $(uniqueItems[8].name).text();

                            var parts7 = text7.split('(');
                            var answer7 = parts7[parts7.length - 1];
                            var t7 = "৯. " + answer7.substr(0, answer7.indexOf(')'));

                            $('#Model7').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[8] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_9\"> <br>" + t7 + "</h6>");

                            var text8 = $(uniqueItems[9].name).text();

                            var parts8 = text8.split('How to bookmark a video and watch it later?');
                            var answer8 = "১০. " + parts8[parts8.length - 1];


                            $('#Model8').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[9] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_10\">   " + answer8 + "</h6>");


                            var text9 = $(uniqueItems[10].name).text();

                            var parts9 = text9.split('(');
                            var answer9 = parts9[parts9.length - 1];
                            var t9 = "১১. " + answer9.substr(0, answer9.indexOf(')'));

                            $('#Model9').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[10] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_11\">  <br>" + t9 + "</h6>");

                            var text10 = $(uniqueItems[11].name).text();

                            var parts10 = text10.split('(');
                            var answer10 = parts10[parts10.length - 1];
                            var t10 = "১২. " + answer10.substr(0, answer10.indexOf(')'));
                            $('#Model10').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[11] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_12\">   <br>" + t10 + "</h6>");


                            var text11 = $(uniqueItems[12].name).text();

                            var parts11 = text11.split('(');
                            var answer11 = parts11[parts11.length - 1];
                            var t11 = "১৩. " + answer11.substr(0, answer11.indexOf(')'));

                            $('#Model11').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[12] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_13\">   <br>" + t11 + "</h6>");

                            var text12 = $(uniqueItems[13].name).text();

                            var parts12 = text12.split('(');
                            var answer12 = parts12[parts12.length - 1];
                            var t12 = "১৪. " + answer12.substr(0, answer12.indexOf(')'));

                            $('#Model12').append("</h3><div><video  width=\"100% \"  controls controlsList=\"nodownload\"><source src= " + video[13] + " type=\"video/mp4\" ></video> <h6 style=\"color:#777777 ; font - size:14px; font-family:'Kalpurush',sans - serif;\" name=\"translate\" caption=\"video_14\">   " + t12 + "</h6>");



                        }

                    }


                });
        });
     
        // var myIndex = 0;
        // carousel();

        // function carousel() {
        //     var i;
        //     var x = document.getElementsByClassName("mySlides");
        //     for (i = 0; i < x.length; i++) {
        //         x[i].style.display = "none";
        //     }
        //     myIndex++;
        //     if (myIndex > x.length) { myIndex = 1 }
        //     x[myIndex - 1].style.display = "block";
        //     setTimeout(carousel, 2500); // Change image every 2 seconds
        // }

        var retrievedObject = localStorage.getItem('testObject');
        if (retrievedObject == "null") {
            changeLanguage("en");
        } else {
            changeLanguage(retrievedObject);
        }
      