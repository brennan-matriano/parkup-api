import { init } from "@rematch/core"
import { formData } from "./models"

const sampleInitialState = {
  formData: {}
}

export const initializeStore = (initialState = sampleInitialState) =>
  init({
    models: {
      formData
    },
    redux: {
      initialState
    }
  })

// export type Store = typeof
