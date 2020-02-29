"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
let CallEvents = class CallEvents {
};
// Events' Names
CallEvents.callStartCreated = 'CALL_START_CREATED';
CallEvents.callStartAccepted = 'CALL_START_ACCEPTED';
CallEvents.callEnded = 'CALL_ENDED';
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Object)
], CallEvents, "callStartCreated", void 0);
CallEvents = __decorate([
    fabric_contract_api_1.Object()
], CallEvents);
exports.CallEvents = CallEvents;
//# sourceMappingURL=events.js.map