import React = require("react");
import './index.scss';
import {Memory} from "../Memory";

interface State {
    leakMemory: boolean
    clearString: boolean
    passParent: boolean
    list: {
        id: number
        ref?: Memory
    }[]
}

interface Props {
}

export class App extends React.Component<Props, State> {

    state: State = {
        passParent: true,
        clearString: false,
        leakMemory: false,
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
                        list: []
                    });
                }}>Clear All
                </div>
                <div className={'Button'}
                     style={this.state.passParent ? {backgroundColor: '#dbffdb'} : {backgroundColor: '#ffe8e8'}}
                     onClick={event => {
                         this.setState({
                             passParent: !this.state.passParent
                         })
                     }}>Pass Parent & Data : {this.state.passParent ? 'True' : 'False'}
                </div>
                <div className={'Button'}
                     style={this.state.leakMemory ? {backgroundColor: '#dbffdb'} : {backgroundColor: '#ffe8e8'}}
                     onClick={event => {
                         this.setState({
                             leakMemory: !this.state.leakMemory
                         })
                     }}>Leak Memory : {this.state.leakMemory ? 'True' : 'False'}
                </div>
                <div className={'Button'}
                     style={this.state.clearString ? {backgroundColor: '#dbffdb'} : {backgroundColor: '#ffe8e8'}}
                     onClick={event => {
                         this.setState({
                             clearString: !this.state.clearString
                         })
                     }}>Cleat String On Remove Memory : {this.state.clearString ? 'True' : 'False'}
                </div>
            </div>
            <div className={'Body'}>
                {this.state.list.map(value => {
                    return <Memory data={this.state.passParent ? value : undefined}
                                   app={this.state.passParent ? this : undefined}
                                   key={value.id}
                                   clearString={this.state.clearString}/>
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