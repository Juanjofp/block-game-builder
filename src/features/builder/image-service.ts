export type ImageService = {
    generateImageBase64FromSchema(schema: string[][]): Promise<string>;
};
