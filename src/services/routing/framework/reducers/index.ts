import { ReduxDispatch } from 'framework/store';
// TODO: WTF is this? importing from a feature module? in a service?
import { thunkSelectMenuOptionFromPath } from 'features/builder/framework/reducers';

export function thunkUpdateRoute(path: string) {
    return (dispatch: ReduxDispatch) => {
        dispatch(thunkSelectMenuOptionFromPath(path));
    };
}
