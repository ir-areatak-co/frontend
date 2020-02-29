import { Context, Contract } from 'fabric-contract-api';
import { CallStatus } from './call';
export declare class Cdr extends Contract {
    CreateCallStart(ctx: Context, senderOperator: string, callerId: string, callReceiverId: string, startedAt: string): Promise<{
        callId: string;
        status: CallStatus;
    }>;
    AcceptCallStart(ctx: Context, callId: string): Promise<{
        callId: string;
        status: CallStatus.StartAccepted;
    }>;
    endCall(ctx: Context, callId: string): Promise<{
        callId: string;
        status: CallStatus.Ended;
    }>;
    private getHash;
    private getTxTimestamp;
}
