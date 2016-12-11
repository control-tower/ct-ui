import * as dashboard from '../actions/dashboard';


export interface State {
    countRequestToday: {
        begin: Date
        end: Date
        count: number
    }
    countRequestLastWeek: {
        begin: Date
        end: Date
        count: number
    }
    countRequestTodayByCountry: {
        _id: string
        count: number
    }[]
    avgByRequest: {
        _id: {
            endpointPath: string
            sourceMethod: string
        }
        sum: number
    }[]
    requestByDay: {
        _id: {
            year: number
            month: number
            day: number
        }
        count: number
    }[]
};

const initialState: State = {
    countRequestToday: null,
    countRequestLastWeek: null,
    countRequestTodayByCountry: [],
    avgByRequest: [],
    requestByDay: [],
};

export function reducer(state = initialState, action: dashboard.Actions): State {
    switch (action.type) {
        case dashboard.DashboardActions[dashboard.DashboardActions.COUNT_REQUEST_TODAY]:
            return Object.assign({}, state, { countRequestToday: action.payload });
        case dashboard.DashboardActions[dashboard.DashboardActions.COUNT_REQUEST_LASTWEEK]:
            return Object.assign({}, state, { countRequestLastWeek: action.payload });
        case dashboard.DashboardActions[dashboard.DashboardActions.COUNT_REQUEST_TODAY_BY_COUNTRY]:
            return Object.assign({}, state, { countRequestTodayByCountry: action.payload });
        case dashboard.DashboardActions[dashboard.DashboardActions.AVG_BY_REQUEST]:
            return Object.assign({}, state, { avgByRequest: action.payload });
        case dashboard.DashboardActions[dashboard.DashboardActions.REQUEST_BY_DAY]:
            return Object.assign({}, state, { requestByDay: action.payload });
        default:
            return state;
    }
}