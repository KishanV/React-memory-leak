import React = require("react");
import './index.scss';
import {App} from "../app";

interface State {

}

interface Props {
    app?: App,
    data?: {
        id: number
        ref?: Memory
    }
}

export class Memory extends React.Component<Props, State> {
    state: State = {};

    dummyData: string[] = [];

    constructor(props: any) {
        super(props);
        for (let index = 0; index < 100000; index++) {
            this.dummyData.push(index + ' - The quick brown fox jumps over the lazy dog');
        }
        if (this.props.app && this.props.data && this.props.app.state.leakMemory) {
            (window as any)['leak_' + this.props.data.id] = this;
        }
    }

    render() {
        return <div className={'Memory'} onClick={event => {
            if (event.button === 2) console.log(this.dummyData);
        }}>
            <div className={'Close'} onClick={event => {
                if (this.props.app) this.props.app.removeMemory(this.props.data);
            }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8.0354L8.29289 8.74251L0.514719 0.964332L1.22183 0.257225L9 8.0354Z" fill="#0386C8"/>
                    <rect x="1.2218" y="8.74268" width="1" height="11" transform="rotate(-135 1.2218 8.74268)"
                          fill="#0386C8"/>
                </svg>
            </div>
            <div className={'Id'}>{this.props.data && this.props.data.id}</div>
        </div>;
    }
}