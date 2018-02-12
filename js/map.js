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
            var marker = createMarker(schoolEng,"School of Engineering and Applied Science","<h4>School of Engineering and Applied Science</h4><p>Like the overall University, the engineering school is unique in combining the strengths of a world-leading research institution with the qualities of an outstanding liberal arts college. In both its teaching and research, Princeton engineering pursues fundamental knowledge as well as multidisciplinary collaborations that make technology effective in solving societal problems. The school is committed to preparing all students — graduate and undergraduate — to become leaders in a technology-driven society.</p><p><a target=\'_blank\' href=\'https://engineering.princeton.edu\'>engineering.princeton.edu</a></p>")

            var deptCBE = new google.maps.LatLng(40.35040351, -74.65064049);
            var marker = createMarker(deptCBE,"Chemical and Biological Engineering","<h4>Chemical and Biological Engineering</h4><p>Chemical and biological engineering addresses a range of problems in human health, energy production, materials science, and industrial processes. Areas of excellence at Princeton include: applied and computational mathematics, bioengineering, environmental and energy science and technology, materials synthesis and processing, process engineering and science, thermodynamics and statistical mechanics, and transport phenomena.</p><p><a target=\'_blank\' href=\'https://www.princeton.edu/cbe/\'>princeton.edu/cbe</a></p>")

            var deptCEE = new google.maps.LatLng(40.3499211, -74.6511662);
            var marker = createMarker(deptCEE,"Civil and Environmental Engineering","<h4>Civil and Environmental Engineering</h4><p>Civil and environmental engineering research at Princeton addresses fundamental questions associated with the built environment, the natural environment, and interactions between the two.  Focus areas include design of civil engineering systems; water resources and the hydrologic cycle, civil engineering materials, environmental and structural monitoring; air quality and water quality; urban environments, including smart cities; the impacts of climate change on water resources and natural hazards; impacts of energy technologies on the environment and structural art and design.</p><p><a target=\'_blank\' href=\'http://www.princeton.edu/cee/\'>princeton.edu/cee</a></p>")

            var deptCS = new google.maps.LatLng(40.35020727, -74.65222836);
            var marker = createMarker(deptCS,"Computer Science","<h4>Computer Science</h4><p>Princeton has been at the forefront of computing since Alan Turing, Alonzo Church and John von Neumann were among its residents. The department, now in a period of major growth, has strong groups in artificial intelligence and machine learning, theory, programming languages, graphics and vision, systems and networking, computer architecture, computational biology and neuroscience, security, privacy, and information technology policy.</p><p><a target=\'_blank\' href=\'http://www.cs.princeton.edu/\'>cs.princeton.edu</a></p>")

            var deptEE = new google.maps.LatLng(40.35088592, -74.65111256);
            var marker = createMarker(deptEE,"Electrical Engineering","<h4>Electrical Engineering</h4><p>Princeton\'s electrical engineering program, started in 1889 as one of the first in the United States, remains at the forefront of the field, with research aimed at improving human health, energy and environmental systems, computing and communications, and security. Specific areas of research include the physics of semiconductors; electronic and optical devices; the design of computers and networks; materials science and nanotechnologies; algorithms and structures for information; and biological technologies. </p><p><a target=\'_blank\' href=\'http://ee.princeton.edu//\'>ee.princeton.edu</a></p>")

            var deptMAE = new google.maps.LatLng(40.35091453, -74.65064988);
            var marker = createMarker(deptMAE,"Mechanical and Aerospace Engineering","<h4>Mechanical and Aerospace Engineering</h4><p>Mechanical and aerospace engineers at Princeton have played leading roles in propulsion, combustion, fluid modeling and measurement, laser technology and materials, environmental science, and aerospace dynamics over the past half century. With ties to many other areas of science and engineering, MAE faculty also have a major impact in pollution and alternative fuels; energy use and storage; materials science; satellite technology and propulsion; stability and control of vehicles; aircraft performance; and instrumentation.</p><p><a target=\'_blank\' href=\'https://mae.princeton.edu\'>mae.princeton.edu</a></p>")

            var deptORFE = new google.maps.LatLng(40.34954498, -74.65270042);
            var marker = createMarker(deptORFE,"Operations Research and Financial Engineering","<h4>Operations Research and Financial Engineering</h4><p>The Department of Operations Research and Financial Engineering is unique in the United States, combining deep roots in mathematics with engineering, business, and finance. Much of the research in the department focuses on developing mathematical and computational tools for making decisions under uncertainty. Work by faculty and students helps manage risk and, optimize performance of complex systems, and manage resources efficiently. Expertise include \"big data\" analysis and financial technology (FinTech). </p><p><a target=\'_blank\' href=\'http://orfe.princeton.edu/\'>orfe.princeton.edu</a></p>")

            var ctrACEE = new google.maps.LatLng(40.34931195, -74.65091944);
            var marker = createMarker(ctrACEE,"Andlinger Center for Energy and the Environment","<h4>Andlinger Center for Energy and the Environment</h4><p>The Andlinger Center for Energy and the Environment supports a vibrant and expanding program of research and teaching in the areas of sustainable energy-technology development, energy efficiency, and environmental protection and remediation. The center takes a highly interdisciplinary approach toward translating fundamental knowledge into practical solutions that enable sustainable energy production and the protection of the environment and global climate from energy-related anthropogenic change.</p><p><a target=\'_blank\' href=\'http://acee.princeton.edu/\'>acee.princeton.edu</a></p>")

            var ctrCITP = new google.maps.LatLng(40.34956951,-74.65244293);
            var marker = createMarker(ctrCITP,"Center for Information Technology Policy","<h4>Center for Information Technology Policy</h4><p>TThe Center for Information Technology Policy uses Princeton’s unique strengths to promote an informed public discussion of digital technologies. Combining faculty expertise in technology and engineering, public policy, and the social sciences with a strong University tradition of service, the Center’s research, teaching, and public programs address digital technologies as they interact with policy, markets, and society. The center is a joint initiative of the School of Engineering and Applied Science and the Woodrow Wilson School of Public and International Affairs.</p><p><a target=\'_blank\' href=\'https://citp.princeton.edu\'>citp.princeton.edu</a></p>")

            var ctrKC = new google.maps.LatLng(40.3502686,-74.65116084);
            var marker = createMarker(ctrKC,"Keller Center","<h4>Keller Center for Innovation in Engineering Education</h4><p>The Keller Center seeks to prepare all students – both engineers and non-engineers – to be leaders in an increasingly complex, technology-driven society. The center is creating new courses and strengthening existing ones that go beyond purely technical subjects to provide students a broader understanding of the global economic, environmental and cultural forces that shape and are shaped by technology. At the same time, the center is improving students' technical education by exposing them to real engineering projects throughout their four years, through internships, entrepreneurial opportunities, and multidisciplinary courses.</p><p><a target=\'_blank\' href=\'http://kellercenter.princeton.edu\'>kellercenter.princeton.edu</a></p>")

            var instPRISM = new google.maps.LatLng(40.34952045,-74.65035081);
            var marker = createMarker(instPRISM,"PRISM","<h4>The Princeton Institute for the Science and Technology of Materials (PRISM)</h4><p>The Princeton Institute for the Science and Technology of Materials (PRISM) is a multidisciplinary research center driving advances in materials science and photonics. A particular strength is research that combines expertise in \"hard\" materials such as conventional semiconductors and ceramics with knowledge of \"soft\" materials such as plastics, biological molecules, and fluids. Integrating these conventionally distinct areas yields breakthroughs in fields from telecommunications to energy to biotechnology. The institute brings together physicists, chemists, biologists, and engineers, as well as industry partners, to bring fundamental advances to market.</p><p><a target=\'_blank\' href=\'http://www.princeton.edu/prism/\'>princeton.edu/prism</a></p>")

            var labHoyt = new google.maps.LatLng(40.34964718, -74.65463161);
            var marker = createMarker(labHoyt,"Hoyt Laboratory","<h4>Hoyt Laboratory</h4><p>Hoyt Laboratory contains labs devoted to biological engineering, and is part of the <a href=\'http://www.princeton.edu/cbe\' target=\'_blank'\>Department of Chemical and Biological Engineering</a>. Researchers use the principles of engineering to uncover fundamental mechanisms of life, with an eye toward broadening scientific understanding and leading to better options for prevention and treatment of disease.</p><p><a target=\'_blank\' href=\'https://www.princeton.edu/cbe/\'>princeton.edu/cbe</a></p>")

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
        function seas(i) {
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
            side_bar_html += '<li><a href="javascript:seas(' + (gmarkers.length-1) + ')">' + name + '<\/a><\/li>';
        }


        // This Javascript is based on code provided by
        // http://www.bisphamchurch.org.uk/
        // http://econym.org.uk/gmap/
        // from the v2 tutorial page at:
        // http://econym.org.uk/gmap/basic2.htm
        //