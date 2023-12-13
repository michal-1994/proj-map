import { ToolProps } from '../models';

export const getTool = (tools: ToolProps[], id: string) => {
    return tools.find(tool => tool.id === id);
};
