import { UUID } from "../protocols/UUID";
import { v4, v1 } from "uuid";

export default class UIAdapter implements UUID {
    
    private type: Function;

    constructor (version: string) {
        if (version === 'v4')
            this.type = v4;
        if (version === 'v1')
            this.type = v1;
    }
    generate(): string {
        return this.type();
    }
    
}