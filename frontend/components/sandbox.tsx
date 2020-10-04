import React, { FunctionComponent } from 'react'
import styles from './tictactoe.module.css'
import { v4 as uuidv4, Uuid } from 'uuid'
import { Animate } from 'react-move'
import { easeExpInOut } from 'd3-ease';

type GameObject = {
    x: number,
    y: number,
}

type SandboxState = {
    objects: Map<any, GameObject>
}

export class Sandbox extends React.Component<{}, SandboxState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            objects: new Map([
                [uuidv4(), { x: 24, y: -13 }]
            ]),
        }
        console.log(this.state);
    }

    handleClick(key: Uuid) {
        const obj = this.state.objects.get(key);
        if (obj === undefined) {
            return;
        }

        let newObj = { ...obj };
        if (obj.x !== 67) {
            newObj.x = 67;
        } else {
            newObj.x = 10;
        }
        if (obj.y !== 30) {
            newObj.y = 30;
        } else {
            newObj.y = -110;
        }
        let newObjects = new Map(this.state.objects);
        newObjects.set(key, newObj);
        this.setState({
            objects: newObjects
        });
    }

    render() {
        let objects = [];
        for (const [key, { x, y }] of this.state.objects.entries()) {
            objects.push(<Animate
                key={key}
                start={{
                    transX: x,
                    transY: y,
                }}
                update={{
                    transX: [x],
                    transY: [y],
                    timing: { duration: 750, ease: easeExpInOut }
                }}
            >
                {({ transX, transY }) => {
                    return (
                        <div
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: 'red',
                                transform: `translate3d(${transX}px, ${transY}px, 0) scale(1)`,
                                WebkitTransform: `translate3d(${transX}px, ${transY}px, 0) scale(1)`,
                            }}
                            onClick={() => this.handleClick(key)}
                        >
                        </div>
                    );
                }}
            </Animate>);
        }

        return objects;
    }
}