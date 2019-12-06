import React = require("react");
import './index.scss';
import {Memory} from "../Memory";

interface State {
    leackMemory: boolean
    list: {
        id: number
        ref?: Memory
    }[]
}

interface Props {
}

export class App extends React.Component<Props, State> {

    state: State = {
        leackMemory: false,
        list: []
    };
    count = 0;

    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className={'App'}>
            <div className={'Head'}>
                <div className={'Button'}
                     onClick={() => {
                         this.state.list.push({
                             id: this.count++
                         });
                         this.setState({
                             list: this.state.list
                         });
                     }}>Generate Memory
                </div>
                <div className={'Button'} onClick={event => {
                    const memory = (window.performance as any).memory;
                    alert(`allocated : ${Math.round(memory.totalJSHeapSize / 1024 / 1024)} Mb / used : ${Math.round(memory.usedJSHeapSize / 1024 / 1024)} Mb`);
                }}>Show Memory
                </div>
                <div className={'Button'} onClick={event => {
                    this.setState({
                        leackMemory: !this.state.leackMemory
                    })
                }}>Leak Memory : {this.state.leackMemory ? 'True' : 'False'}
                </div>
            </div>
            <div className={'Body'}>
                {this.state.list.map(value => {
                    return <Memory data={value} app={this} key={value.id}/>
                })}
            </div>
        </div>;
    }

    removeMemory(data: any) {
        const list = this.state.list.filter(value => {
            return value !== data;
        });
        this.setState({
            list: list
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        studentData: state.studentData.data,
        isLoggedIn: state.isLoggedIn,
        dispatch: state.dispatch
    };
};