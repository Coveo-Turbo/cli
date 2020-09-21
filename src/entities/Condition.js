import { Entity } from "tramway-core-connection";

export default class Condition extends Entity {
    id
    definition

    getId() {
        return this.id;
    }
    
    setId(id) {
        this.id = id;
        return this;
    }

    getDefinition() {
        return this.definition;
    }

    setDefinition(definition) {
        this.definition = definition;
        return this;
    }
}