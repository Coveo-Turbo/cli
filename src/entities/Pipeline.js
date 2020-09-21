import { Entity } from "tramway-core-connection";

export default class Pipeline extends Entity {
    id
    name
    description
    condition
    apiKeysThatCanEdit = []
    groupsThatCanEdit = []

    getId() {
        return this.id;
    }
    
    setId(id) {
        this.id = id;
        return this;
    }

    getName() {
        return this.name;
    }
    
    setName(name) {
        this.name = name;
        return this;
    }

    getDescription() {
        return this.description;
    }
    
    setDescription(description) {
        this.description = description;
        return this;
    }

    getCondition() {
        return this.condition;
    }
    
    setCondition(condition) {
        this.condition = condition;
        return this;
    }

    getApiKeysThatCanEdit() {
        return this.apiKeysThatCanEdit;
    }
    
    setApiKeysThatCanEdit(apiKeysThatCanEdit) {
        this.apiKeysThatCanEdit = apiKeysThatCanEdit;
        return this;
    }

    getGroupsThatCanEdit() {
        return this.groupsThatCanEdit;
    }
    
    setGroupsThatCanEdit(groupsThatCanEdit) {
        this.groupsThatCanEdit = groupsThatCanEdit;
        return this;
    }

}