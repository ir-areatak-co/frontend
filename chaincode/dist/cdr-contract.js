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
const call_1 = require("./call");
const events_1 = require("./events");
const crypto_1 = require("crypto");
let Cdr = class Cdr extends fabric_contract_api_1.Contract {
    async CreateCallStart(ctx, senderOperator, callerId, callReceiverId, startedAt) {
        // get transaction sender CN
        const transactionSender = ctx.clientIdentity.getX509Certificate().subject.commonName;
        // Create a Call object
        let call = new call_1.Call();
        call = {
            receiverOperator: transactionSender,
            senderOperator,
            callerId,
            callReceiverId,
            startedAt,
            endedAt: null,
            duration: 0,
            status: call_1.CallStatus.StartCreated
        };
        const callId = this.getHash(call);
        const callBuffer = Buffer.from(JSON.stringify(call));
        // Put new state
        await ctx.stub.putState(callId, callBuffer);
        // raise event
        const eventBuffer = Buffer.from(JSON.stringify(Object.assign({ callId }, call)));
        ctx.stub.setEvent(events_1.CallEvents.callStartCreated, eventBuffer);
        // return useful values
        return { callId, status: call.status };
    }
    async AcceptCallStart(ctx, callId) {
        // get transaction sender CN
        const transactionSender = ctx.clientIdentity.getX509Certificate().subject.commonName;
        // get state by callId
        const callBuffer = await ctx.stub.getState(callId);
        let call = JSON.parse(callBuffer.toString());
        if (!call)
            throw new Error('Invalid call id');
        // check call sender is equal to transaction sender
        if (call.senderOperator !== transactionSender)
            throw new Error('Permission denied to accept call start');
        // check if call start has been created before
        if (call.status !== call_1.CallStatus.StartCreated)
            throw new Error('Call Start cannot be accepted');
        // Put new state
        call.status = call_1.CallStatus.StartAccepted;
        const newCallBuffer = Buffer.from(JSON.stringify(call));
        await ctx.stub.putState(callId, newCallBuffer);
        // raise event
        const eventBuffer = Buffer.from(JSON.stringify({ callId }));
        ctx.stub.setEvent(events_1.CallEvents.callStartAccepted, eventBuffer);
        // return useful values
        return { callId, status: call.status };
    }
    async endCall(ctx, callId) {
        // get state by callId
        const callBuffer = await ctx.stub.getState(callId);
        let call = JSON.parse(callBuffer.toString());
        if (!call)
            throw new Error('Invalid call id');
        // check if call has been accepted before
        if (call.status !== call_1.CallStatus.StartAccepted)
            throw new Error('Call cannot be Ended');
        // update call object
        call.endedAt = this.getTxTimestamp(ctx);
        call.duration = +call.endedAt - +call.startedAt;
        call.status = call_1.CallStatus.Ended;
        const newCallBuffer = Buffer.from(JSON.stringify(call));
        await ctx.stub.putState(callId, newCallBuffer);
        // raise event
        const eventBuffer = Buffer.from(JSON.stringify({ callId, endedAt: call.endedAt, duration: call.duration }));
        ctx.stub.setEvent(events_1.CallEvents.callEnded, eventBuffer);
        // return useful values
        return { callId, status: call.status };
    }
    // Private Methods
    getHash(data) {
        return crypto_1.createHash("SHA256")
            .update(JSON.stringify(data))
            .digest("hex")
            .substring(0, 7);
    }
    getTxTimestamp(ctx) {
        const timestamp = ctx.stub.getTxTimestamp();
        return (timestamp.getSeconds() * 1000 + timestamp.getNanos() / 1000000).toString();
    }
};
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String]),
    __metadata("design:returntype", Promise)
], Cdr.prototype, "CreateCallStart", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], Cdr.prototype, "AcceptCallStart", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], Cdr.prototype, "endCall", null);
Cdr = __decorate([
    fabric_contract_api_1.Info({ title: 'CdrContract', description: 'My Smart Contract' })
], Cdr);
exports.Cdr = Cdr;
//# sourceMappingURL=cdr-contract.js.map