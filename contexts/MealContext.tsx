import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type MealState = {
	label: string
	description: string
	date: string
	images: any[]
	dateTime: string
	place: string
	eatWith: string
	hungryLevel: number
	reflection: string
	feelingLevel: number
	note: string
}

type MealAction = { type: 'SET_FIELD'; field: keyof MealState; value: any } | { type: 'RESET' }

type MealContextType = {
	state: MealState
	setField: (field: keyof MealState, value: any) => void
	dispatch: Dispatch<MealAction>
}

const MealContext = createContext<MealContextType | undefined>(undefined)

const initialState: MealState = {
	label: '',
	description: '',
	date: '',
	images: [],
	dateTime: '',
	place: '',
	eatWith: '',
	hungryLevel: 0,
	reflection: '',
	feelingLevel: 0,
	note: ''
}

function mealReducer(state: MealState, action: MealAction): MealState {
	switch (action.type) {
		case 'SET_FIELD':
			return { ...state, [action.field]: action.value }
		case 'RESET':
			return initialState
		default:
			return state
	}
}

export const MealProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(mealReducer, initialState)

	const setField = (field: keyof MealState, value: any) => {
		dispatch({ type: 'SET_FIELD', field, value })
	}

	return (
		<MealContext.Provider value={{ state, setField, dispatch }}>
			{children}
		</MealContext.Provider>
	)
}

export const useMealContext = () => {
	const context = useContext(MealContext)
	if (!context) {
		throw new Error('useMealContext must be used within a MealProvider')
	}
	return context
}
