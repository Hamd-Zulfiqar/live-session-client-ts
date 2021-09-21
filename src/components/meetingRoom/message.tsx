import React, {useEffect} from 'react';

interface PropsState {
    name: string;
    body: string;
    align: "text-left" | "text-right";
}


class Message extends React.Component<PropsState, PropsState> {
    constructor(props: PropsState){
        super(props);

        this.state = {
            name: props.name,
            body: props.body,
            align: props.align
        }
    }

    render(){
        return (
            <p className={this.state.align}>
                <b>{this.state.name}</b>: {this.state.body}
            </p>
        );
    }
}

export default Message;