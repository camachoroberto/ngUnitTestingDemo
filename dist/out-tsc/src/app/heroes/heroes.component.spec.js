"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heroes_component_1 = require("./heroes.component");
describe('HeroesComponent', function () {
    var component;
    var HEROES;
    beforeEach(function () {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 },
        ];
        component = new heroes_component_1.HeroesComponent();
    });
});
//# sourceMappingURL=heroes.component.spec.js.map