// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default {
    createNewInfoWindow(event: PointerEvent, datum: SimulationNodeDatum, links: SimulationLinkDatum<any>[]) {
        this.closeAllOpenInfoWindows();

        const newInfoWindow = d3.select('body')
            .append('div')
            .attr('class', 'info-window')
            .style('top', `${event.y}px`)
            .style('left', `${event.x}px`);

        const newInfoWindowHeader = newInfoWindow.append('div').attr('class', 'info-window-header');
        newInfoWindowHeader.append('h1').text(datum.id);

        newInfoWindowHeader.append('span').attr('class', 'icon-Group');
        newInfoWindowHeader.append('h2').text('Group:');
        newInfoWindowHeader.append('span').text(datum.GroupName);
        newInfoWindowHeader.append('br');
        newInfoWindowHeader.append('span').attr('class', 'icon-database-created');
        newInfoWindowHeader.append('h2').text('Created:');
        newInfoWindowHeader.append('span').text(new Date(datum.created).toLocaleString('sv-SE'));
        newInfoWindowHeader.append('br');
        newInfoWindowHeader.append('span').attr('class', 'icon-database-modified');
        newInfoWindowHeader.append('h2').text('Modified:');
        newInfoWindowHeader.append('span').text(new Date(datum.modified).toLocaleString('sv-SE'));

        const newInfoWindowLinks = newInfoWindow.append('div').attr('class', 'info-window-links');
        const outgoingLinks = links.filter(link => link.source.id === datum.id).map(link => link.target.id).sort();
        newInfoWindowLinks.append('span').attr('class', 'icon-arrow-outgoing');
        newInfoWindowLinks.append('h2').text(`References (${outgoingLinks.length}):`);
        const outgoingLinksList = newInfoWindowLinks.append('ul');
        outgoingLinks.forEach(link => {
            outgoingLinksList.append('li').text(link);
        });

        const incomingLinks = links.filter(link => link.target.id === datum.id).map(link => link.source.id).sort();
        newInfoWindowLinks.append('span').attr('class', 'icon-arrow-incoming');
        newInfoWindowLinks.append('h2').text(`Referenced by (${incomingLinks.length}):`);
        const incomingLinksList = newInfoWindowLinks.append('ul');
        incomingLinks.forEach(link => {
            incomingLinksList.append('li').text(link);
        });

        const newInfoWindowColumns = newInfoWindow.append('div').attr('class', 'info-window-columns');
        const groupsStringAsArray = datum.columns;
        newInfoWindowColumns.append('span').attr('class', 'icon-columns');
        newInfoWindowColumns.append('h2').text(`Columns (${groupsStringAsArray.length}):`).attr('class', 'icon-columns');
        const columnsList = newInfoWindowColumns.append('ul');
        groupsStringAsArray.forEach(c => {
            const newListItem = columnsList.append('li');

            if (c.startsWith('Id')) {
                newListItem.append('span').attr('class', 'icon-key');
            }

            newListItem.append('span').text(c);
        });
    },

    closeAllOpenInfoWindows() {
        d3.selectAll('.info-window').remove();
    }
};