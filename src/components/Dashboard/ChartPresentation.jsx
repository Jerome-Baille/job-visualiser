import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function getMonthName(month) {
    const monthLong = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = monthLong.findIndex(m => m.startsWith(month));
    return monthLong[monthIndex];
}

const LineChart = ({ data, monthOrder, width, height }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Clear existing content
        svg.selectAll('*').remove();

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Sort the data based on month order
        const sortedData = data.slice().sort((a, b) => {
            return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });

        const xScale = d3.scaleBand()
            .domain(sortedData.map(d => d.month))
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .nice()
            .range([innerHeight, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(yAxis)
            .selectAll('text')
            .attr('font-size', '12px');

        svg.append('g')
            .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
            .call(xAxis)
            .selectAll('text')
            .attr('font-size', '12px')
            .attr('transform', 'rotate(-45)') // Rotate X-axis labels for better visibility
            .attr('text-anchor', 'end'); // Adjust the anchor for rotated labels

        const line = d3.line()
            .x(d => xScale(d.month) + margin.left + xScale.bandwidth() / 2)
            .y(d => yScale(d.count) + margin.top);

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line)
            .style('opacity', 0) // Set initial opacity to 0
            .transition()
            .duration(1000)
            .style('opacity', 1); // Transition to full opacity

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('background-color', 'rgba(252, 208, 122, 0.8)') // Set background color
            .style('padding', '8px') // Add padding
            .style('border-radius', '4px'); // Add border radius

        svg.selectAll('.point')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('cx', d => xScale(d.month) + margin.left + xScale.bandwidth() / 2)
            .attr('cy', d => yScale(d.count) + margin.top)
            .attr('r', 5)
            .style('fill', 'steelblue')
            .style('opacity', 0) // Set initial opacity to 0
            .on('mouseover', (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`${getMonthName(d.month)}: ${d.count} applications`)
                    .style('left', (event.pageX - 50) + 'px')
                    .style('top', (event.pageY - 35) + 'px');
                d3.select(event.target)
                    .style('fill', '#FCD07A'); // Change the fill color on hover
            })
            .on('mouseout', (event) => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
                d3.select(event.target)
                    .style('fill', 'steelblue');
            })
            .transition()
            .duration(1000)
            .style('opacity', 1); // Transition to full opacity

        // Update the width of the SVG to match the available width
        svg.attr('width', width);
        svg.attr('height', height);

    }, [data, monthOrder, height, width]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};


const BarChart = ({ data, width, height }) => {
    const svgRef = useRef();
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }; // Define margin variables

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Clear existing content
        svg.selectAll('*').remove();

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Adjusted order

        const xScale = d3.scaleBand()
            .domain(dayNames) // Use the adjusted day names on X-axis
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .nice()
            .range([innerHeight, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(yAxis)
            .selectAll('text')
            .attr('font-size', '12px');

        svg.append('g')
            .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
            .call(xAxis)
            .selectAll('text')
            .attr('font-size', '12px');

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('background-color', 'rgba(252, 208, 122, 0.8)') // Set background color
            .style('padding', '8px') // Add padding
            .style('border-radius', '4px'); // Add border radius

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.day) + margin.left)
            .attr('y', d => yScale(d.count) + margin.top)
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d.count))
            .attr('fill', 'steelblue')
            .attr('rx', 8)
            .attr('ry', 8)
            .style('opacity', 0) // Set initial opacity to 0
            .style('box-shadow', '2px 2px 5px rgba(0, 0, 0, 0.3)') // Add box shadow
            .on('mouseover', (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`${d.count} applications`)
                    .style('left', (event.pageX - 50) + 'px')
                    .style('top', (event.pageY - 35) + 'px');
                d3.select(event.target)
                    .attr('fill', '#FCD07A') // Change the fill color on hover
                    .style('cursor', 'pointer');
            })
            .on('mousemove', (event) => {
                tooltip.style('left', (event.pageX - 50) + 'px')
                    .style('top', (event.pageY - 35) + 'px');
            })
            .on('mouseout', (event) => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
                d3.select(event.target)
                    .attr('fill', 'steelblue');
            })
            .transition()
            .duration(1000)
            .style('opacity', 1); // Transition to full opacity

        // Update the width of the SVG to match the available width
        svg.attr('width', width);
        svg.attr('height', height);

    }, [data, margin.bottom, margin.left, margin.right, margin.top, height, width]);

    return (
        <svg ref={svgRef} width={width} height={height} />
    );
};

export { LineChart, BarChart };