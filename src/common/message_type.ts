const createMessageType = (type: string) => `och_${type}` 

export const BranchSettingChange = createMessageType('branchSettingChange');
