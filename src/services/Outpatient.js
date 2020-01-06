import Api from "./Api"
import Cookies from "js-cookie"

const search = (payload) => {
  return Api.post("/outpatient", payload)
}

const Outpatient = {
  search,
}

export default Outpatient