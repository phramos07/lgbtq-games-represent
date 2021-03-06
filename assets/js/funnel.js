 var width = 800,
                height = 450,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.ordinal()
                .range(["#88d8ea",
                                "#99fbcc",
                                "#f9f5a8",
                                "#eecdab",
                                "#f4b4b4",
                                "rgb(144,197,345)",
                                "rgb(165,218,366)"]);

            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")

            d3.csv("./data/funnel_data.csv", function(error, data) {
                var funnel = d3.funnel()
                    .size([width,height])
                    .value(function(d) { return d.value; });
               
                var line = d3.svg.line()
                    .interpolate('linear-closed')
                    .x(function(d,i) { return d.x; })
                    .y(function(d,i) { return d.y; });
                
                var g = svg.selectAll(".funnel-group")
                    .data(funnel(data))
                    .enter().append("g")
                    .attr("class", "funnel-group");
        
                g.append("path")
                    .attr("d", function (d){ return line(d.coordinates); })
                    .style("fill", function(d) { return color(d.content_type); });
        
                g.append("text")
                    .attr({
                        "y": function (d,i) {
                            if(d.coordinates.length === 4) {
                                return (((d.coordinates[0].y-d.coordinates[1].y)/2)+d.coordinates[1].y) + 5;
                            } else {
                                return (d.coordinates[0].y + d.coordinates[1].y)/2 + 10;
                            }
                        },
                        "x": function (d,i) { return width/2;}
                    })
                    .style("text-anchor", "middle")
                    .text(function(d) { return String(d.content_type)});
            
                d3.select("body").append("table")
                    .attr({
                        "id" : "footer",
                        "width": width + "px"
                    })
            });