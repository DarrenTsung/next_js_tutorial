import React, { FunctionComponent } from 'react'
import styles from './tictactoe.module.css'
import { v4 as uuidv4, Uuid } from 'uuid'

class GameObject {
    position: [number, number]
}

type SandboxState = {
    objects: Record<Uuid, GameObject>
}

export class Sandbox extends React.Component<{}, SandboxState> {
    constructor(props: {}) {
        super(props);
        const obj: GameObject = { position: [0, 0] };
        const uuid = uuidv4();
        this.state = {
            objects: {
                uuid: obj,
            }
        }
        console.log(this.state);
    }

    render() {
        return (
            <div>
                Sandbox
            </div>
        );
    }
}