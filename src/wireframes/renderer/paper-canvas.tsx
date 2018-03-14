import * as React from 'react';
import * as paper from 'paper';

export interface PaperCanvasProps {
    // The width of the canvas.
    zoomedWidth: number;

    // The height of the canvas.
    zoomedHeight: number;

    // The zoom value of the canvas.
    zoom: number;

    // The class name.
    className?: string;

    // The callback when the canvas has been initialized.
    onInit: (scope: paper.PaperScope) => any;
}

export class PaperCanvas extends React.Component<PaperCanvasProps> {
    private canvasElement: any;
    private scope: paper.PaperScope;

    public componentWillMount() {
        setTimeout(() => {
                this.scope = new paper.PaperScope();
                this.scope.setup(this.canvasElement);

                this.props.onInit(this.scope);

                this.updateViewSettings(this.props);
        });
    }

    public componentWillReceiveProps(nextProps: PaperCanvasProps) {
        this.updateViewSettings(nextProps);
    }

    public shouldComponentUpdate() {
        return false;
    }

    private updateViewSettings(props: PaperCanvasProps) {
        if (this.scope) {
            this.scope.view.viewSize = new paper.Size(props.zoomedWidth, props.zoomedHeight);

            this.scope.view.center =
                new paper.Point(
                    0.5 / props.zoom * props.zoomedWidth,
                    0.5 / props.zoom * props.zoomedHeight);
            this.scope.view['matrix'] = new paper.Matrix(props.zoom, 0, 0, props.zoom, 0, 0);
        }
    }

    public render() {
        return <canvas className={this.props.className} ref={canvas => { this.canvasElement = canvas; }} />;
    }
}