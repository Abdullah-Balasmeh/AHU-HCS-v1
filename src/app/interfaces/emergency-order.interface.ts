export interface EmergencyOrder {
    emergencyOrderId?: number;
    nurseName?: string;
    managerName?: string;
    emergencyOrderType?: string;
    sendDate?: Date | string;
    approveDate?: Date | string;
    isSubmet?: boolean;
    isApprove?: boolean;
    items?: Item[];
}

export interface Item {
    itemId?: number;
    description?: string;
    quantity?: string;
    unit?: string;
    note?: string;
    emergencyOrderId?: number;
}
