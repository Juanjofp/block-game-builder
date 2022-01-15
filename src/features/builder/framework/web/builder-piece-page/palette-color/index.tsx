import * as React from 'react';
import { MatrixColorCell } from '../matrix-color-cell';
import { useI18nService } from 'services/i18n/framework';
import { useAppDispatch, useAppSelector } from 'framework/store/hooks';
import {
    getPalette,
    thunkToggleBucketInPalette,
    thunkUpdateSelectedColorInPalette
} from 'features/builder/framework/reducers';
import './styles.css';

export function useController() {
    const palette = useAppSelector(getPalette);
    const dispatch = useAppDispatch();

    const selectColorFromPalette = (
        color: string,
        position: [number, number]
    ) => {
        dispatch(thunkUpdateSelectedColorInPalette(position));
    };

    const toggleBucketInPalette = () => {
        dispatch(thunkToggleBucketInPalette());
    };

    return {
        palette,
        selectColorFromPalette,
        toggleBucketInPalette
    };
}

export function PaletteColor() {
    const { t } = useI18nService();
    const { palette, selectColorFromPalette, toggleBucketInPalette } =
        useController();
    return (
        <PaletteColorView
            title={t('builder_piece_page_palette_title')}
            schema={palette.colors}
            onClickSchema={selectColorFromPalette}
            onClickBucket={toggleBucketInPalette}
            bucketButtonTitle={t('builder_piece_page_bucket_button_title')}
            isBucketSelected={palette.isBucketEnabled}
        />
    );
}
export type PaletteProps = {
    title: string;
    schema: string[][];
    onClickSchema: (color: string, position: [number, number]) => void;
    onClickBucket: () => void;
    bucketButtonTitle: string;
    isBucketSelected: boolean;
};
export function PaletteColorView({
    title,
    schema,
    onClickSchema,
    onClickBucket,
    bucketButtonTitle,
    isBucketSelected
}: PaletteProps) {
    return (
        <>
            <div>
                <div>{title}</div>
                <MatrixColorCell
                    testId={'builder-piece-palette'}
                    colorScheme={schema}
                    onCellSelected={onClickSchema}
                    cellSize={32}
                />
                <div>
                    <button
                        className={`BucketButton ${
                            isBucketSelected
                                ? 'BucketButtonSelected'
                                : 'BucketButtonNoSelected'
                        }`}
                        data-testid={`builder-piece-palette-bucket-button${
                            isBucketSelected ? '-selected' : ''
                        }`}
                        onClick={onClickBucket}
                    >
                        {bucketButtonTitle}
                    </button>
                </div>
            </div>
        </>
    );
}
