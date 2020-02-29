export declare class Call {
    senderOperator: string;
    receiverOperator: string;
    callerId: string;
    callReceiverId: string;
    startedAt: string;
    endedAt: string;
    duration: number;
    status: CallStatus;
}
export declare enum CallStatus {
    StartCreated = "START_CREATED",
    StartAccepted = "START_ACCEPTED",
    Ended = "ENDED"
}
