// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import infoWindow from '../graphElements/infoWindow.js';

export default {
    setUpGlobalListeners(svg) {
        d3.select('.chart-container').on('click', function (e) {
            const clickTarget = <HTMLElement>e.target;

            if (!clickTarget.classList.contains('node')) {
                infoWindow.closeAllOpenInfoWindows();
            }
        });

        d3.select('.control-panel-button').on('click', function (e) {
            const controlPanel = d3.select('.control-panel').node();

            controlPanel.classList.toggle('control-panel-minimized');
        });
    }
};