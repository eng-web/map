// this variable will collect the html which will eventually be placed in the side_bar
        var side_bar_html = "";

        // arrays to hold copies of the markers and html used by the side_bar
        // because the function closure trick doesnt work there
        var gmarkers = [];
        var map = null;

        function initialize() {
            // create the map
            var myOptions = {
                zoom: 18,
                minZoom: 17,
                maxZoom: 18,
                center: new google.maps.LatLng(40.35014186, -74.65190649),
                mapTypeControl: true,
                streetViewControl: true,
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                navigationControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                    {
                        "featureType": "landscape",
                        "stylers": [
                            {
                                "hue": "#F1FF00"
                            },
                            {
                                "saturation": -27.4
                            },
                            {
                                "lightness": 9.4
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "stylers": [
                            {
                                "hue": "#0099FF"
                            },
                            {
                                "saturation": -20
                            },
                            {
                                "lightness": 36.4
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "stylers": [
                            {
                                "hue": "#00FF4F"
                            },
                            {
                                "saturation": 0
                            },
                            {
                                "lightness": 0
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "stylers": [
                            {
                                "hue": "#FFB300"
                            },
                            {
                                "saturation": -38
                            },
                            {
                                "lightness": 11.2
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "stylers": [
                            {
                                "hue": "#00B6FF"
                            },
                            {
                                "saturation": 4.2
                            },
                            {
                                "lightness": -63.4
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [
                            {
                                "hue": "#9FFF00"
                            },
                            {
                                "saturation": 0
                            },
                            {
                                "lightness": 0
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            { "visibility": "off" }
                        ]
                    }
                ],
            }
            /*styles: [{"featureType": "water","elementType": "geometry","stylers": [{ "color": "#193341" }]},{"featureType": "landscape","elementType": "geometry","stylers": [{ "color": "#2c5a71" }]},{"featureType": "road","elementType": "geometry","stylers": [{ "color": "#29768a" },{ "lightness": -37 }]},{"featureType": "poi","elementType": "geometry","stylers": [{ "color": "#406d80" }]},{"featureType": "transit","elementType": "geometry","stylers": [{ "color": "#406d80" }]},{"elementType": "labels.text.stroke","stylers": [{ "visibility": "on" },{ "color": "#3e606f" },{ "weight": 2 },{ "gamma": 0.84 }]},{"elementType": "labels.text.fill","stylers": [{ "color": "#ffffff" }]},{"featureType": "administrative","elementType": "geometry","stylers": [{ "weight": 0.6 },{ "color": "#1a3541" }]},{"elementType": "labels.icon","stylers": [{ "visibility": "off" }]},{"featureType": "poi.park","elementType": "geometry","stylers": [{ "color": "#2c5a71" }]}],
             }*/
            map = new google.maps.Map(document.getElementById("map_canvas"),
                    myOptions);
            /*google.maps.event.addDomListener(window, 'resize', function() {
                "use strict";
                window.location.reload();
            });*/
            google.maps.event.addDomListener(window, 'load', initialize);
            google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
            });

            /*Device targets*/

//Target iPad Landscape
            var iPadLandscape = window.matchMedia( "(max-width: 1024px) and (max-height: 768px)" );
            if (iPadLandscape.matches) {
                map.setZoom(18);
                map.setCenter(40.35058748, -74.65199232);
            }

//Target iPad Portrait
            var iPadPortrait = window.matchMedia( "(max-width: 768px) and (max-height: 1024px)" );
            if (iPadPortrait.matches) {
                map.setZoom(17);
                map.setCenter(new google.maps.LatLng(40.35029313, -74.65191722));
            }

//Target iPhone4
            var iPhone4 = window.matchMedia( "(max-width: 320px) and (max-height:480px)" );
            if (iPhone4.matches) {
                map.setZoom(17);
                map.setCenter(new google.maps.LatLng(40.3502318, -74.65159535));
            }

//Target iPhone5
            var iPhone5 = window.matchMedia( "(max-width: 320px) and (max-height:568px)" );
            if (iPhone5.matches) {
                map.setZoom(17);
                map.setCenter(new google.maps.LatLng(40.3502318, -74.65159535));
            }

//Target iPhone6
            var iPhone6 = window.matchMedia( "(max-width: 375px) and (max-height:627px)" );
            if (iPhone6.matches) {
                map.setZoom(17);
                map.setCenter(new google.maps.LatLng(40.35010507, -74.65158463));
            }

//Target iPhone6 Plus
            var iPhone6Plus = window.matchMedia( "(max-width: 414px) and (max-height:736px)" );
            if (iPhone6Plus.matches) {
                map.setZoom(17);
                map.setCenter(new google.maps.LatLng(40.35004375, -74.65162218));
            }

            // Add markers to the map
            // Set up Engineering markers with info windows
            // add the points
            var schoolEng = new google.maps.LatLng(40.3505098, -74.65147734);
            var marker = createMarker(schoolEng,"School of Engineering & Applied Science","<h4>School of Engineering & Applied Science</h4><p>Like the overall University, the engineering school is unique in combining the strengths of a world-leading research institution with the qualities of an outstanding liberal arts college. In both its teaching and research, Princeton engineering pursues fundamental knowledge as well as multidisciplinary collaborations that make technology effective in solving societal problems. The school is committed to preparing all students — engineers as well as students from across the University — to become leaders in a technology-driven society.</p><p><a target=\'_blank\' href=\'http://www.princeton.edu/engineering/\'>princeton.edu/engineering</a></p>")

            var deptCEE = new google.maps.LatLng(40.3499211, -74.6511662);
            var marker = createMarker(deptCEE,"Civil & Environmental Engineering","<h4>Civil & Environmental Engineering</h4><p>Civil & Environmental Engineering at Princeton is a dynamic and growing department. Its research and teaching address broad questions associated with the built environment, the natural environment, and interactions between the two, with an evolving emphasis on sustainability. Focus areas include structural art, structural design, and building materials; urban environments; water and air quality; climate-change mitigation; and the impacts of climate change on water resources and the hydrologic cycle.</p><p><a target=\'_blank\' href=\'http://www.princeton.edu/cee/\'>princeton.edu/cee</a></p>")

            var deptCBE = new google.maps.LatLng(40.35040351, -74.65064049);
            var marker = createMarker(deptCBE,"Chemical & Biological Engineering","<h4>Chemical & Biological Engineering</h4><p>Chemical and biological engineering addresses a range of problems in human health, energy production, materials science, and industrial processes. Areas of excellence at Princeton include: applied and computational mathematics, bioengineering, environmental and energy science and technology, materials, process systems engineering, thermodynamics and statistical mechanics, and transport phenomena.</p><p><a target=\'_blank\' href=\'https://www.princeton.edu/cbe/\'>princeton.edu/cbe</a></p>")

            var deptCS = new google.maps.LatLng(40.35020727, -74.65222836);
            var marker = createMarker(deptCS,"Computer Science","<h4>Computer Science</h4><p>Princeton has been at the forefront of computing since Alan Turing, Alonzo Church and John von Neumann were among its residents. The department has experienced significant growth over the last few years with strong groups in theory, systems, networking, computer architecture, graphics/media,programming languages, computational science, security, artificial intelligence, and computational biology.</p><p><a target=\'_blank\' href=\'http://www.cs.princeton.edu/\'>cs.princeton.edu</a></p>")

            var deptEE = new google.maps.LatLng(40.35088592, -74.65111256);
            var marker = createMarker(deptEE,"Electrical Engineering","<h4>Electrical Engineering</h4><p>Princeton\'s electrical engineering program, started in 1889 as one of the first in the United States, remains at the forefront of the field, with research aimed at improving human health, communications, environmental protection, energy production and life in developing regions. Specific areas of research include the basic physics of semiconductors; electronic and optical devices; the design of computers; and algorithms and structures for information and biological technologies.</p><p><a target=\'_blank\' href=\'http://ee.princeton.edu//\'>ee.princeton.edu</a></p>")

            var deptMAE = new google.maps.LatLng(40.35091453, -74.65064988);
            var marker = createMarker(deptMAE,"Mechanical & Aerospace Engineering","<h4>Mechanical & Aerospace Engineering</h4><p>Mechanical & aerospace engineers at Princeton have played leading roles in fluid modeling and measurement, propulsion, combustion and aerospace dynamics over the past half century. With ties to many other areas of science and engineering, MAE faculty have a major impact in bioengineering, pollution and alternative fuels, energy usage, space exploration, satellite technology, propulsion systems, stability and control of vehicles, aircraft performance, instrumentation, and laser technology and materials.</p><p><a target=\'_blank\' href=\'http://princeton.edu/mae\'>princeton.edu/mae</a></p>")

            var deptORFE = new google.maps.LatLng(40.34954498, -74.65270042);
            var marker = createMarker(deptORFE,"Operations Research & Financial Engineering","<h4>Operations Research & Financial Engineering</h4><p>The Department of Operations Research & Financial Engineering is unique in the United States, combining deep roots in mathematics with engineering, business and finance. Much of the research in the department focuses on managing risk and optimizing operations. Faculty and students develop tools used to make better decisions, improve performance of complex systems, and manage resources efficiently. </p><p><a target=\'_blank\' href=\'http://orfe.princeton.edu/\'>orfe.princeton.edu</a></p>")

            var ctrACEE = new google.maps.LatLng(40.34931195, -74.65091944);
            var marker = createMarker(ctrACEE,"Andlinger Center for Energy and the Environment","<h4>Andlinger Center for Energy and the Environment</h4><p>The Andlinger Center for Energy and the Environment supports a vibrant and expanding program of research and teaching in the areas of sustainable energy development, energy conservation and environmental protection and remediation related to energy.  The center translates fundamental knowledge into practical solutions that enable sustainable energy production and the protection of the environment and global climate from energy-related anthropogenic change. Alongside and throughout this work, the center prepares the next generation of leaders in energy and the environment and serves as a resource to policymakers.</p><p><a target=\'_blank\' href=\'http://acee.princeton.edu/\'>acee.princeton.edu</a></p>")

            var ctrCITP = new google.maps.LatLng(40.34956951,-74.65244293);
            var marker = createMarker(ctrCITP,"Center for Information Technology Policy","<h4>Center for Information Technology Policy</h4><p>The Center for Information Technology Policy is a nexus of expertise in technology, engineering, public policy and the social sciences. In keeping with the University tradition of service, the center's research, teaching and events address digital technologies as they interact with society. It produces leading research as well as practical demonstrations of issues at the crossroads of technology and policy. CITP integrates graduate and undergraduate students at all levels of its work, including an undergraduate certificate offered in cooperation with the Keller Center.</p><p><a target=\'_blank\' href=\'https://citp.princeton.edu\'>citp.princeton.edu</a></p>")

            var ctrKC = new google.maps.LatLng(40.3502686,-74.65116084);
            var marker = createMarker(ctrKC,"Keller Center","<h4>Keller Center for Innovation in Engineering Education</h4><p>The Keller Center's mission is to educate leaders for a technology-driven society, by innovating education and fostering entrepreneurship, innovation and design. The Keller Center shares the engineering school's vision for bridging disciplines to ensure that all students are prepared to put science and technology to use in solving critical societal challenges. The Keller Center thus serves as a hub, connecting students, in engineering, the humanities, arts, social sciences and natural sciences with each other, as well as connecting them with the broader campus community and beyond.</p><p><a target=\'_blank\' href=\'http://kellercenter.princeton.edu\'>kellercenter.princeton.edu</a></p>")

            var instPRISM = new google.maps.LatLng(40.34952045,-74.65035081);
            var marker = createMarker(instPRISM,"PRISM","<h4>The Princeton Institute for the Science and Technology of Materials (PRISM)</h4><p>The Princeton Institute for the Science and Technology of Materials (PRISM) integrates fundamental theory and applied research in investigating and inventing materials of broad importance in energy, medicine, electronics, information technology and many other fields. PRISM offers an undergraduate program leading to a Certificate in Materials, which includes core courses within PRISM, electives offered by departments and extensive faculty interaction and research opportunities. At the graduate level PRISM offers a multidisciplinary program in cooperation with academic departments. PRISM also conducts extensive educational outreach programs.</p><p><a target=\'_blank\' href=\'http://www.princeton.edu/prism/\'>princeton.edu/prism</a></p>")

            var labHoyt = new google.maps.LatLng(40.34964718, -74.65463161);
            var marker = createMarker(labHoyt,"Hoyt Laboratory","<h4>Hoyt Laboratory</h4><p>ews.me totally up on Twitter +1 5 praise erasers & how to avoid them digital first Ushahidi newsonomics Marshall McLuhan Dan Fleckner Gardening & War section tools go viral, if the news is that important, it'll find me we will make them pay hashtag a giant stack of newspapers that you'll never read Mozilla fourth estate semipermeable inverted pyramid Josh Marshall discuss. commons-based peer production horse-race coverage TechCrunch Quora totally blowing up on Twitter kitchen table of the future perfect for starting a campfire Pulse TweetDeck, Patch Ushahidi people formerly known as the audience engagement rubber cement WaPo Article Skimmer, election-night hologram cancel my subscription nonprofit Arianna Gutenberg parenthesis DocumentCloud Free Darko.</p>")

            var ctrFriend = new google.maps.LatLng(40.35031357, -74.65274334);
            var marker = createMarker(ctrFriend,"Friend Center","<h4>Friend Center</h4><p>The 70,000-square-foot Friend Center for Engineering Education was dedicated in 2001. It was designed by Henry N. Cobb of the renowed architectural firm Pei Cobb Freed & Partners and was established through a gift from Dennis J. Keller '63, chair and chief executive officer of DeVry Inc., in memory of Peter W. Friend '63. It is the principal classroom, library, and general computing facility of the School of Engineering and Applied Science, and many liberal arts classes also are held here. Downstairs are computer labs and classrooms, while on the ground floor is the Engineering Library.</p>")

            // put the assembled side_bar_html contents into the side_bar div
            document.getElementById("ul_side_bar").innerHTML = side_bar_html;
        }

        var infowindow = new google.maps.InfoWindow(
                {
                    //size: new google.maps.Size(125,50)
                    maxWidth:300
                });

        // This function picks up the click and opens the corresponding info window
        function myclick(i) {
            google.maps.event.trigger(gmarkers[i], "click");
        }

        // A function to create the marker and set up the event window function
        function createMarker(latlng, name, html) {
            var contentString = html;
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                zIndex: Math.round(latlng.lat()*-100000)<<5
            });

            google.maps.event.addListener(marker, 'click', function() {
                //map.setCenter(marker.getPosition());
                //map.panTo(marker.getPosition());
                infowindow.setContent(contentString);
                infowindow.open(map,marker);
            });
            // save the info we need to use later for the side_bar
            gmarkers.push(marker);
            // add a line to the side_bar html
            side_bar_html += '<li><a href="javascript:myclick(' + (gmarkers.length-1) + ')">' + name + '<\/a><\/li>';
        }


        // This Javascript is based on code provided by
        // http://www.bisphamchurch.org.uk/
        // http://econym.org.uk/gmap/
        // from the v2 tutorial page at:
        // http://econym.org.uk/gmap/basic2.htm
        //