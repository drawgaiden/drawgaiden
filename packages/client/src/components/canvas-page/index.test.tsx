import React from 'react';
import renderer from 'react-test-renderer';
import { CanvasPage } from './index';
import testData from '../../../test/data/canvas';

test('<App/>', () => {
    const props = {
        canvasID: testData.canvas.id,
        canvas: testData.canvas,
        history: testData.history,
        latestEntry: testData.newEntry,
        users: testData.users,
        loading: false,
        username: 'username',
        joinCanvas: (id) => {},
        exit: () => {},
        draw: (entry) => {},
        setMousePosition: (coord) => {},
        currentTool: 'pencil',
        changeTool: (tool) => {},
        currentLayer: 0,
        changeLayer: (layer) => {},
        strokeColor: '#000000',
        changeStrokeColor: (color) => {},
        fillColor: '#ffffff',
        changeFillColor: (color) => {},
        toolSize: 1,
        changeToolSize: (size) => {},
        toolOpacity: 100,
        changeToolOpacity: (opacity) => {},
        toolSmoothness: 80,
        changeToolSmoothness: (smoothness) => {}
    };
    const tree = renderer.create(<CanvasPage {...props}/>).toJSON();
    expect(tree).toMatchSnapshot();
});