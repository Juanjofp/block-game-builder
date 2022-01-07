import { buildCanvasImageService } from 'features/builder/framework/web/builder-piece-page/canvas-image-service';

describe('CanvasImageService', () => {
    const getContext = jest.fn();
    const toDataURL = jest.fn();

    HTMLCanvasElement.prototype.getContext = getContext;
    HTMLCanvasElement.prototype.toDataURL = toDataURL;

    beforeEach((): void => {
        getContext.mockClear();
        toDataURL.mockClear();
    });

    it('should thow an error if not 2d context', async () => {
        const canvasImageService = buildCanvasImageService();
        const schema = [[]];

        await expect(
            canvasImageService.generateImageBase64FromSchema(schema)
        ).rejects.toEqual(new Error('Could not get canvas context'));
    });

    it('should draw an empty image from empty schema', async () => {
        getContext.mockReturnValue({});
        toDataURL.mockReturnValue('');
        const canvasImageService = buildCanvasImageService();
        const schema = [[]];

        const image = await canvasImageService.generateImageBase64FromSchema(
            schema
        );

        expect(image).toEqual('');
    });

    it('should draw a red cross', async () => {
        const fillRect = jest.fn();
        getContext.mockReturnValue({
            fillRect
        });
        toDataURL.mockReturnValue('');
        const canvasImageService = buildCanvasImageService();
        const schema = [
            ['transparent', 'red', 'transparent'],
            ['red', 'red', 'red'],
            ['transparent', 'red', 'transparent']
        ];

        const image = await canvasImageService.generateImageBase64FromSchema(
            schema
        );

        expect(image).toEqual('');
        expect(fillRect).toHaveBeenCalledTimes(9);
    });
});
