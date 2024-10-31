import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";


export const navigationRef = createNavigationContainerRef()

export async function navigate(routeName, params) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
}

export async function resetAndnavigate(routeName) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.resetAndnavigate({
            index: 0,
            routes: [{name: routeName}],
        }),
      );
    }
}

export async function goBack() {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.goBack()
      );
    }
}

export async function push(routeName, params) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.push(routeName, params)
      );
    }
}

export async function prepareNavigation() {
    navigationRef.isReady();

}