createOSChart();

function createOSChart(){
    var total = 0;
    var width,
        height,
        widthSquares = 10,
        heightSquares = 10,
        squareSize = 15,
        squareValue = 0,
        gap = 1,
        theData = [];  

    var color = ['#5cbae6','#b6d957','#fac364','#8cd3ff'];

    d3.json("./model/os.json", function(error, data)
    {
        //total
        total = d3.sum(data, function(d) { return d.count; });

        //value of a square
        squareValue = total / (widthSquares*heightSquares);
        
        //remap data
        data.forEach(function(d, i) 
        {
            d.count = +d.count;
            d.units = Math.round(d.count/squareValue);
            theData = theData.concat(
                Array(d.units+1).join(1).split('').map(function()
                {
                    return {  
                        squareValue:squareValue,                      
                        units: d.units,
                        count: d.count,
                        groupIndex: i
                    };
                })
            );
        });

        width = (squareSize*widthSquares) + widthSquares*gap;
        height = (squareSize*heightSquares) + heightSquares*gap + 10;

        var waffle = d3.select("#OSWaffle")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .selectAll("div")
            .data(theData)
            .enter()
            .append("rect")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("y", function(d, i)
            {
                row = i%heightSquares;
                return (heightSquares*squareSize) - ((row*squareSize) + (row*gap))
            })
            //add color animation
            .attr("fill",color[0])
            .transition()
            .delay(function(d, i) { return i * 10; })
            .duration(100)
            .attr("fill", function(d){return color[d.groupIndex];})
            .attr("x", function(d, i)
                {
                //group n squares for column
                col = Math.floor(i/heightSquares);
                return (col*squareSize) + (col*gap);
            });

        //add legend with categorical data
        var legend = d3.select("#OSLegend")
            .append("svg")
            .attr('width', 160)
            .attr('height', 60)
            .append('g')
            .selectAll("div")
            .data(data)
            .enter()
            .append("g")
            .attr( "transform", function(d,i) { 
                xOff = (i % 2) * 90
                yOff = Math.floor(i  / 2) * 20
                return "translate(" + xOff + "," + yOff + ")" 
            } );

        legend.append("rect")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .style("fill", function(d, i) { return color[i]});

        legend.append("text")
            .attr("x", 25)
            .attr("y", 13)
            .style('fill','#333333')
            .style('font-size','12px')
            .text( function(d) { return d.os});

        //add value of a unit square
        var legend2 = d3.select("#legend")
            .select('svg')
            .append('g')
            .attr('transform', "translate(100,0)");

    });
}

