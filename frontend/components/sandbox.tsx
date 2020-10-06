import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { NodeGroup } from 'react-move'
import { easeExpInOut } from 'd3-ease';

type UUID = string;

class GameObject {
    id: UUID;
    position: [number, number];
    backgroundColor: string | undefined;
    parent: UUID | undefined;
    children: Array<UUID>;

    constructor(position: [number, number]) {
        this.id = uuidv4();
        this.position = position;
        this.children = new Array();
    }
}

type SandboxState = {
    objects: Map<UUID, GameObject>
}

type NodeState = {
    transX: number,
    transY: number
}

export class Sandbox extends React.Component<{}, SandboxState> {
    constructor(props: {}) {
        super(props);

        let rect = new GameObject([24, -13]);
        rect.backgroundColor = 'yellow';
        let text = new GameObject([10, 0]);
        text.backgroundColor = 'red';
        text.parent = rect.id;
        rect.children.push(text.id);

        let objects = new Map();
        objects.set(rect.id, rect);
        objects.set(text.id, text);

        this.state = {
            objects: objects,
        };
    }

    handleClick(key: UUID) {
        const obj = this.state.objects.get(key);
        if (obj === undefined) {
            return;
        }

        let newObj = { ...obj };
        if (obj.position[0] !== 67) {
            newObj.position[0] = 67;
        } else {
            newObj.position[0] = 10;
        }
        if (obj.position[1] !== 30) {
            newObj.position[1] = 30;
        } else {
            newObj.position[1] = -110;
        }
        let newObjects = new Map(this.state.objects);
        newObjects.set(key, newObj);
        this.setState({
            objects: newObjects
        });
    }

    renderNodes(nodes) {
        let nodeStateMap = new Map();
        for (const { key, data: _, state } of nodes) {
            nodeStateMap.set(key, state);
        }

        let objects: JSX.Element[] = [];
        for (const [key, obj] of this.state.objects.entries()) {
            if (obj.parent !== undefined) {
                continue;
            }

            objects.push(this.renderGameObject(key, nodeStateMap));
        }
        return objects;
    }

    renderGameObject(key: UUID, nodeStateMap: Map<UUID, NodeState>) {
        if (!nodeStateMap.has(key) || !this.state.objects.has(key)) {
            console.error("renderGameObject called with invalid key: " + key);
            return;
        }

        const obj = this.state.objects.get(key);
        const { transX, transY } = nodeStateMap.get(key);
        return (
            <div
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: obj.backgroundColor || 'transparent',
                    transform: `translate3d(${transX}px, ${transY}px, 0) scale(1)`,
                    WebkitTransform: `translate3d(${transX}px, ${transY}px, 0) scale(1)`,
                }}
                onClick={() => this.handleClick(key)}
            >
                {obj.children.map((childId) => this.renderGameObject(childId, nodeStateMap))}
            </div>
        );
    }

    render() {
        return (
            <NodeGroup
                data={Array.from(this.state.objects.keys())}
                keyAccessor={key => key} // the UUID key is used as the data already
                start={key => {
                    const obj = this.state.objects.get(key);
                    const [x, y] = obj.position;
                    return {
                        transX: x,
                        transY: y,
                    };
                }}
                update={key => {
                    const obj = this.state.objects.get(key);
                    const [x, y] = obj.position;
                    return {
                        transX: [x],
                        transY: [y],
                        timing: { duration: 750, ease: easeExpInOut }
                    };
                }}
            >
                {nodes => <div className="objectContainer">{this.renderNodes(nodes)}</div>}
            </NodeGroup>
        )
    }
}