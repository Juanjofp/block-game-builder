import { ImageService } from 'features/builder/image-service';

export function buildCanvasImageService(): ImageService {
    const canvas = document.createElement('canvas');
    return {
        generateImageBase64FromSchema(schema: string[][]): Promise<string> {
            return new Promise((resolve, reject) => {
                canvas.width = schema[0].length * 10;
                canvas.height = schema.length * 10;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return void reject(
                        new Error('Could not get canvas context')
                    );
                }
                schema.forEach((row, rowIndex) => {
                    row.forEach((color, columnIndex) => {
                        ctx.fillStyle = color;
                        ctx.fillRect(columnIndex * 10, rowIndex * 10, 10, 10);
                    });
                });
                const imageData = canvas.toDataURL('image/png');
                resolve(imageData);
            });
        }
    };
}
